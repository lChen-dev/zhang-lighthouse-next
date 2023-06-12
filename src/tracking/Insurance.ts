import { sendTrack } from '@utils/analytics';
import GA from '@tracking/storage/GA';

export default class Insurance {
  public static pageLoaded(): void {
    sendTrack('Insurance Page Opened', {
      category: 'insuranceFunnel',
      action: 'insurancePageOpened',
      ...GA.getGADataFromCookie(),
    });
  }

  public static addPolicyClicked(): void {
    sendTrack('Insurance Add A Policy', {
      category: 'insuranceFunnel',
      action: 'AddAPolicy',
      ...GA.getGADataFromCookie(),
    });
  }
}
