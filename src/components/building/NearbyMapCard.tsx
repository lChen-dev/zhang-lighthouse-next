import { B2, H5 } from '@components/shared/Typography';
import { forwardRef } from 'react';
import { Rating } from './Rating';

interface INearbyMapCard {
  image?: string;
  name: string;
  description?: string;
  rating?: number;
  features?: string[];
}

export const NearbyMapCard = forwardRef<HTMLDivElement, INearbyMapCard>((props: INearbyMapCard, ref) => {
  return (
    <div
      ref={ref}
      className="cursor-pointer w-60 pb-4 flex flex-shrink-0 flex-col mb-3 box-border border border-gray-300 shadow-brand-lg mx-1 bg-white rounded z-10 absolute"
      style={{ bottom: '94%', left: '-8rem', filter: 'drop-shadow(0px 4px 25px rgba(42, 52, 58, 0.3))' }}
    >
      {props.image && (
        <div className="w-full h-24 text-white relative overflow-hidden" style={cardThumbStyle(props.image)}></div>
      )}

      <div className="px-3 flex-col justify-center w-full">
        <H5 weight="font-bold" className="mt-3 truncate" style={{ lineHeight: '1.5rem' }}>
          {props.name}
        </H5>
        <B2 className="mt-1" weight="font-book">
          {' '}
          {titleCase(props.description || '')}{' '}
        </B2>
        <div className="flex flex-nowrap pt-2 pb-1">
          <B2 weight="font-book" className="pr-1">
            {props.rating || 0}
          </B2>{' '}
          <Rating rating={props.rating || 0} iconHeight={16} iconWidth={16} />
        </div>
      </div>
      <div className="arrow-down" style={{ bottom: '-11px', right: 'calc(50% - 20px)' }} />
      <div className="arrow-down-shadow absolute" style={{ bottom: '-13px', right: 'calc(50% - 22px)' }} />
    </div>
  );
});

const titleCase = (text: string): string => {
  if (!text) {
    return '';
  }

  const sentence = text
    .toLowerCase()
    .replace(/_/g, ' ')
    .split(' ');
  for (let i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }

  return sentence.join(' ');
};

const cardThumbStyle = (url: string) => {
  return {
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };
};
