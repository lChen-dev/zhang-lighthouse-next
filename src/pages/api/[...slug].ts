import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { sentryCaptureException } from '@utils/sentry';
import { backendApi } from '@utils/http';

const catchAll: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const {
      query: { slug },
      method,
      body,
    } = req;

    const cookieName = process.env.NEXT_PUBLIC_STYTCH_SESSION_COOKIE || 'lhstyssion';
    const sessionToken = req.cookies[cookieName] || req.cookies[`${cookieName}-js`];
    if (!method) return res.status(401).end();

    const headers = {} as any;
    if (sessionToken) headers.Cookie = `${cookieName}=${sessionToken}`;

    let data;
    if (['post', 'put', 'patch'].includes(method.toLowerCase())) {
      const resp = await (backendApi as any)[method.toLowerCase()](
        Array.isArray(slug) ? `/${slug.join('/')}` : slug,
        body,
        { headers }
      );
      data = resp.data;
    } else {
      const resp = await (backendApi as any)[method.toLowerCase()](Array.isArray(slug) ? `/${slug.join('/')}` : slug, {
        headers,
      });
      data = resp.data;
    }
    return res.send(data);
  } catch (error) {
    if (error.isAxiosError && error.response) {
      res.status(error.response.status || 500).send({ message: error.response.data });
    } else {
      res.status(error.status || 500).send({ message: error.message });
    }
    if ((error.status || error.response?.status) >= 500) {
      sentryCaptureException({
        info: 'Dynamic api call',
        error,
      });
    }
  }
};

export default catchAll;
