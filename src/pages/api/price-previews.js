/* eslint-disable no-async-promise-executor */

import { sentryCaptureException } from '@utils/sentry';

/* eslint-disable @typescript-eslint/no-misused-promises */
const { getUpdatedQuote } = require('@utils/boost-api');

const COVERAGES = {
  replacementCost: process.env.BOOST_REPLACEMENT_COST_COVERAGE_ID,
  waterDamage: process.env.BOOST_WATER_DAMAGE_COVERAGE_ID,
  theft: process.env.BOOST_THEFT_COVERAGE_ID,
  earthquake: process.env.BOOST_EARTHQUAKE_COVERAGE_ID,
  identityFraud: process.env.BOOST_IDENTITY_FRAUD_COVERAGE_ID,
};

Object.freeze(COVERAGES);

export default async (req, res) => {
  const addOns = Object.entries(req.body.addOns);

  const mainQuote = await getUpdatedQuote(req.body).catch((e) => {
    sentryCaptureException({
      info: 'Price Previews API: unable to get getUpdatedQuote',
      error: e,
    });
  });
  const mainInstallmentPlans = mainQuote?.data?.attributes?.installment_plans?.MONTH || [];
  const monthlyPremium = parseFloat(mainInstallmentPlans[0].amount_due);

  const priceEffectPromises = addOns
    .filter((addOn) => !addOn[1].selected)
    .map((addOn) => {
      return new Promise(async (resolve, reject) => {
        const coverage = {
          type: 'coverage',
          lid: `lid-coverage-${addOn[0]}`,
          attributes: {
            metadata: {},
          },
          relationships: {
            product_coverage: {
              data: {
                type: 'product_coverage',
                id: COVERAGES[addOn[0]],
              },
            },
          },
        };

        if (addOn[0] === 'identityFraud') {
          const attributes = {
            limit: '15000.00',
            metadata: {},
          };
          coverage.attributes = attributes;
        }

        const quote = await getUpdatedQuote({
          ...req.body,
          proposedAddOn: coverage,
        }).catch((e) => {
          sentryCaptureException({
            info: 'Price Previews API: unable to get getUpdatedQuote on ',
            error: e,
          });
        });

        if (
          quote?.data?.attributes?.status_reasons[0] &&
          quote?.data?.attributes?.status_reasons[0].title === 'ValidationError'
        ) {
          sentryCaptureException({
            info: 'getUpdatedQuote validationError',
            error: new Error('getUpdatedQuote ValidationError'),
          });
          reject();
          return;
        }

        const installmentPlans = quote?.data?.attributes?.installment_plans?.MONTH || [];

        const pricePreview = (parseFloat(installmentPlans[0].amount_due) - monthlyPremium).toFixed(2);
        resolve([addOn[0], { selected: addOn[1].selected, pricePreview }]);
      });
    });

  const priceEffectEntries = await Promise.all(priceEffectPromises);

  res.status(200).json({
    priceEffect: Object.fromEntries(priceEffectEntries),
    quote: {
      id: mainQuote?.data?.id,
      monthlyPremium: monthlyPremium.toFixed(2),
    },
  });
};
