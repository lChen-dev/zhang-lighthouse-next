import GA from '@tracking/storage/GA';
import { authed } from '@utils/http';
import { sentryCaptureException } from '@utils/sentry';
import jsCookie from 'js-cookie';
import { nanoid } from 'nanoid';

const TRAFFIC_SOURCE = {
  googleAd: 'GOOGLE_AD',
};

const DEFAULT_COOKIE_EXPIRATION = 30;
const AUTH_USER_INDEX = 'authUser';

export default class Storage {
  public static async init(): Promise<void> {
    Storage.setUserSource();
    GA.setGAData();
  }

  public static setUserSource(): void {
    if (Storage.getUserSource()) {
      // if user source is set we dont need to update
      return;
    }

    if (GA.hasActiveParams()) {
      // User came from google ads
      jsCookie.set('userSource', TRAFFIC_SOURCE.googleAd, { expires: DEFAULT_COOKIE_EXPIRATION });
    }
  }

  public static getUserSource(): string {
    return jsCookie.get('userSource') || '';
  }

  public static getUserID(): string {
    return jsCookie.get('ga_user') || '';
  }

  public static setUserID(): void {
    if (Storage.getUserID()) {
      return;
    }

    jsCookie.set('ga_user', nanoid(), { expires: DEFAULT_COOKIE_EXPIRATION });
  }

  public static setUserIP(): void {
    authed
      .get('/self/user-ip', { timeout: 2 * 60 * 1000 })
      .then(({ data: userIP }) => {
        jsCookie.set('userIP', userIP);
      })
      .catch((e) => {
        jsCookie.set('userIP', '');
      });
  }

  public static getAuthUser(): any  {
    const userInfo = window.localStorage.getItem(AUTH_USER_INDEX);
    if (!userInfo) {
      return; 
    }

    return JSON.parse(userInfo)
  }

  public static async setAuthUser(){
    try {
      const { data } = await authed('/me', { validateStatus: () => true });
      if (data.sub) {
        window.localStorage.setItem(AUTH_USER_INDEX, JSON.stringify(data));
      } 
    } catch (error) {
      sentryCaptureException({
        info: 'unable to setAuthUser',
        error,
      });
    }
  }
}
