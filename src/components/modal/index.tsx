/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useEffect } from 'react';
import { KEY_ESCAPE } from 'keycode-js';
import { isInlineAuth } from '@components/auth/functions';

interface Props {
  children?: React.ReactNode;
  show: boolean;
  onClose?: () => void;
  enableDarkMode?: boolean;
}

const Model: React.FC<Props> = ({ children, show, onClose, enableDarkMode = true }: Props) => {
  useEffect(() => {
    const escFunction = (event: any) => {
      if (event.keyCode === KEY_ESCAPE) {
        if (onClose) onClose();
      }
    };

    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  });

  if (!show) {
    return <></>;
  }
  const disableDarkModeClass = enableDarkMode ? '' : 'no-dark';

  return (
    <div
      className={`fixed inset-0 overflow-y-auto filter auth-wizard-container ${disableDarkModeClass}`}
      style={{ zIndex: 999 }}
      role="dialog"
      aria-modal="true">
      <div
        onClick={(e): void => {
          e.preventDefault();
          e.stopPropagation();
          if (onClose) onClose();
        }}
        id="modal-backdrop"
        className="fixed inset-0 bg-opacity-75 transition-opacity flex justify-center items-start authpopup:py-8 overflow-y-auto"
        style={{ background: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(5px)', zIndex: 100 }}>
        {/* Body */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`inline-block align-middle ${
            isInlineAuth() ? 'h-full' : 'h-auto'
          } authpopup:h-auto bg-white round text-left overflow-hidden shadow-xl sm:max-w-md w-full authpopup:mx-2 p-6 ${disableDarkModeClass}`}
          style={{ maxWidth: '450px', zIndex: 102 }}>
          {' '}
          <div className="model-header flex flex-row-reverse">
            <div
              className="close-btn cursor-pointer"
              role="button"
              onClick={() => {
                if (onClose) onClose();
              }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 1L1 23M1 1L23 23" stroke="#959a9d" strokeWidth="2" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className="block mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Model;
