/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import Modal from '@components/modal';
import Wizard from '@components/shared/wizard/Wizard';
import { steps } from '@components/auth/Steps';
import { useAuth } from 'context/auth/index';
import { useRouter } from 'next/router';

interface Props {
  children?: React.ReactNode;
  className?: string;
  onClick: Function;
  show?: boolean;
  setShowAuth?: any;
  wizardSteps?: {
    [key: string]: {
      Header?: React.ReactElement;
      SubHeader?: React.ReactElement;
      Component: React.ReactElement;
      headerText?: string;
      subHeaderText?: string;
      Footer?: React.ReactElement;
      onSubmit?: Function;
      beforeStepLoaded?: Function;
      ShowProgressSteps?: boolean;
    };
  };
}

const AuthPopup: React.FC<Props> = ({
  onClick,
  className,
  children,
  wizardSteps = steps,
  show = false,
  setShowAuth,
}: Props) => {
  const { query, push, pathname } = useRouter();
  const refExists = !!(query && query?.hasOwnProperty('ref') && query.ref);
  const [visible, setVisible] = useState<boolean>(false);
  const { user } = useAuth();
  useEffect(() => {
    localStorage.removeItem('authPopupInfo');
  }, []);

  useEffect(() => {
    if (query.post_login_url || query.ref) setVisible(true);
  }, [query]);

  const parentClick = (e?: any): void => {
    e.stopPropagation();
    e.preventDefault();
    if (visible) return;

    if (user) onClick();
    else setVisible(true);
  };

  return (
    <div onClick={parentClick} className={className}>
      <div style={{ zIndex: 999 }}>
        <Modal
          enableDarkMode={false}
          show={show || refExists || visible}
          onClose={() => {
            localStorage.removeItem('authPopupInfo');
            if (setShowAuth) setShowAuth(false);
            if (refExists) push(pathname);
            setVisible(false);
          }}>
          <Wizard
            steps={wizardSteps}
            disableRouting
            disableBackground
            disableFooter
            storageItemIndex="authPopupInfo"
            setVisibility={setVisible}
            modalRenderedOn={pathname}
          />
        </Modal>
      </div>
      <div className="w-full h-full" style={{ zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default AuthPopup;
