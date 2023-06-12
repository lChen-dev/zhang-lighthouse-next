import React from 'react';

import {
  FacebookGreenIcon,
  InstagramGreenIcon,
  TwitterGreenIcon,
  LinkIconGreen,
  CellPhone,
} from '@components/shared/Icons';
import { H4, B1 } from '@components/shared/Typography';
import { Property } from '@models/Property';
import { getMetaCategory, SocialCategory } from '@utils/property-helpers';

interface Props {
  property?: Property;
}

const showPropertyInfo = (property: Property | undefined): boolean => {
  const website = property?.website === 'None' ? undefined : property?.website;
  return !!(website || property?.phone);
};

const PropertyContactInfo: React.FC<Props> = ({ property }: Props) => {
  const socialMeta = getMetaCategory<SocialCategory>('social', property);
  const showSocialIcons = Object.keys(socialMeta).length > 0;
  if (!showSocialIcons && !showPropertyInfo(property)) {
    // we don't have any data to display
    return <></>;
  }

  return (
    <div className="p-0 sm:p-5 sm:pl-0 | mb-4 md:mb-0 mt-10 lg:mt-0">
      <H4 className="mb-2 md:mb-8 font-circular text-24px font-medium">Contact information</H4>
      <div className="flex md:flex-no-wrap mb-8 md:mb-0 flex-wrap-reverse | overflow-hidden">
        {showSocialIcons && (
          <div className="flex-initial | right-border pr-4 pt-6 md:py-2">
            <div className="flex justify-center md:justify-start w-full">
              {socialMeta.facebook && (
                <a href={socialMeta.facebook} className="pr-2" target="_blank" rel="noopener noreferrer">
                  <FacebookGreenIcon width="56" height="56" />
                </a>
              )}
              {socialMeta.twitter && (
                <a href={socialMeta.twitter} className="pr-2" target="_blank" rel="noopener noreferrer">
                  <TwitterGreenIcon width="56" height="56" />
                </a>
              )}
              {socialMeta.instagram && (
                <a href={socialMeta.instagram} className="pr-2" target="_blank" rel="noopener noreferrer">
                  <InstagramGreenIcon width="56" height="56" />
                </a>
              )}
            </div>
          </div>
        )}

        <div className={`flex-initial font-circular w-full ${showSocialIcons ? 'md:pl-8' : ''} py-2`}>
          {property?.website && (
            <div className="flex flex-row">
              <LinkIconGreen width={18} height={20} />
              <a
                href={property.website}
                target="_blank"
                rel="noopener noreferrer"
                className="pl-3"
                style={{ width: '90%' }}
              >
                <B1 style={{ lineHeight: '1.25rem', maxWidth: '90%' }} className="truncate" weight="font-book">
                  {property.website}
                </B1>
              </a>
            </div>
          )}
          {property?.phone && (
            <div className="flex flex-row | pt-2 md:pt-3">
              <CellPhone width={16} height={20} />
              <a
                href={`tel:${property.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="pl-3"
              >
                <B1 weight="font-book" style={{ lineHeight: '1.25rem' }}>
                  {property.phone}
                </B1>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyContactInfo;
