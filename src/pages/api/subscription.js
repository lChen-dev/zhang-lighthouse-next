import { sentryCaptureException } from '@utils/sentry';

/* eslint-disable no-console */
const axios = require('axios');
const qs = require('qs');
const Stripe = require('stripe');

const { DateTime } = require('luxon');

const stripe = Stripe(process.env.STRIPE_API_KEY);

const getMonthlyPremium = async (quoteId) => {
  // Get the auth token with our API credentials
  const authToken = await axios
    .post(
      `${process.env.BOOST_API_BASE_URL}/auth/oauth2/token`,
      qs.stringify({
        grant_type: 'client_credentials',
        client_id: process.env.BOOST_CLIENT_ID,
        client_secret: process.env.BOOST_CLIENT_SECRET,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    .catch((error) => {
      sentryCaptureException({
        info: 'Subscription API: getMonthlyPremium failed',
        error,
      });
    });

  // Get the user's quote with our newly acquired access token
  const quote = await axios
    .request({
      url: `${process.env.BOOST_API_BASE_URL}/quotes/${quoteId}`,
      method: 'get',
      headers: {
        'Boost-User': process.env.BOOST_USER,
        Authorization: `Bearer ${authToken?.data?.access_token}`,
      },
    })
    .catch((error) => {
      sentryCaptureException({
        info: 'Subscription API: get quotes by quote Id failed',
        error,
        data: { quoteId },
      });
    });

  // Calculate and return the monthly premium (the term premium already includes the fees)
  const termPremium = parseFloat(quote?.data?.data?.attributes?.term_premium);
  return Math.round((termPremium / 12) * 100);
};

export default async (req, res) => {
  // Create the customer if not exist
  let customer;
  let customerId;

  const { email } = req.body;
  const existingCustomers = await stripe.customers.list({ email });
  const customerExists = existingCustomers.data.length;
  try {
    if (customerExists) {
      // don't create customer use existing one
      customerId = existingCustomers.data[0].id;
    } else {
      // create new customer
      customer = await stripe.customers.create({
        name: req.body.name,
        email: req.body.email,
      });
      customerId = customer.id;
    }
  } catch (error) {
    sentryCaptureException({
      info: 'Subscription API: unable to create customer on stripe',
      error,
      data: {
        name: req.body.name,
        email: req.body.email,
      },
    });
    return res.status('402').send({ error: { message: error.message } });
  }

  // handle new customer
  if (!customerExists) {
    // Attach the payment method to the new customer
    try {
      await stripe.paymentMethods.attach(req.body.paymentMethodId, {
        customer: customerId,
      });
    } catch (error) {
      sentryCaptureException({
        info: 'Subscription API: unable to link payment method ID on stripe',
        error,
      });
      return res.status('402').send({ error: { message: error.message } });
    }

    // Change the default invoice settings on the customer to the new payment method
    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: req.body.paymentMethodId,
      },
    });
  }

  let moveInDate = DateTime.fromISO(req.body.moveInDate).startOf('day');
  const dateTimeDiff = DateTime.now()
    .startOf('day')
    .diff(moveInDate, 'day')
    .toObject().days;

  // If the move in date is in the past, set the subscription to run immediately
  if (dateTimeDiff >= 0) {
    moveInDate = DateTime.now(); // Set the new start to today
  }

  const endDate = moveInDate.plus({ years: 1, hours: 1 }); // Adding an hour here fixes an issue where the pro-ration is off by a few cents
  const unitAmount = await getMonthlyPremium(req.body.quoteId);

  // Create the subscription
  const subscription = await stripe.subscriptions
    .create({
      customer: customerId,
      items: [
        {
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
      add_invoice_items: [
        // One time payment for the first month charged immediately
        {
          price_data: {
            unit_amount: unitAmount,
            currency: 'usd',
            product: process.env.STRIPE_PRODUCT_ID,
          },
        },
      ],
      metadata: {
        userId: req.body.userId,
      },
      cancel_at: endDate.toSeconds(), // year from start date
      trial_end: moveInDate.plus({ months: 1 }).toSeconds(),
      proration_behavior: 'none',
    })
    .catch((error) => {
      sentryCaptureException({
        info: 'failed to create stripe subscriptions',
        error,
      });
    });

  res.status(200).json(subscription);
};
