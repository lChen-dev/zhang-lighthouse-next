import { MediumHeading, BodyText } from './ResponsiveFonts';
import { PrimaryButton } from './Buttons';

const GrayBanner = ({
  heading,
  description = '',
  buttonText = '',
  buttonHref = '#',
  containerClass = 'lg:w-7/12 w-full flex justify-center lg:justify-start lg:content-start content-center',
  style = { minHeight: '360px', background: '#F8F8F8' },
  headingAlignmentClass = 'text-left',
  subHeadingAlignmentClass = 'text-left',
}: {
  heading: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  containerClass?: string;
  style?: object;
  headingAlignmentClass?: string;
  subHeadingAlignmentClass?: string;
}): React.ReactElement => (
  <div className="gray-banner sm:p-20 p-10 max-w-screen-xl mx-auto mb-20" style={style}>
    <div className={containerClass}>
      <div className="block">
        <MediumHeading textColorClass="text-black" otherClasses={headingAlignmentClass}>
          {heading}
        </MediumHeading>
        <BodyText fontWeightClass="font-thin" otherClasses={`block pt-6 ${subHeadingAlignmentClass}`}>
          {description}
        </BodyText>
      </div>
    </div>
    {buttonText && (
      <div className="pt-10">
        <PrimaryButton href={buttonHref}>{buttonText}</PrimaryButton>
      </div>
    )}
  </div>
);

export default GrayBanner;
