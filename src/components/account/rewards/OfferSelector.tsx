/* eslint-disable react/jsx-one-expression-per-line */

import React, { useCallback, useState } from 'react';
import classNames from 'classnames';

import { Lease } from '@models/Lease';
import { nextApi } from '@utils/http';
import { pluralize } from '@utils/format';
import { useErrors } from '@hooks/errors';
import Button from '@components/shared/Button';
import { CheckIcon, LeftArrowIcon, RightArrowIcon } from '@components/shared/Icons';
import LoadingSpinner from '@components/shared/LoadingSpinner';

// region Helpers
enum OfferType {
  UNSELECTED = 'UNSELECTED',
  ONE_TIME = 'LUMP',
  MONTHLY = 'MONTHLY',
}

function getFailsafeMsg(offer: OfferType, { lumpRewardAmount, monthlyRewardAmount, leaseLength }: Lease): string {
  if (offer === OfferType.MONTHLY) return `Receive ${leaseLength} monthly payments of $${monthlyRewardAmount}?`;
  return `Receive one payment of $${lumpRewardAmount}?`;
}

function getInitialOfferSelection({ lumpRewardAmount, monthlyRewardAmount }: Lease): OfferType {
  if (lumpRewardAmount && monthlyRewardAmount) return OfferType.UNSELECTED;
  if (lumpRewardAmount) return OfferType.ONE_TIME;
  return OfferType.MONTHLY;
}
// endregion Helpers

interface Props {
  leases: Lease[];
  onConfirm: () => Promise<boolean>;
}

export default function OfferSelector({ leases, onConfirm }: Props): JSX.Element {
  const { addError } = useErrors();
  const [selectedOffers, setSelectedOffers] = useState(
    leases.reduce<{ [key: string]: OfferType }>(
      (obj, lease) => ({
        ...obj,
        [lease.id]: getInitialOfferSelection(lease),
      }),
      {},
    ),
  );
  const [confirming, setConfirming] = useState(false);
  const [saving, setSaving] = useState(false);

  const confirmOffers = useCallback(async () => {
    setSaving(true);
    await Promise.all(
      leases.map(async (lease) => {
        await nextApi
          .post(`/leases/${lease.id}/accepted_offer`, {
            offerType: selectedOffers[lease.id].toString(),
          })
          .catch(addError);
      }),
    );
    await onConfirm().catch(addError);
    setSaving(false);
  }, [addError, leases, selectedOffers, onConfirm]);

  const renderConfirmBtn = () => {
    const anyUnselected = Object.keys(selectedOffers).some((key) => selectedOffers[key] === OfferType.UNSELECTED);
    return (
      <div className="flex flex-col md:flex-row">
        <Button
          text="Confirm"
          type="button"
          className="justify-center"
          disabled={anyUnselected}
          onClick={() => setConfirming(true)}
          iconRight={<RightArrowIcon />}
        />
      </div>
    );
  };

  const renderFailsafe = () => (
    <>
      {leases.map((lease) => (
        <div className="bg-white p-4 mb-2 border max-w-screen-sm shadow-sm font-circular">
          <h2 className="text-gray-700 font-bold">{lease.property?.name}</h2>
          <p className="text-base">{getFailsafeMsg(selectedOffers[lease.id], lease)}</p>
        </div>
      ))}
      <div className="pt-4 flex flex-col md:flex-row">
        <Button
          text="Accept offer"
          className="mr-0 md:mr-2 mb-2 md:mb-0 justify-center"
          type="button"
          disabled={saving}
          onClick={confirmOffers}
          iconRight={saving ? <LoadingSpinner /> : <CheckIcon />}
        />
        <Button
          white
          text="Change offer"
          type="button"
          className="justify-center"
          iconLeft={<LeftArrowIcon />}
          onClick={() => setConfirming(false)}
        />
      </div>
    </>
  );

  let title = `Select your Cash Back ${pluralize(leases.length, 'offer')}.`;
  if (confirming) {
    title = `Review Cash Back offer ${pluralize(leases.length, 'selection')}`;
  }
  return (
    <div className="px-6 md:px-12 py-4">
      <h2 className="font-bold text-green text-lg">{title}</h2>
      <p className="mb-6">{confirming ? 'Verify the offer is correct' : 'Please select one per lease'}</p>
      {!confirming &&
        leases.map((lease) => {
          const { lumpRewardAmount, monthlyRewardAmount, property, leaseLength } = lease;
          const selectedOffer = selectedOffers[lease.id];
          return (
            <>
              <h2 className="text-gray-700 font-bold mb-2">{property?.name}</h2>
              <div className="flex flex-col mb-2 md:mb-8 md:flex-row">
                {lumpRewardAmount && (
                  <OfferDisplay
                    amount={lumpRewardAmount}
                    paymentType="One Payment"
                    description="One month after move-in"
                    selected={selectedOffer === OfferType.ONE_TIME}
                    onClick={() =>
                      !confirming &&
                      setSelectedOffers({
                        ...selectedOffers,
                        [lease.id]: OfferType.ONE_TIME,
                      })
                    }
                    disabled={confirming && selectedOffer !== OfferType.ONE_TIME}
                  />
                )}
                {monthlyRewardAmount && (
                  <OfferDisplay
                    amount={monthlyRewardAmount * leaseLength}
                    paymentType="Monthly Rewards"
                    description={`${leaseLength} montly payments of $${monthlyRewardAmount}`}
                    selected={selectedOffer === OfferType.MONTHLY}
                    onClick={() =>
                      !confirming &&
                      setSelectedOffers({
                        ...selectedOffers,
                        [lease.id]: OfferType.MONTHLY,
                      })
                    }
                    disabled={confirming && selectedOffer !== OfferType.MONTHLY}
                  />
                )}
              </div>
            </>
          );
        })}

      {confirming ? renderFailsafe() : renderConfirmBtn()}
    </div>
  );
}

interface OfferProps {
  amount: number;
  paymentType: string;
  description: string;
  onClick: () => void;
  selected: boolean;
  disabled: boolean;
}
function OfferDisplay({ amount, paymentType, description, onClick, selected, disabled }: OfferProps): JSX.Element {
  if (selected) {
    return (
      <button
        type="button"
        className="shadow-md border border-green bg-green-lightest pt-5 sm:pt-10 px-5 sm:px-10 pb-8 text-center mb-4 sm:mb-0 sm:mr-8 border-solid rounded-sm focus:outline-none"
        onClick={onClick}>
        <h1 className="text-5xl text-green">${amount}</h1>
        <p className="font-bold mt-2 mb-1">{paymentType}</p>
        <p className="text-gray-700">{description}</p>
      </button>
    );
  }
  return (
    <button
      type="button"
      className={classNames(
        'bg-white pt-5 sm:pt-10 px-5 sm:px-10 pb-8 text-center mb-4 sm:mb-0 sm:mr-8 border-solid border rounded-sm border-gray-lighter focus:outline-none hover:shadow-md',
        {
          'opacity-50': disabled,
        },
      )}
      onClick={onClick}>
      <h1 className="text-5xl text-green">${amount}</h1>
      <p className="font-bold mt-2 mb-1">{paymentType}</p>
      <p className="text-gray-700">{description}</p>
    </button>
  );
}
