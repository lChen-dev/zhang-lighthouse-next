/**
 * @see https://docs.google.com/spreadsheets/d/1OxQIoAm-iGINk6NnKpbk3BR-WaqMUWSYZ0TIKWj2vIU
 */

interface TextProps {
  fontSizeClass?: string;
  fontWeightClass?: string;
  letterSpacingClass?: string;
  textColorClass?: string;
  textHoverClass?: string;
  bgClass?: string;
  customTag?: string;
  fontClass?: string;
  children?: string | React.ReactNode;
  style?: object;
  otherClasses?: string;
}

// "Index-> Hero -> large heading" 40px-80px
export const LargeHeading = ({
  fontSizeClass = 'text-40px lg:text-60px 4k:text-80px',
  fontWeightClass = 'font-medium',
  letterSpacingClass = 'tracking-wide',
  textColorClass = 'text-green',
  textHoverClass = '',
  bgClass = '',
  customTag = 'h1',
  fontClass = 'font-P22-Mackinac-Pro',
  children = '',
  style = { letterSpacing: '0.01em', lineHeight: '1em' },
  otherClasses = '',
}: TextProps): React.ReactElement => {
  const TagName = `${customTag}` as keyof JSX.IntrinsicElements;
  return (
    <TagName
      style={style}
      className={`${fontSizeClass} ${fontWeightClass} ${letterSpacingClass} ${textColorClass} ${textHoverClass} ${bgClass} ${fontClass} ${otherClasses}`}
    >
      {children}
    </TagName>
  );
};

// "Index->Feature->GreenHeading" 26px-64px
export const MediumHeading = ({
  fontSizeClass = '4k:text-64px laptop:text-50px lg:text-46px mobile-xl:text-42px mobile-lg:text-34px mobile-md:text-30px mobile-xs:text-26px',
  fontWeightClass = 'font-medium',
  letterSpacingClass = '',
  textColorClass = 'text-green',
  textHoverClass = '',
  bgClass = '',
  customTag = 'h2',
  fontClass = 'font-P22-Mackinac-Pro',
  children = '',
  style = { letterSpacing: '0.01em' },
  otherClasses = '',
}: TextProps): React.ReactElement => {
  const TagName = `${customTag}` as keyof JSX.IntrinsicElements;
  return (
    <TagName
      style={style}
      className={`${fontSizeClass} ${fontWeightClass} ${letterSpacingClass} ${textColorClass} ${textHoverClass} ${bgClass} ${fontClass} ${otherClasses}`}
    >
      {children}
    </TagName>
  );
};

// "Index->Introduction->White Text" 20px-56px
export const Heading = ({
  fontSizeClass = '4k:text-56px laptop:text-42px lg:text-36px mobile-lg:text-24px text-20px',
  fontWeightClass = 'font-medium',
  letterSpacingClass = '',
  textColorClass = 'text-white',
  textHoverClass = '',
  bgClass = '',
  customTag = 'h3',
  fontClass = 'font-P22-Mackinac-Pro',
  children = '',
  style = {},
  otherClasses = '',
}: TextProps): React.ReactElement => {
  const TagName = `${customTag}` as keyof JSX.IntrinsicElements;
  return (
    <TagName
      style={style}
      className={`${fontSizeClass} ${fontWeightClass} ${letterSpacingClass} ${textColorClass} ${textHoverClass} ${bgClass} ${fontClass} ${otherClasses}`}
    >
      {children}
    </TagName>
  );
};

// "Index-> How It Works-> Black SubHeading" 24px-40px
export const MediumSubHeading = ({
  fontSizeClass = 'mobile-lg:text-24px mobile-xl:text-28px lg:text-30px laptop:text-34px 4k:text-40px',
  fontWeightClass = 'font-medium',
  letterSpacingClass = '',
  textColorClass = 'text-black',
  textHoverClass = '',
  bgClass = '',
  customTag = 'h2',
  fontClass = 'font-P22-Mackinac-Pro',
  children = '',
  style = {},
  otherClasses = '',
}: TextProps): React.ReactElement => {
  const TagName = `${customTag}` as keyof JSX.IntrinsicElements;
  return (
    <TagName
      style={style}
      className={`${fontSizeClass} ${fontWeightClass} ${letterSpacingClass} ${textColorClass} ${textHoverClass} ${bgClass} ${fontClass} ${otherClasses}`}
    >
      {children}
    </TagName>
  );
};

