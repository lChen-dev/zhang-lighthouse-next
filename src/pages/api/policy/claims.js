/* eslint-disable no-case-declarations */
import httpStatus from 'http-status';

import { submitClaim } from '@utils/boost-api';
import { sentryCaptureException } from '@utils/sentry';

export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      try {
        const claimResponse = await submitClaim(req.body, req.headers.cookie);
        const claim = claimResponse.data;
        res.status(httpStatus.OK).json({ claim });
      } catch (e) {
        sentryCaptureException({
          info: 'failed to submit policy claim',
          error: e,
        });
        res.status(500).end();
      }
      break;
    default:
      res.status(httpStatus.METHOD_NOT_ALLOWED).end();
      break;
  }
};
