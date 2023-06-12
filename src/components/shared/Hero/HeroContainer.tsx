import classNames from 'classnames';
import { LargeHeading, SubHeading } from '../ResponsiveFonts';
import { H1 } from '@components/shared/Typography';

const HeroContainer = ({
  heading,
  subHeading = '',
  children,
  image = '/static/assets/images/hero-cover.jpg',
  height = '800px',
  headingClass = 'pt-24 md:w-5/12 md:text-left text-center w-full',
  headingTextClass = 'text-gray-800',
  subHeadingTextClass = 'text-gray-700',
  paddingClass = 'xl:px-4 px-6',
  subHeadingWidth = 'md:w-9/12 w-full',
}: {
  heading: string;
  subHeading?: string;
  children?: any;
  image?: string;
  height?: string;
  headingClass?: string;
  headingTextClass?: string;
  subHeadingTextClass?: string;
  paddingClass?: string;
  subHeadingWidth?: string;
}): React.ReactElement => (
  <div
    className="w-full relative flex flex-col xl:items-center items-start"
    style={{
      background: '#fff',
      height,
      maxHeight: height,
      minHeight: height,
      zIndex: 1,
    }}>
    <div className={classNames('z-20 w-full max-w-screen-xl mx-auto xl:pt-32 md:pt-30 pt-20', paddingClass)}>
      {heading && (
        <LargeHeading
          otherClasses={headingClass}
          textColorClass={headingTextClass}
          fontWeightClass="font-bold"
          style={{ letterSpacing: '0.01em', lineHeight: '1em', textShadow: '0px 4px 40px rgba(0, 0, 0, 0.5)' }}>
          {heading}
        </LargeHeading>
      )}
      <SubHeading
        fontClass="font-circular"
        textColorClass={subHeadingTextClass}
        fontWeightClass="font-normal"
        otherClasses={`md:text-left text-center py-8 ${subHeadingWidth}`}
        customTag="h2"
        style={{ letterSpacing: '0.01em' }}>
        {subHeading}
      </SubHeading>
      {children}
    </div>
    <div className="absolute w-screen top-0 left-0">
      {image && (
        <img src={image} alt="navCover" className="object-cover navCoverImg w-full h-full" style={{ height }} />
      )}
    </div>
  </div>
);
export default HeroContainer;
