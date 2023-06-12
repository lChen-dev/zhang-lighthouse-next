/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';

import { useOnScreen } from '@hooks/common';
import { Property } from '@models/Property';
import PropertyCard from '@components/shared/property/PropertyCard';
import { isElementPartiallyInViewport } from '@utils/scroll-utils';
import { sendTrack } from '@utils/analytics';
import { useAuth } from 'context/auth';

interface Props {
  result: Property;
  hoveredId?: string | null;
  onMouseIn: () => void;
  onMouseOut: () => void;
  setShowAuth?: (e?: any) => any;
}

const Result: React.FC<Props> = ({ result, hoveredId, onMouseIn, onMouseOut, setShowAuth }: Props) => {
  const { name, id } = result;
  const { user } = useAuth();
  const ref = React.useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    document.querySelector('.desktoplistcontainer')?.addEventListener('scroll', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        Array.from(document.querySelectorAll('.flickityslider.hidden')).forEach((el: any) => {
          if (isElementPartiallyInViewport(el)) {
            el.classList.remove('hidden');
          }
        });
      }, 300);
    });

    Array.from(document.querySelectorAll('.flickityslider.hidden'))
      .slice(0, 10)
      .forEach((el: any) => {
        if (isElementPartiallyInViewport(el)) {
          el.classList.remove('hidden');
        }
      });

    if (ref.current && hoveredId && hoveredId === id) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      sendTrack('CardViewed', {
        category: 'map',
        label: 'CardViewed',
        action: 'CardViewed',
        property: name,
      });
    }

    return () => clearTimeout(timer);
  }, [id, name, hoveredId]);

  return (
    <PropertyCard
      property={result}
      hidePhotos={!isVisible}
      onMouseEnter={onMouseIn}
      onMouseLeave={onMouseOut}
      onTouchEnd={onMouseIn}
      ref={ref}
      setShowAuth={setShowAuth}
      user={user}
    />
  );
};

export default Result;
