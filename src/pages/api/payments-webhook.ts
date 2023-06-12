import { unAuthed } from '@utils/http';
import httpStatus from 'http-status';
import { sentryCaptureException } from '@utils/sentry';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const {
    data: {
      object: {
        subscription: subscriptionId,
        hosted_invoice_url: invoiceUrl,
        lines: {
          data: [
            {
              metadata: { userId },
            },
          ],
        },
        customer_name: customerName,
        customer_email: customerEmail,
        customer: customerCode,
      },
    },
    id: externalId,
  } = req.body;

  switch (req.method) {
    case 'POST':
      try {
        const result = await unAuthed.post('/insurance-policies/payments-webhook', {
          subscriptionId,
          userId,
          invoiceUrl,
          customerName,
          customerEmail,
          customerCode,
          externalId,
        });
        return res.status(httpStatus.OK).json(result);
      } catch (error) {
        sentryCaptureException({
          info: 'insurance policies: payments webhook failed',
          error,
        });
      }
      break;
    default:
      res.status(httpStatus.METHOD_NOT_ALLOWED); // Method Not Allowed
      break;
  }
  res.json({ received: true }); // Send received a receipt to stripe
};
