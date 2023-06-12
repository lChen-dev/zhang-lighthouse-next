import React from 'react';

import { ProfileSVG, CheckMarkSVG, ShieldSVG } from '@components/shared/Icons';

interface Props {
  active?: 'PROFILE' | 'CHECK_MARK' | 'SHIELD' | 'NONE';
  subText?: string;
}


const ProgressBar: React.FC<Props> = ({ active = 'NONE' }: Props) => {
  return (
    <div className="flex ">
      <div className="flex-none">
        <ProfileSVG active={active === 'PROFILE'} />
      </div>
      <div className="flex-grow px-4">
        <div
          style={{
            backgroundColor: '#e6e6e6',
            height: '3px',
            width: '100%',
            marginTop: '12px',
          }}
        />
      </div>
      <div className="flex-none" style={{ marginTop: '4px' }}>
        <CheckMarkSVG active={active === 'CHECK_MARK'} />
      </div>
      <div className="flex-grow px-4">
        <div
          style={{
            backgroundColor: '#e6e6e6',
            height: '3px',
            width: '100%',
            marginTop: '12px',
          }}
        />
      </div>
      <div className="flex-none">
        <ShieldSVG active={active === 'SHIELD'} />
      </div>
    </div>
  );
};

export default ProgressBar;
