import React, { useEffect } from 'react';
import { GetStarted } from '@components/shared';
import { Bank } from '@models/Bank';
import { Lease } from '@models/Lease';
import { useFetchUser } from '@hooks/user';
import { sendTrack } from '@utils/analytics';

interface Props {
  bank: Bank;
  leases: Lease[];
  scheduledPayments: any;
}

const Dashboard: React.FC<Props> = ({ bank, leases, scheduledPayments }) => {
    const user = useFetchUser();

    useEffect(() => {
        sendTrack('User Logging In');
    }, []);
  return (
    <div className="get-started w-full flex flex-col items-center justify-start h-full z-10">
      <div className="z-10 my-1 md:my-10 md:px-4 w-full box-border">
        <GetStarted bank={bank} leases={leases} scheduledPayments={scheduledPayments} />
      </div>
    </div>
  );
};

export default Dashboard;
