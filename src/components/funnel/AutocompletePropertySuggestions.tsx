import React, { useState } from 'react';
import { openURLInNewTab } from '@utils/helpers';
import { House } from '@components/shared/Icons';

export interface PropertySuggestions {
  name: string;
  nanoId: string;
}

interface Props {
  properties: PropertySuggestions[];
  customClass?: string;
}

export const AutocompletePropertySuggestions = ({ properties, customClass }: Props) => {
  if (properties?.length === 0) {
    return null;
  }
  const [activeProperty, setActiveProperty] = useState<string>('');

  return (
    <div>
      {properties.map((property) => (
        <React.Fragment key={property.nanoId}>
          <a
            onMouseEnter={() => {
              setActiveProperty(property.nanoId);
            }}
            onMouseLeave={() => {
              setActiveProperty('');
            }}
            target="_blank"
            rel="noopener noreferrer"
            href={`/building/${property.nanoId}`}
            className={`${customClass} city-option`}
            style={{ padding: '6px 12px' }}
          >
            <div className="city-name">
              <span className="mr-2">
                <House width={20} height={20} color={activeProperty === property.nanoId ? '#34966D' : undefined} />
              </span>{' '}
              {property.name}
            </div>
          </a>
        </React.Fragment>
      ))}
    </div>
  );
};
