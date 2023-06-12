import { BodyText } from '@components/shared/ResponsiveFonts';
import {
  TrustPilotFullBoxStar,
  TrustPilotHalfBoxStar,
  TrustPilotEmptyBoxStar,
  TrustPilotTransparentBoxStar,
} from '@components/shared/Icons';
import { TrustPilotLogo } from '../../../shared/Svgs';

const StarRating = ({ rating = 5, reviews = 20 }: { rating: number; reviews: string | number }): React.ReactElement => {
  let isHalfRating: any = Math.floor(rating) !== Math.ceil(rating);
  isHalfRating = isHalfRating >= 5 ? 5 : isHalfRating;
  isHalfRating = isHalfRating <= 0 ? 0 : isHalfRating;

  const stars: any = [];
  if (isHalfRating) {
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push(<TrustPilotFullBoxStar />);
      } else if (i === Math.floor(rating)) {
        stars.push(<TrustPilotHalfBoxStar />);
      } else {
        stars.push(<TrustPilotEmptyBoxStar />);
      }
    }
  } else {
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push(<TrustPilotFullBoxStar />);
      } else {
        stars.push(<TrustPilotEmptyBoxStar />);
      }
    }
  }
  return (
    <div
      className="sm:block flex relative trustPilotContainer"
      style={{
        minWidth: '320px',
        width: '320px',
      }}>
      <div className="block w-full">
        <a href="https://www.trustpilot.com/review/lighthouse.app" target="_blank" rel="noreferrer">
          <div className="block pt-5">
            <TrustPilotLogo />
          </div>
          <div className="block">
            <div className="flex w-full py-5">{stars.map((star: any) => star)}</div>
          </div>
        </a>
      </div>
      <div className="block w-full sm:py-0 pt-5 sm:pl-0 pl-8">
        <BodyText
          otherClasses="block"
          fontSizeClass="text-36px"
          fontWeightClass="font-medium"
          textColorClass="text-trustpilot">
          {rating}
        </BodyText>
        <BodyText otherClasses="block" fontWeightClass="font-normal" textColorClass="text-gray-template">
          {reviews} reviews
        </BodyText>
      </div>
    </div>
  );
};

export const TransparentStarRating = ({ rating = 5 }: { rating?: number }): React.ReactElement => {
  const stars: any = [];
  let starRating = rating >= 5 ? 5 : rating;
  starRating = rating <= 0 ? 0 : rating;

  for (let i = 0; i < starRating; i++) {
    stars.push(<TrustPilotTransparentBoxStar />);
  }
  return <div className="flex">{stars.map((star: any) => star)}</div>;
};
export default StarRating;
