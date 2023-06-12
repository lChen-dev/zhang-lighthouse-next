import { useWindowWidth } from '@react-hook/window-size';
import React, { useState } from 'react';
import { B2 } from '../shared/Typography';
interface Props {
  value: boolean;
  onChange?: (val: boolean) => void;
  name: string;
  label?: string | JSX.Element;
  outlineColor?: string;
  hoverColor?: string;
  selectedColor?: string;
  className?: string;
}

const Checkbox: React.FC<Props> = ({
  value,
  onChange,
  name,
  label,
  outlineColor = '#E5E5E5',
  selectedColor = '#34966D',
  className = '',
}: Props) => {
  const [hover, setHover] = useState(false);
  const width = useWindowWidth();

  return (
    <label
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onTouchStart={() => setHover(true)}
      onTouchMove={() => setHover(false)}
      onClick={() => {
        if (onChange) onChange(!value);
        if (width < 768) {
          setHover(false); // removes hover state for mobile
        }
      }}
      htmlFor={name}
      className={`flex flex-row items-center mr-4 cursor-pointer my-1 ${className}`}
      style={{ fontWeight: 450 }}
    >
      {value ? (
        <div
          style={{
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 0,
              width: '170%',
              height: '170%',
              backgroundColor: '#34966D',
              opacity: hover ? 0.08 : 0,
              borderRadius: '100%',
            }}
          />
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            style={{ maxWidth: '2rem', minWidth: '18px' }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="18" height="18" rx="2" fill={selectedColor} />
            <path d="M13.6663 5.5L7.24967 11.9167L4.33301 9" stroke="white" strokeWidth="2" strokeLinejoin="round" />
          </svg>
        </div>
      ) : (
        <>
          {hover ? (
            <div
              style={{
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 0,
                  width: '170%',
                  height: '170%',
                  backgroundColor: '#34966D',
                  opacity: 0.08,
                  borderRadius: '100%',
                }}
              />
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                style={{ position: 'relative', zIndex: 1, maxWidth: '2rem', minWidth: '18px' }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="1" y="1" width="16" height="16" rx="2" stroke={'#34966D'} opacity="1" strokeWidth="2" />
              </svg>
            </div>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              style={{ maxWidth: '2rem', minWidth: '18px' }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="1" y="1" width="16" height="16" rx="2" stroke={outlineColor} strokeWidth="2" />
            </svg>
          )}
        </>
      )}
      {label && <B2 className="ml-3">{label}</B2>}
    </label>
  );
};

Checkbox.defaultProps = { value: false };

export default Checkbox;
