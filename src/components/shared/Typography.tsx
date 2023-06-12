/* eslint-disable react/jsx-props-no-spreading */

import React, { CSSProperties } from 'react';
import classNames from 'classnames';

type HeadingSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type Elements = HeadingSize | 'p' | 'a';

interface TypographyProps {
  children?: React.ReactNode;
  weight?: string;
  font?: string;
  color?: string;
  style?: CSSProperties;
  className?: string;
  as?: Elements;
  href?: string;
  lineHeight?: string;
  onClick?: () => void;
}

interface CommonProps {
  tag: Elements;
  compStyle?: CSSProperties;
  compClass?: string;
}

export const Typography: React.FC<TypographyProps & CommonProps> = ({
  children,
  weight = 'font-medium',
  font = 'font-circular',
  color = 'text-gray-blue',
  tag,
  as,
  style = {},
  compStyle = {},
  compClass,
  className,
  ...props
}: TypographyProps & CommonProps) => {
  const Tag = `${as ?? tag}` as keyof JSX.IntrinsicElements;
  return (
    <Tag
      {...props}
      style={{ ...compStyle, ...style }}
      className={classNames(weight, font, color, compClass, className)}>
      {children}
    </Tag>
  );
};

// region Heading

type HDetails = { style?: CSSProperties; className?: string };
const headingDetails: { [key in HeadingSize]: HDetails } = {
  h1: {
    style: { letterSpacing: '-0.04em', lineHeight: '1.2em' },
    className: 'text-40px lg:text-60px',
  },
  h2: {
    style: { letterSpacing: '-0.03em', lineHeight: '1.2em' },
    className: 'text-26px lg:text-36px',
  },
  h3: {
    style: { letterSpacing: '-0.03em', lineHeight: '1.25em' },
    className: 'text-24px lg:text-30px',
  },
  h4: {
    style: { letterSpacing: '-0.02em', lineHeight: '1.5em' },
    className: 'text-24px',
  },
  h5: {
    style: { letterSpacing: '-0.02em', lineHeight: '1.25em' },
    className: 'text-20px',
  },
  h6: {
    style: { letterSpacing: '-0.01em', lineHeight: '1.25em' },
    className: 'text-16px',
  },
};

interface HeadingProps extends TypographyProps {
  size: HeadingSize;
}
export const Heading: React.FC<HeadingProps> = ({ size, ...props }: HeadingProps) => {
  const details = headingDetails[size];
  return <Typography tag={size} compStyle={details.style} compClass={details.className} {...props} />;
};

export const H1: React.FC<TypographyProps> = ({ ...props }: TypographyProps) => <Heading size="h1" {...props} />;
export const H2: React.FC<TypographyProps> = ({ ...props }: TypographyProps) => <Heading size="h2" {...props} />;
export const H3: React.FC<TypographyProps> = ({ ...props }: TypographyProps) => <Heading size="h3" {...props} />;
export const H4: React.FC<TypographyProps> = ({ ...props }: TypographyProps) => <Heading size="h4" {...props} />;
export const H5: React.FC<TypographyProps> = ({ ...props }: TypographyProps) => <Heading size="h5" {...props} />;
export const H6: React.FC<TypographyProps> = ({ ...props }: TypographyProps) => <Heading size="h6" {...props} />;

// endregion Heading

// region Body

export const B1: React.FC<TypographyProps> = ({ weight, lineHeight = '1.75em', ...props }: TypographyProps) => (
  <Typography
    tag="p"
    weight={weight ?? 'font-normal'}
    compStyle={{ lineHeight }}
    compClass="text-18px"
    {...props}
  />
);

export const B2: React.FC<TypographyProps> = ({ weight, lineHeight = '1.25em', ...props }: TypographyProps) => (
  <Typography
    tag="p"
    weight={weight ?? 'font-normal'}
    compStyle={{ lineHeight }}
    compClass="text-16px"
    {...props}
  />
);

export const B3: React.FC<TypographyProps> = ({ weight, lineHeight = '1.3125em', ...props }: TypographyProps) => (
  <Typography
    tag="p"
    weight={weight ?? 'font-normal'}
    compStyle={{ lineHeight }}
    compClass="text-14px"
    {...props}
  />
);

export const B5: React.FC<TypographyProps> = ({ weight, lineHeight = '14px', ...props }: TypographyProps) => (
  <Typography
    tag="p"
    weight={weight ?? 'font-bold'}
    compStyle={{ lineHeight }}
    compClass="text-12px"
    {...props}
  />
);

// endregion Body
