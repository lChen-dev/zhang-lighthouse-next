import React, { useEffect } from 'react';
import { backendApi } from '@utils/http';
import { useRouter } from 'next/router';
import jsCookie from 'js-cookie';
import { LoadingSpinner } from '@components/shared';

const Logout: React.FC = () => {
  useEffect(() => {
    async function logout() {
      try {
        await backendApi.post('/auth/logout');
        jsCookie.remove('lh_user');
        jsCookie.remove(process.env.NEXT_PUBLIC_STYTCH_SESSION_COOKIE || 'lhstyssion');
        jsCookie.remove(`${process.env.NEXT_PUBLIC_STYTCH_SESSION_COOKIE || 'lhstyssion'}-js`);
      } catch (e) {
        // fall through
      }
      setTimeout(() => {
        window.location.href = '/';
      }, 50);
    }

    logout();
  }, []);
  return <LoadingSpinner />;
};

export default Logout;
