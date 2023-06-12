import { BodyText, MediumSubHeading } from '@components/shared/ResponsiveFonts';
import { LinkIcon } from '@components/shared/Icons';
import { TransparentStarRating } from './TrustPilotRating';

export const TrustPilotSlider = ({
  rating = 5,
  name = '',
  title = '',
  description = '',
  link = undefined,
}: {
  rating?: number;
  name: string;
  title: string;
  description: string;
  link?: string | undefined;
}): React.ReactElement => (
  <div className="block bg-white relative w-full slideContainer">
    <div
      className="rounded-md p-10 block relative bg-white"
      style={{ minHeight: '326px', border: '1px solid rgba(0,0,0,0.1)' }}
    >
      <BodyText
        fontSizeClass="text-18px"
        fontClass="font-cicular"
        style={{ color: 'rgba(0,0,0,.6)' }}
        otherClasses="pb-10 flex text-left">
        {name}
        <div className="pl-2">
          <a href={link} target="_blank" rel="noreferrer" className="trustPilotLink">
            <LinkIcon width={16} height={16} />
          </a>
        </div>
      </BodyText>
      <div className="pb-5">
        <TransparentStarRating rating={rating} />
      </div>
      <div className="pb-5">
        <MediumSubHeading
          fontSizeClass="text-24px"
          textColorClass="text-black"
          fontClass="font-circular"
          otherClasses="text-left"
        >
          {title}
        </MediumSubHeading>
      </div>
      <div className="block pr-4">
        <BodyText
          fontWeightClass="font-light"
          textColorClass="text-gray-template"
          fontSizeClass="text-18px"
          otherClasses="text-left"
          fontClass="font-circular"
          customTag="p"
          style={{ lineHeight: '31.5px' }}>
          {description.length > 300
            ? description
                .slice(0, 300)
                .split(' ')
                .slice(0, -1)
                .join(' ') + '...'
            : description}
        </BodyText>
      </div>
    </div>
  </div>
);

export default TrustPilotSlider;