// Index-> Features -> Bullet Points 20px-26px
export const SubText = ({
  fontSizeClass = 'mobile-lg:text-20px lg:text-22px 4k:text-26px',
  fontWeightClass = 'font-normal',
  letterSpacingClass = '',
  textColorClass = 'text-gray',
  textHoverClass = '',
  bgClass = '',
  customTag = 'h4',
  fontClass = 'font-circular',
  children = '',
  style = {},
  otherClasses = '',
}: TextProps): React.ReactElement => {
  const TagName = `${customTag}` as keyof JSX.IntrinsicElements;
  return (
    <TagName
      style={style}
      className={`${fontSizeClass} ${fontWeightClass} ${letterSpacingClass} ${textColorClass} ${textHoverClass} ${bgClass} ${fontClass} ${otherClasses}`}
    >
      {children}
    </TagName>
  );
};
// "Index->Hero->Subtext" 20px-24px
export const SubHeading = ({
  fontSizeClass = '4k:text-26px lg:text-22px mobile-lg:text-20px',
  fontWeightClass = 'font-normal',
  letterSpacingClass = '',
  textColorClass = 'text-black',
  textHoverClass = '',
  bgClass = '',
  customTag = 'h2',
  fontClass = 'font-circular',
  children = '',
  style = { letterSpacing: '0.01em' },
  otherClasses = '',
}: TextProps): React.ReactElement => {
  const TagName = `${customTag}` as keyof JSX.IntrinsicElements;
  return (
    <TagName
      style={style}
      className={`${fontSizeClass} ${fontWeightClass} ${letterSpacingClass} ${textColorClass} ${textHoverClass} ${bgClass} ${fontClass} ${otherClasses}`}
    >
      {children}
    </TagName>
  );
};

// "Index->Hero->BodyText" 16px-20px
export const BodyText = ({
  fontSizeClass = 'mobile-lg:text-16px mobile-xl:text-18px 4k:text-20px',
  fontWeightClass = 'font-thin mobile-lg:font-normal',
  letterSpacingClass = '',
  textColorClass = 'text-black',
  textHoverClass = '',
  bgClass = '',
  customTag = 'span',
  fontClass = 'font-circular',
  children = '',
  style = {},
  otherClasses = '',
}: TextProps): React.ReactElement => {
  const TagName = `${customTag}` as keyof JSX.IntrinsicElements;
  return (
    <TagName
      style={style}
      className={`${fontSizeClass} ${fontWeightClass} ${letterSpacingClass} ${textColorClass} ${textHoverClass} ${bgClass} ${fontClass} ${otherClasses}`}
    >
      {children}
    </TagName>
  );
};

// NavBar->NavItems 18px-19px
export const Text = ({
  fontSizeClass = 'lg:text-18px 4k:text-19px',
  fontWeightClass = 'font-semibold md:font-medium',
  letterSpacingClass = '',
  textColorClass = 'text-black',
  textHoverClass = '',
  bgClass = '',
  customTag = 'span',
  fontClass = 'font-circular',
  children = '',
  style = {},
  otherClasses = '',
}: TextProps): React.ReactElement => {
  const TagName = `${customTag}` as keyof JSX.IntrinsicElements;
  return (
    <TagName
      style={style}
      className={`${fontSizeClass} ${fontWeightClass} ${letterSpacingClass} ${textColorClass} ${textHoverClass} ${bgClass} ${fontClass} ${otherClasses}`}
    >
      {children}
    </TagName>
  );
};
// Index->Reviews->ReviewTitle 16px
export const MediumText = ({
  fontSizeClass = 'text-16px',
  fontWeightClass = 'font-medium',
  letterSpacingClass = '',
  textColorClass = 'text-black',
  textHoverClass = '',
  bgClass = '',
  customTag = 'span',
  fontClass = 'font-circular',
  children = '',
  style = {},
  otherClasses = '',
}: TextProps): React.ReactElement => {
  const TagName = `${customTag}` as keyof JSX.IntrinsicElements;
  return (
    <TagName
      style={style}
      className={`${fontSizeClass} ${fontWeightClass} ${letterSpacingClass} ${textColorClass} ${textHoverClass} ${bgClass} ${fontClass} ${otherClasses}`}
    >
      {children}
    </TagName>
  );
};
// Index->Reviews->ReviewText 12px-14px
export const SmallText = ({
  fontSizeClass = 'mobile-xl:text-12px 4k:text-14px',
  fontWeightClass = 'font-thin mobile-xl:font-light',
  letterSpacingClass = '',
  textColorClass = 'text-black',
  textHoverClass = '',
  bgClass = '',
  customTag = 'span',
  fontClass = 'font-circular',
  children = '',
  style = {},
  otherClasses = '',
}: TextProps): React.ReactElement => {
  const TagName = `${customTag}` as keyof JSX.IntrinsicElements;
  return (
    <TagName
      style={style}
      className={`${fontSizeClass} ${fontWeightClass} ${letterSpacingClass} ${textColorClass} ${textHoverClass} ${bgClass} ${fontClass} ${otherClasses}`}
    >
      {children}
    </TagName>
  );
};

export default {};
