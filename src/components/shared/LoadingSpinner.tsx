/* eslint-disable @typescript-eslint/interface-name-prefix */
interface IProps {
  className?: string;
  color?: string;
  width?: string;
  height?: string;
}
export default function LoadingSpinner({
  className = '',
  color = '#fff',
  width = '1.2rem',
  height = '1.2rem'
}: IProps) {
  return (
    <div className={`lds-dual-ring ${className}`}>
      <style jsx>
        {`
          .lds-dual-ring {
            display: inline-block;
          }
          .lds-dual-ring:after {
            content: ' ';
            display: block;
            width: ${width};
            height: ${height};
            border-radius: 50%;
            border: 2px solid ${color};
            border-color: ${color} transparent ${color} transparent;
            animation: lds-dual-ring 1.2s linear infinite;
          }
          @keyframes lds-dual-ring {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
}
