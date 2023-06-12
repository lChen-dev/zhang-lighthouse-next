import { NextApiHandler } from 'next';

import { backendApi } from '@utils/http';
import { sentryCaptureException } from '../../utils/sentry';

const logout: NextApiHandler = async (req, res) => {
  const { returnTo } = req.query;
  const postLogoutUrl = `https://${process.env.VERCEL_URL}`;

  const cookieName = process.env.NEXT_PUBLIC_STYTCH_SESSION_COOKIE || 'lhstyssion';
  const sessionToken = req.cookies[cookieName];

  try {
    const redirectUrl = `${postLogoutUrl}${returnTo || ''}`;
    await backendApi.post('/auth/logout');
    if (sessionToken) {
      await backendApi.post(
        '/auth/logout',
        {},
        {
          headers: { Cookie: `${cookieName}=${sessionToken}` },
        },
      );
    }
    res.redirect(redirectUrl);
  } catch (error) {
    if (error.isAxiosError) {
      res.status(error.response.status || 500).send(error.response.data);
    } else {
      res.status(error.status || 500).send(error.message);
    }
    sentryCaptureException({
      info: 'Auth: unable to logout user',
      error,
      data: {
        VERCEL_URL: process.env.VERCEL_URL,
        postLogoutUrl,
        returnTo,
      },
    });
  }
};

export default logout;
