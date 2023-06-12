import React, { useEffect } from 'react';

import { Property } from '@models/Property';
import PropertyCard from '@components/shared/property/PropertyCard';
import HorizontalPropertyCard from '@components/shared/property/HorizontalPropertyCard';
import { sendTrack } from '@utils/analytics';
import { useAuth } from 'context/auth';

interface Props {
  result: Property;
  hoveredId?: string | null;
  onMouseIn: () => void;
  onMouseOut: () => void;
  scrollIntoView: boolean;
  onClose?: () => void;
  type?: 'vertical' | 'horizontal';
  setShowAuth?: (e?: any) => any;
}

const MobileResult: React.FC<Props> = ({
  result,
  hoveredId,
  scrollIntoView,
  onClose,
  type = 'vertical',
  setShowAuth,
}: Props) => {
  const { name, id } = result;
  const ref = React.useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  useEffect(() => {
    if (scrollIntoView && ref.current && hoveredId && hoveredId === id) {
      setTimeout(() => {
        ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      }, 1000);
      sendTrack('CardViewed', {
        category: 'map',
        label: 'CardViewed',
        action: 'CardViewed',
        property: name,
      });
    }
  }, [id, name, hoveredId]);

  return (
    <>
      {type === 'vertical' ? (
        <PropertyCard property={result} onClose={onClose} ref={ref} mobile setShowAuth={setShowAuth} user={user} />
      ) : (
        <HorizontalPropertyCard
          property={result}
          onClose={onClose}
          ref={ref}
          mobile
          setShowAuth={setShowAuth}
          user={user}
        />
      )}
    </>
  );
};

export default MobileResult;
