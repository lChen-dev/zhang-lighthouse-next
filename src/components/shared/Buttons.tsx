interface ButtonProps {
  href?: string;
  BgColorClass?: string;
  textColorClass?: string;
  hoverClass?: string;
  otherClasses?: string;
  fontClass?: string;
  style?: object;
  children?: any;
  svgStyle?: object;
  svgFillColor?: string;
  svgStrokeColor?: string;
  svgHeight?: string;
  svgWidth?: string;
  svgViewPort?: string;
  btnAriaLabel?: string;
  btnType?: any;
  fontWeightClass?: string;
  width?: string;
  height?: string;
  showArrow?: boolean;
  onClick?: any;
}

export const PrimaryButton = ({
  href = '#',
  BgColorClass = 'bg-orange',
  textColorClass = 'text-white',
  hoverClass = 'hover:-translate-y-1 transform hover:shadow-lg',
  fontClass = 'font-circular',
  fontWeightClass = 'font-medium',
  height = '56px',
  width = '225px',
  svgStyle = {
    // lineHeight: '56px',
    display: 'block',
    top: 16,
    right: 16,
    position: 'absolute',
  },
  style = {
    fontStyle: 'normal',
    fontWeight: 500,
    // lineHeight: '61px',
    width: '225px',
    height: '56px',
    paddingLeft: 20,
    position: 'relative',
  },
  otherClasses = 'md:flex-row sm:block block text-left rounded-full text-20px transition-all duration-100 ',
  children = '',
  svgFillColor = 'none',
  svgStrokeColor = '#fff',
  svgHeight = '22',
  svgWidth = '23',
  svgViewPort = '0 0 23 22',
  btnAriaLabel = 'get started',
  btnType = 'button',
  showArrow = true,
  onClick = () => {},
}: ButtonProps): React.ReactElement => (
  <a href={href}>
    <button
      onClick={onClick}
      aria-label={btnAriaLabel}
      type={btnType}
      className={`${BgColorClass} ${textColorClass} ${fontClass} ${otherClasses} ${hoverClass} ${fontWeightClass}`}
      style={{ ...style, height, width }}
    >
      {children}
      {showArrow && (
        <svg
          style={svgStyle}
          width={svgWidth}
          height={svgHeight}
          viewBox={svgViewPort}
          fill={svgFillColor}
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            y1="-1"
            x2="14.6835"
            y2="-1"
            transform="matrix(0.735931 0.677056 -0.735931 0.677056 10.3884 2)"
            stroke="#fff"
            strokeWidth="2"
          />
          <line
            y1="-1"
            x2="14.6835"
            y2="-1"
            transform="matrix(0.735931 -0.677056 0.735931 0.677056 10.6458 21.6465)"
            stroke={svgStrokeColor}
            strokeWidth="2"
          />
          <path d="M0 10.6465L21 10.6465" stroke={svgStrokeColor} strokeWidth="2" />
        </svg>
      )}
    </button>
  </a>
);

export const SquareButton = ({
  href = '#',
  BgColorClass = 'bg-green',
  textColorClass = 'text-white',
  hoverClass = 'hover:-translate-y-1 transform hover:shadow-lg',
  fontClass = 'font-circular',
  fontWeightClass = 'font-medium',
  otherClasses = 'md:flex-row sm:block block text-center text-20px transition-all duration-100',
  widthClass = 'w-full',
  heightClass = 'h-12',
  children = '',
  btnAriaLabel = 'get started',
  btnType = 'button',
}: ButtonProps & { widthClass?: string; heightClass?: string }): React.ReactElement => (
  <button
    aria-label={btnAriaLabel}
    type={btnType}
    className={`${BgColorClass} ${textColorClass} ${fontClass} ${otherClasses} ${hoverClass} ${fontWeightClass} ${widthClass} ${heightClass}`}
  >
    {children}
  </button>
);

export const OutlineButton = ({
  href = '#',
  BgColorClass = 'bg-transparent',
  textColorClass = 'text-orange',
  hoverClass = 'hover:-translate-y-1 transform',
  fontClass = 'font-circular',
  fontWeightClass = 'font-normal',
  height = '56px',
  width = '225px',
  svgStyle = {
    lineHeight: '56px',
    top: 16,
    right: 66,
    position: 'absolute',
  },
  style = {
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: '61px',
    width: '225px',
    height: '56px',
    textAlign: 'left',
    paddingLeft: 20,
    position: 'relative',
  },
  otherClasses = 'underline flex font-circular text-20px transition-all duration-100 ',
  children = '',
  svgFillColor = 'none',
  svgStrokeColor = '#FA8946',
  svgHeight = '22',
  svgWidth = '23',
  svgViewPort = '0 0 23 22',
  btnAriaLabel = 'learn more',
  btnType = 'button',
}: ButtonProps): React.ReactElement => (
  <a href={href}>
    <button
      aria-label={btnAriaLabel}
      type={btnType}
      className={`${BgColorClass} ${textColorClass} ${fontClass} ${otherClasses} ${hoverClass} ${fontWeightClass}`}
      style={{ ...style, height, width }}
    >
      {children}
      <svg
        style={svgStyle}
        width={svgWidth}
        height={svgHeight}
        viewBox={svgViewPort}
        fill={svgFillColor}
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          y1="-1"
          x2="14.6835"
          y2="-1"
          transform="matrix(0.735931 0.677056 -0.735931 0.677056 10.3884 2)"
          stroke={svgStrokeColor}
          strokeWidth="2"
        />
        <line
          y1="-1"
          x2="14.6835"
          y2="-1"
          transform="matrix(0.735931 -0.677056 0.735931 0.677056 10.6458 21.6465)"
          stroke={svgStrokeColor}
          strokeWidth="2"
        />
        <path d="M0 10.6465L21 10.6465" stroke={svgStrokeColor} strokeWidth="2" />
      </svg>
    </button>
  </a>
);

export default {};
