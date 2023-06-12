import jsCookie from 'js-cookie';
import { nextApi } from '@utils/http';
import { sentryCaptureException } from '@utils/sentry';

export const censorEmail = (emailString = ''): string => {
  if (!emailString) return '';
  const parts = emailString.split('@');
  const name = parts[0];
  let result = name.charAt(0);
  for (let i = 1; i < name.length; i++) {
    result += '*';
  }
  result += name.charAt(name.length - 1);
  result += '@';
  const domain = parts[1];
  result += domain.charAt(0);
  const dot = domain.indexOf('.');
  for (let i = 1; i < dot; i++) {
    result += '*';
  }
  result += domain.substring(dot);

  return result;
};

export const censorPhone = (phone = ''): string => {
  if (!phone) return '';
  const parts = phone.split(' ');
  try {
    const firstPart = ` (${parts[1].replace(/\d.$/, '**')}) `;
    const secondPart = parts[3].replace(/\d./, '*** **');
    return [parts[0], firstPart, secondPart].join('');
  } catch (e) {
    return phone;
  }
};

export const IdentifyUser = async ({
  login,
  callback,
}: {
  login: (e?: any) => any;
  callback?: (user: any) => any;
}): Promise<void> => {
  const {
    data: {
      id: userId,
      email,
      givenName,
      familyName,
      phoneNumber,
      referralCode,
      typeformSubmitted,
      signedUp,
      emailVerified,
      phoneVerified,
    },
  }: any = await nextApi
    .get('/users/me', {
      timeout: 1000 * 60,
      validateStatus: () => true,
    })
    .catch(() => {
      sentryCaptureException({ info: 'unable to fetch /users/me', error: {} });
    });
  const user = {
    userId,
    email,
    givenName,
    familyName,
    phoneNumber,
    referralCode,
    typeformSubmitted,
    signedUp,
    emailVerified,
    phoneVerified,
  };
  if (typeof window !== 'undefined' && window?.hasOwnProperty('analytics') && signedUp) {
    setTimeout(() => {
      const windowAnalytics = (window as any).analytics;
      const userPaylod = {
        email,
        firstName: givenName,
        lastName: familyName,
        phoneNumber,
        typeformSubmitted,
        referralCode,
        signedUp,
        name: `${givenName} ${familyName}`,
        gclid: jsCookie.get('gclid'),
      };
      windowAnalytics?.identify(userId, userPaylod);
      windowAnalytics?.track('user-signed-in', userPaylod);
      if ((window as any)?.amplitude) {
        (window as any)?.amplitude.setUserId(userId);
      }
      jsCookie.set('Identified', '1', { expires: 365 });
    }, 0);
  }
  setTimeout(() => {
    login(user);
    window.localStorage.setItem('UserObject', JSON.stringify(user));
    if (callback) {
      callback(user);
    }
  }, 1000);
};

export const isInlineAuth = (): boolean => window.location.pathname.includes('user-onboarding');
export default {};
