import Cookies from 'js-cookie';
import isPlainObject from '@utils/isPlainObject';

export const USER_INDEX = 'lh_user';
export const ACCESS_TOKEN_INDEX = 'lh_tk';

const COOKIE_OPTIONS = {
  secure: true,
  expires: 100,
};

const safeJsonParse = (payload: any) => {
  try {
    return JSON.parse(payload);
  } catch (error) {
    // pass
  }
  return undefined;
};

const safeJsonStringify = (val: any) => {
  try {
    return JSON.stringify(val);
  } catch (error) {
    // pass
  }
  return '';
};

export const getUserFromCookie = () => {
  const resp = safeJsonParse(Cookies.get(USER_INDEX));
  if (resp) {
    return resp;
  }
  return null;
};

export const setUserInCookie = (user: any): void => {
  Cookies.set(USER_INDEX, safeJsonStringify(user), COOKIE_OPTIONS);
};

export function shallowEqual(object1: any, object2: any): boolean {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }
  return true;
}

export const isSameUser = (stateUser: any, cookieUser: any): boolean => {
  if (isPlainObject(stateUser) && isPlainObject(cookieUser)) {
    return shallowEqual(stateUser, cookieUser);
  }

  return stateUser === null && cookieUser === null;
};

export function onVisibilityChangeText(): string {
  let visibilityChange;
  const doc = document as any;
  // Opera 12.10 and Firefox 18 and later support
  if (typeof doc.hidden !== 'undefined') {
    visibilityChange = 'visibilitychange';
  } else if (typeof doc.mozHidden !== 'undefined') {
    visibilityChange = 'mozvisibilitychange';
  } else if (typeof doc.msHidden !== 'undefined') {
    visibilityChange = 'msvisibilitychange';
  } else if (typeof doc.webkitHidden !== 'undefined') {
    visibilityChange = 'webkitvisibilitychange';
  }
  return visibilityChange ?? '';
}

export const getUserCookieFromServer = (req: any) => {
  const cookies = getSSCookiesMap(req.headers.cookie);
  return cookies[USER_INDEX];
};

export function getSSCookiesMap(cookiesString: any) {
  if (!cookiesString) {
    return {};
  }

  const ret: { [key: string]: any } = {};
  for (const row of cookiesString.split(';')) {
    const [key, value] = row.trim().split('=');
    if (value) {
      ret[key] = safeJsonParse(decodeURI(value));
    } else {
      ret[key] = decodeURI(value);
    }
  }
  return ret;
}

export const parseCookie = (cookieString?: string) =>
  (cookieString || '')
    .split(';')
    .map((v) => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {} as { [key: string]: string });
