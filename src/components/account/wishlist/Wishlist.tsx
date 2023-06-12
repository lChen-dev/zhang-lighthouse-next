import React from 'react';
import { B1, B2, H2 } from '@components/shared/Typography';
import { LoadingSpinner } from '@components/shared';
import PropertyCard from '@components/shared/property/PropertyCard';
import { useWishlists } from '@hooks/account';
import { useWindowWidth } from '@react-hook/window-size';
import HorizontalPropertyCard from '@components/shared/property/HorizontalPropertyCard';

const Wishlist: React.FC = () => {
  const { data: wishlist } = useWishlists();
  const width = useWindowWidth();
  return (
    <div className="px-4 py-4 pb-16 xl:px-12 mr-auto ml-auto w-full" style={{ maxWidth: 1080 }}>
      <H2 className="mt-0 lg:mt-8 font-bold">Wishlist</H2>
      <B2 className="mb-10" weight="book">
        These are your favorite units
      </B2>
      {wishlist ? (
        <div className="grid grid-cols-1 gap-2 xl:grid-cols-2 xl:gap-4">
          {wishlist.map((property) => (
            <>
              {width >= 768 ? (
                <PropertyCard key={property.nanoId} property={{ ...property, isFavorite: true }} mobile={false} />
              ) : (
                <HorizontalPropertyCard
                  style={{ margin: '0 auto', width: '100%' }}
                  key={property.nanoId}
                  property={{ ...property, isFavorite: true }}
                  mobile
                />
              )}
            </>
          ))}
          {wishlist.length === 0 && <B1 weight="book">You have no favorite units.</B1>}
        </div>
      ) : (
        <div className="py-12 flex justify-center">
          <LoadingSpinner color={'#34966D'} />
        </div>
      )}
    </div>
  );
};

export default Wishlist;
