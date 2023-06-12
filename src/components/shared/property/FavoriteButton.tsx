/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useState } from 'react';
import classNames from 'classnames';
import { mutate } from 'swr';

import { nextApi } from '@utils/http';
import { HeartIcon } from '@components/shared/Icons';
import { LoadingSpinner } from '@components/shared';
import { useErrors } from '@hooks/errors';
import { Property } from '@models/Property';

import '../css/toast.css';
import { B2 } from '@components/shared/Typography';
import Toast, { Position } from '@components/shared/Toast';
import { sendTrack } from '@utils/analytics';
import { useAuth } from 'context/auth';

interface Props {
  property: Property;
  size?: 'sm' | 'md';
  setShowAuth?: any;
}

const FavoriteButton: React.FC<Props> = ({ property, size = 'md', setShowAuth }: Props) => {
  const { addError } = useErrors();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');
  const { user } = useAuth();

  const onClickHandler = async (e?: any): Promise<void> => {
    if (!user) {
      e.preventDefault();
      e.stopPropagation();
      if (setShowAuth) setShowAuth(true);
      return;
    }
    setLoading(true);
    try {
      if (property.isFavorite) {
        sendTrack('RemovedFromWishlist', {
          category: 'Property',
          label: 'PropertyWishlist',
          action: 'PropertyWishlistRemove',
          propertyId: property.id,
          version: 1,
        });
        await nextApi.delete(`/users/wishlist/${property.id}`);
        await mutate('/users/wishlist');
        setToast('removed from');
      } else {
        sendTrack('AddedToWishList', {
          category: 'Property',
          label: 'PropertyWishlist',
          action: 'PropertyWishlistAdd',
          propertyId: property.id,
          propertyName: property.name,
          version: 1,
        });
        await nextApi.post(`/users/wishlist/${property.id}`);
        await mutate('/users/wishlist');
        setToast('added to');
      }
      // Clear toast after 5 seconds
      setTimeout(() => setToast(''), 5e3);
    } catch (e) {
      addError(e);
    }
    setLoading(false);
  };

  return (
    <>
      <div
        onClick={onClickHandler}
        className={classNames(
          'cursor-pointer hover:opacity-75',
          property.isFavorite ? 'text-orange-bright' : 'text-gray-900',
        )}>
        {loading ? (
          <LoadingSpinner color="#FFCC7B" />
        ) : (
          <HeartIcon fill={property.isFavorite} width={size === 'md' ? 26 : 17} height={size === 'md' ? 23 : 15} />
        )}
      </div>
      {toast && (
        <Toast position={Position.BOTTOM}>
          <span className="text-orange-bright text-gray-900 mr-3">
            <HeartIcon fill width={size === 'md' ? 26 : 18} height={size === 'md' ? 23 : 15} />
          </span>
          <B2>
            <b>{property.name}</b> was {toast} wishlist
          </B2>
        </Toast>
      )}
    </>
  );
};

export default FavoriteButton;
