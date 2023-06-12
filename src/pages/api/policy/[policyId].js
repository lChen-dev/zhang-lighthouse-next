import { createHttpClient, backendApi } from '@utils/http';
import { getErrorMessage } from '@hooks/errors';
import { sentryCaptureException } from '@utils/sentry';
import { canUpdateSubscription } from '@utils/payment-helpers';
import { REPLACING_EXISTING_POLICY } from '@utils/policy-helpers';

const Stripe = require('stripe');
const { cancelPolicy, getPolicy, getPolicyDocuments, updatePolicy } = require('@utils/boost-api');

const stripe = Stripe(process.env.STRIPE_API_KEY);

const getPolicyById = async (policyId, cookie) => {
  let policy;
  try {
    const response = await createHttpClient(cookie).get(`/insurance-policies/${policyId}`);
    policy = response.data;
  } catch (error) {
    sentryCaptureException({
      info: 'Policy API: unable to get insurance policy by id',
      error,
    });
  }
  return policy;
};

const savePolicyToLighthouseDB = async (userId, boostId, stripeSubscriptionId) => {
  await backendApi
    .post(
      '/insurance-policies',
      {
        boostId,
        userId,
        stripeSubscriptionId,
        replacingExistingPolicy: true,
      },
      { timeout: 120000 }, // 2 minutes timeout for saving policy after edit to prevent unexpected behaviour on UI, lots of intermediary requests, will need optimization
    )
    .catch((error) => {
      sentryCaptureException({
        info: 'Policy API:unable to store policy to database',
        error,
      });
    });
};

const markOldPolicyAsInactive = async (userId, boostId) => {
  await backendApi
    .patch(
      '/insurance-policies',
      {
        boostId,
        userId,
        active: false,
      },
      { timeout: 120000 }, // 2 minutes timeout for saving policy after edit to prevent unexpected behaviour on UI, lots of intermediary requests, will need optimization
    )
    .catch((error) => {
      sentryCaptureException({
        info: 'Policy API: unable to markOldPolicyAsInactive',
        error,
      });
    });
};

export default async (req, res) => {
  let response;
  let policy;
  switch (req.method) {
    case 'GET':
      if (req.query.policyId) {
        try {
          policy = await getPolicy(req.query.policyId);
          const documents = await getPolicyDocuments(req.query.policyId);
          response = { policy, documents };
          res.status(200).json(response);
        } catch (error) {
          sentryCaptureException({
            info: 'Policy API: unable to getPolicy',
            error,
          });
          res.status(500).end();
        }
      } else {
        res.status(400).end(); // Policy ID is missing
      }
      break;
    case 'DELETE':
      try {
        const { policyId } = req.query;
        await cancelPolicy(policyId, REPLACING_EXISTING_POLICY.CANCEL);
        const { stripeSubscriptionId } = await getPolicyById(req.query.policyId, req.headers.cookie);
        // Update subscription if allowed
        const isSubscriptionUpdatable = await canUpdateSubscription(stripeSubscriptionId);
        if (isSubscriptionUpdatable) {
          await stripe.subscriptions.del(stripeSubscriptionId);
        }
        res.status(200).json({ message: 'OK' });
      } catch (error) {
        sentryCaptureException({
          info: 'Policy API: unable to cancelPolicy',
          error,
        });
        res.status(500).json(error);
      }
      break;
    case 'PATCH':
      try {
        // Update the policy in Boost's API
        policy = await updatePolicy(req.query.policyId, req.body.quoteId, req.body.startOfNextBillingPeriod);
        const { id } = policy;
        // Save the new policy to our database
        const { stripeSubscriptionId, boostId, userId } = await getPolicyById(req.query.policyId, req.headers.cookie);
        await savePolicyToLighthouseDB(userId, id, stripeSubscriptionId);
        // Update the price of the subscription if allowed
        const isSubscriptionUpdatable = await canUpdateSubscription(stripeSubscriptionId);
        if (isSubscriptionUpdatable) {
          const termPremium = parseFloat(policy?.attributes?.term_premium);
          const unitAmount = Math.round((termPremium / 12) * 100);
          const stripeSubscription = await stripe.subscriptions.retrieve(stripeSubscriptionId);
          await stripe.subscriptions.update(stripeSubscriptionId, {
            items: [
              {
                id: stripeSubscription.items.data[0].id,
                price_data: {
                  unit_amount: unitAmount,
                  currency: 'usd',
                  product: process.env.STRIPE_PRODUCT_ID,
                  recurring: {
                    interval: 'month',
                  },
                },
              },
            ],
          });
        }

        // Mark the old policy in our db as inactive
        await markOldPolicyAsInactive(userId, req.query.policyId);

        res.status(200).json({ message: 'OK', policyId: policy?.id });
      } catch (error) {
        sentryCaptureException({
          info: 'Unable to patch policy info',
          error,
        });
        res.status(500).json({ message: getErrorMessage(error) });
      }
      break;
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
};
