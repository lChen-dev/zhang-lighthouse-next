import React, { useEffect, useState } from 'react';

import { Property } from '@models/Property';
import ButtonCta from '@components/shared/ButtonCta';
import { B2, H4 } from '@components/shared/Typography';

interface Props {
  property?: Property;
}

const PriceNotice: React.FC<Props> = ({ property }: Props) => {
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    if (!property) return;

    setShowNotice(!localStorage.getItem(getKey(property)));
  }, [property]);

  if (!property || !showNotice) return null;
  return (
    <div className="fixed bottom-0 flex flex-row justify-center w-full p-2 z-50 md:p-4">
      <div
        className="shadow-brand-md border border-gray-lighter rounded-md p-4 flex flex-col items-center bg-white w-full md:flex-row"
        style={{ maxWidth: '920px' }}
      >
        <div className="flex-1 w-full md:mr-4">
          <H4>Notice</H4>
          <B2 color="text-gray-soft">
            Lighthouse prices are not accurate, but our cash back is! We recommend checking prices on the property
            website.
          </B2>
        </div>
        <div className="flex flex-col sm:flex-row mt-4 justify-end w-full md:w-auto">
          {property.website && (
            <ButtonCta
              variant="light"
              className="justify-center sm:mr-2"
              onClick={() => {
                window.open(property.website, '_blank', 'noreferrer noopener');
              }}
            >
              See price on site
            </ButtonCta>
          )}
          <ButtonCta
            className="mt-2 justify-center sm:mt-0"
            onClick={() => {
              setShowNotice(false);
              localStorage.setItem(getKey(property), 'true');
            }}
          >
            OK, got it
          </ButtonCta>
        </div>
      </div>
    </div>
  );
};

function getKey(property: Property): string {
  return `price_notice:${property.id}`;
}

export default PriceNotice;
