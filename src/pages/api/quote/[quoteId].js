import { sentryCaptureException } from '@utils/sentry';

const { getQuote } = require('../../../utils/boost-api');

export default async (req, res) => {
  try {
    const quote = await getQuote(req.query.quoteId);
    res.status(200).json(quote);
  } catch (error) {
    sentryCaptureException({
      info: 'failed to getQuote by quoteId',
      error,
    });
    if (error.isAxiosError) {
      res.status(error.response.status || 500).send(error.response.data);
    } else {
      res.status(error.status || 500).send(error.message);
    }
  }
};
