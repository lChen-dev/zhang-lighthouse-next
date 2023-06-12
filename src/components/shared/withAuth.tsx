import React from 'react';
import { NextApiRequest } from 'next';

import { validateSession } from '@utils/auth';
import { fetchUser, UserProvider } from './UserProvider';

/**
 * withAuth auth SSR wrapper
 * @param InnerComponent
 * @param strictlyProtected
 * @param initialPropsCallback
 * @description React Functional wrapper, accepts 2 param, 2nd boolean param dictate if the session is strict
 */
export default function withAuth(InnerComponent: any, strictlyProtected = false, initialPropsCallback: any = null) {
  const Wrapper = ({ user, ...props }: any) => {
    return (
      <UserProvider value={{ user }}>
        <InnerComponent {...props} />
      </UserProvider>
    );
  };
  Wrapper.getInitialProps = async (ctx: any) => {
    if (!ctx.req) {
      const user: any = await fetchUser();
      return { user };
    }

    let userId = null;
    try {
      userId = await validateSession(ctx.req as NextApiRequest);
    } catch (e) {
      // fall through
    }

    if (initialPropsCallback) return initialPropsCallback(ctx, { userId });
    if (strictlyProtected && !userId) {
      ctx.res.writeHead(302, {
        Location: '/logout',
      });
      ctx.res.end();
    }
    return { userId };
  };
  return Wrapper;
}
