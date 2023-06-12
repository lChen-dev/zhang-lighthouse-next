import { NextApiHandler } from 'next';
import httpStatus from 'http-status';

import Kustomer from '@services/kustomer';
import { getErrorMessage } from '@hooks/errors';

const userSignUp: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(httpStatus.NOT_FOUND).json({ message: 'Not found' });
    return;
  }

  try {
    await Kustomer.sendUserSignUpFormHook(req.body);
    res.status(httpStatus.OK).json({ message: 'OK' });
  } catch (e) {
    const message = getErrorMessage(e);
    res.status(e.response?.status || e.status || httpStatus.INTERNAL_SERVER_ERROR).json({ message });
  }
};

export default userSignUp;