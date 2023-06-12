import React from 'react';

const FloatingContainer = ({
  children,
  otherClasses = '',
  width = '770px',
  minHeight = '216px',
  parentContainerClass = 'infoCardContainer',
  containerClass = 'white-box white-box-container md:flex block',
  top = '-60px',
  fakeHeight = null,
  style = {},
  paddingLeftClass = 'xl:pr-4 pr-6',
  paddingTopClass = 'xl:pt-32 md:pt-30 pt-20',
}: {
  children: any;
  otherClasses?: string;
  width?: string;
  minHeight?: string;
  parentContainerClass?: string;
  containerClass?: string;
  top?: string;
  fakeHeight?: string | null;
  style?: object;
  paddingLeftClass?: string;
  paddingTopClass?: string;
}): React.ReactElement => (
  <>
    <div className="w-full relative flex flex-col items-center justify-center content-center" style={style}>
      <div
        className={`z-20 w-full max-w-screen-xl mx-auto relative floatingPositionBlock ${paddingLeftClass} ${paddingTopClass}`}
        style={{ top }}>
        <div className="relative left-0 bottom-0 p-10 bg-white ">
          <div className={`absolute bottom-0 ${parentContainerClass} white-box-cards`} style={{ width }}>
            <div
              className={`${containerClass} ${otherClasses} md:bg-white bg-transparent mx-auto w-full`}
              style={{
                minHeight,
                width,
                WebkitBoxShadow: '0px 0px 12px rgba(0, 0, 0, 0.15)',
                borderRadius: '2px',
                zIndex: 1,
              }}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
    {fakeHeight && <div className="block" style={{ marginBottom: fakeHeight }} />}
  </>
);

export const FloatingContainerRelative = ({
  children,
  bgColorClass = 'bg-white',
  showBoxShadow = true,
  showOverflow = false,
  className,
}: {
  children: any;
  bgColorClass?: string;
  showBoxShadow?: boolean;
  showOverflow?: boolean;
  className?: string;
}): React.ReactElement => (
  <div
    className={`max-w-screen-xl mx-auto relative floatContainer ${bgColorClass} ${className}`}
    style={{
      WebkitBoxShadow: showBoxShadow ? '0px 0px 12px rgba(0, 0, 0, 0.15)' : '0px none',
      top: '-100px',
      zIndex: 9,
      overflow: showOverflow ? 'visible' : 'hidden',
    }}>
    {children}
  </div>
);

export default FloatingContainer;
