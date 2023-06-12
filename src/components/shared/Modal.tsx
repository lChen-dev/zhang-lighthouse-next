import React from 'react';
import classNames from 'classnames';

import './css/modal.css';

interface Props {
  show?: boolean;
  onHide: () => void;
  children?: React.ReactNode;
  title?: string | React.ReactNode;
  className?: string;
}

const Modal: React.FC<Props> = ({ show, onHide, children, title, className }: Props) => {
  if (!show) return null;
  return (
    <>
      <div
        className={classNames('modal show', className)}
        onClick={(e) => {
          if ((e.target as HTMLElement).classList.contains('modal')) onHide();
        }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">{title}</div>
              <button type="button" className="close" onClick={onHide}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M23 1L1 23M1 1L23 23"
                    stroke="#C0C0C0"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="sr-only">Close</span>
              </button>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
