import { sendTrack } from '@utils/analytics';
import { Property as IProperty } from '@models/Property';

export default class Property {
  public static getPropertyDetails(property: IProperty): object {
    return {
      propertName: property.name,
      propertNanoId: property.nanoId,
      propertyCity: property.city,
    };
  }

  /**
   *  When proeprties page is loaded by user
   * */
  public static viewed(property: IProperty | undefined): void {
    sendTrack('Property page viewed by user', {
      category: 'property',
      action: 'propertyViewed',
      ...(property ? Property.getPropertyDetails(property) : {}),
    });
  }

  /**
   * When user showes interest in the given property
   * Example clicks on i want to apply, learn and tour
   * */

  public static interested(property: IProperty, interestType: 'apply' | 'learn' | 'tour'): void {
    sendTrack('User interested in property', {
      category: 'property',
      action: 'userInterestInProperty',
      interestType,
      ...Property.getPropertyDetails(property),
    });
  }
}
