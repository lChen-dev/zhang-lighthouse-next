import { sendTrack } from '@utils/analytics';

export default class Authentication {
  public static loginPage(): void {
    sendTrack('Auth Login Page', {
      category: 'authentication',
      action: 'loginPage',
    });
  }

  public static verifyPage(): void {
    sendTrack('Auth Verify Code', {
      category: 'authentication',
      action: 'verifyPage',
    });
  }

  public static loginSuccess(): void {
    sendTrack('Auth Login Success', {
      category: 'authentication',
      action: 'loginSuccess',
    });
  }
}
