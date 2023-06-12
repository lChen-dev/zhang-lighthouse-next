import { sendTrack } from '@utils/analytics';

export default class Admin {
  public static insurancePageLoaded(): void {
    sendTrack('Admin Insurance Page Opened', {
      category: 'admin',
      action: 'InsurancePageLoaded',
    });
  }

  public static addPolicyClicked(): void {
    sendTrack('Admin Insurance Page Opened', {
      category: 'insuranceFunnel',
      action: 'AddAPolicy',
    });
  }
}
