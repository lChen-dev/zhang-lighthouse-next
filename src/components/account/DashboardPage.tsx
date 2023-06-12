import React from 'react';

import { useFetchUser } from '@hooks/user';
import { UserProvider } from '@components/shared/UserProvider';
import Sidebar from '@components/shared/sidebar/Sidebar';
import { usePageTitle } from '@hooks/common';

interface Props {
  title: string;
  children?: React.ReactNode;
}

const DashboardPage: React.FC<Props> = ({ title, children }: Props) => {
  usePageTitle(title);
  const { data: user } = useFetchUser();
  return (
    <UserProvider value={{ user: user ?? null }}>
      <div id="app" className="min-h-screen bg-white antialiased md:flex md:flex-col md:h-screen">
        <div className="flex flex-col md:flex-row flex-1">
          <Sidebar />
          <main className="pb-6 flex-1 overflow-x-hidden box-border cc_cursor md:pt-14 md:pt-4">{children}</main>
        </div>
      </div>
    </UserProvider>
  );
};

export default DashboardPage;
