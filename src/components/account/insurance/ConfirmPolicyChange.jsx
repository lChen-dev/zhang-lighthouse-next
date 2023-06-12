import React, { useEffect, useState } from 'react';

import ButtonCta from '@components/shared/ButtonCta';
import { B2, H4 } from '@components/shared/Typography';
import Skeleton from 'react-loading-skeleton';

export default function ConfirmPolicyChange({
  openCheckoutModal,
  monthlyPremium,
  updatedTotalPremium,
  updateDisabled,
}) {
  return (
    <div className="fixed bottom-0 flex flex-row justify-center items-center w-full md:w-auto p-2 z-50 md:p-4 mt-3 pt-80 mb-5">
      <div
        className="shadow-brand-md border border-gray-lighter rounded-md p-4 flex flex-col items-center bg-white w-full md:flex-row"
        style={{ maxWidth: '920px' }}>
        <div className="flex-1 w-full md:mr-4">
          <H4>Change Policy</H4>
          <B2 color="text-gray-soft">You have selected changes to your policy.</B2>
        </div>
        <div className="flex flex-col sm:flex-row mt-4 justify-center w-full md:w-auto">
          <p className="o-policy-card__monthly-premium">
            {isNaN(monthlyPremium) ? (
              <Skeleton width={100} />
            ) : (
              <span>${monthlyPremium.toFixed(2)}/mo &nbsp; ➔ &nbsp;</span>
            )}
            {isNaN(updatedTotalPremium) ? (
              <Skeleton width={120} />
            ) : (
              <span
                className="o-policy-card__monthly-premium mr-8 ml-3"
                style={{ display: 'inline', color: '#34966D' }}>
                ${updatedTotalPremium}/mo
              </span>
            )}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row mt-4 justify-end w-full md:w-auto">
          <ButtonCta
            disabled={!monthlyPremium || updateDisabled}
            className="mt-2 justify-center sm:mt-0"
            onClick={openCheckoutModal}>
            Confirm Changes
          </ButtonCta>
        </div>
      </div>
    </div>
  );
}
