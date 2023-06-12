/* eslint-disable no-case-declarations */
import { sentryCaptureException } from '@utils/sentry';
import httpStatus from 'http-status';
import { unAuthed } from '../../utils/http';

export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      const interestedPartyResponse = await unAuthed.patch('/insurance-policies', req.body);
      const interestedParty = interestedPartyResponse.data;
      res.status(httpStatus.OK).json({ interestedParty });
      break;
    default:
      sentryCaptureException({
        info: 'Interested Part: method not allowed',
        error: new Error(`/api/interested-party/ method ${req.method} not allowed`),
        data: {
          method: req.method,
        },
      });
      res.sendStatus(httpStatus.METHOD_NOT_ALLOWED); // Method Not Allowed
      break;
  }
};
