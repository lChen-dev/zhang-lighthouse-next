import { sentryCaptureException } from '@utils/sentry';

const { getUpdatedQuote } = require('@utils/boost-api');

export default async (req, res) => {
  try {
    const quote = await getUpdatedQuote(req.body);
    const installmentPlans = quote?.data?.attributes?.installment_plans?.MONTH || [];
    let monthlyPremium;
    let totalPremium;
    if (installmentPlans[0]) {
      totalPremium = parseFloat(installmentPlans[0].amount_due).toFixed(2); // Total premium already includes the $1.00 fee
      monthlyPremium = totalPremium - 1; // Monthly premium is the total premium minus the $1.00 fee
    }
    res.status(200).json({ id: quote?.data?.id, monthlyPremium, totalPremium });
  } catch (error) {
    sentryCaptureException({
      info: 'failed to get getUpdatedQuote',
      error,
    });
    if (error.isAxiosError) {
      res.status(error.response.status || 500).send(error.response.data);
    } else {
      res.status(error.status || 500).send(error.message);
    }
  }
};
