/* eslint-disable no-case-declarations */
/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { issuePolicy, getPolicy, getPolicyDocuments } from '@utils/boost-api';
import { sentryCaptureException } from '@utils/sentry';
import { backendApi, unAuthed } from '../../../utils/http';

const getPolicyIdsByUser = async (req) => {
  let policies = [];
  try {
    const { data } = await backendApi.get(`/insurance-policies`, {
      headers: { cookie: req.headers.cookie },
    });
    policies = data || [];
  } catch (error) {
    sentryCaptureException({
      info: 'unable to getPolicyIdsByUser',
      error,
    });
  }
  return policies.filter((policy) => policy.active).map((policy) => policy.boostId);
};

const savePolicyToLighthouseDB = async (userId, boostId, stripeSubscriptionId) => {
  await backendApi
    .post(
      '/insurance-policies',
      {
        boostId,
        userId,
        stripeSubscriptionId,
      },
      { timeout: 120000 } // 2 minutes timeout for saving policy after edit to prevent unexpected behaviour on UI, lots of intermediary requests, will need optimization
    )
    .catch((error) => {
      sentryCaptureException({
        info: 'Policy API: unable to save policy info in the database',
        error,
      });
    });
};

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const policyIds = await getPolicyIdsByUser(req);
        const policyPromises = policyIds.map((policyId) => {
          return new Promise(async (resolve, reject) => {
            const policy = await getPolicy(policyId).catch((error) => {
              sentryCaptureException({
                info: 'unable to getPolicy',
                error,
              });
              reject(error);
            });
            const documents = await getPolicyDocuments(policyId).catch((error) => {
              sentryCaptureException({
                info: 'unable to getPolicyDocuments',
                error,
              });
              reject(error);
            });
            resolve({ policy, documents });
          });
        });
        const response = await Promise.all(policyPromises);
        res.status(200).json(response);
      } catch (error) {
        sentryCaptureException({
          info: 'unable to getPolicyIdsByUser',
          error,
        });
        if (error.isAxiosError) {
          if (error.response?.status === 404) {
            res.status(200).json([]);
          } else {
            res.status(error.response?.status || 500).send(error.response?.data);
          }
        } else {
          res.status(error?.status || 500).send(error.message);
        }
      }
      break;
    case 'POST':
      try {
        const policy = await issuePolicy(req.body.quoteId).catch((error) => {
          sentryCaptureException({
            info: 'unable to get issued policy',
            error,
            data: {
              policyId: req.body.quoteId,
              userId: req.body.userId,
            },
          });
        });
        await savePolicyToLighthouseDB(req.body.userId, policy?.data?.id, req.body.stripeSubscriptionId);
        res.status(200).json({ policy });
      } catch (error) {
        sentryCaptureException({
          info: 'unable to store policy info in database',
          error,
          data: {
            policyId: req.body.quoteId,
            userId: req.body.userId,
          },
        });
        res.status(500).end();
      }
      break;
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
};
