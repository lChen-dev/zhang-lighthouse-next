import React from 'react';
import { Card, Home, Reload } from '@components/shared/Icons';
import { B1, H4 } from '@components/shared/Typography';

const Details: React.FC = () => (
  <div className="w-full max-w-screen-xl px-4 lg:px-0 mx-auto bg-white mb-24 lg:mt-64">
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between mt-8 lg:mt-16 mb-4">
      <div className="max-w-screen-sm lg:max-w-full w-full flex-1 p-10 mb-4 lg:mb-0 border lg:mr-4">
        <div style={{ width: '46px', height: '46px' }}>
          <Reload width={46} height={46} />
        </div>
        <H4 className="mt-4 mb-2">Earn while you rent</H4>
        <B1 color="text-gray-soft">Cash back ranges from $300 once, up to $100, every month</B1>
      </div>
      <div className="max-w-screen-sm lg:max-w-full w-full flex-1 p-10 mb-4 lg:mb-0 border lg:mr-4">
        <div style={{ width: '46px', height: '46px' }}>
          <Home />
        </div>
        <H4 className="mt-4 mb-2">Browse thousands of homes</H4>
        <B1 color="text-gray-soft">Lighthouse network includes 7,000 apartments across 40 cities</B1>
      </div>
      <div className="max-w-screen-sm lg:max-w-full w-full flex-1 p-10 mb-4 lg:mb-0 border">
        <div style={{ width: '46px', height: '46px' }}>
          <Card />
        </div>
        <H4 className="mt-4 mb-2">Get paid seamlessly</H4>
        <B1 color="text-gray-soft">Connect your bank account to Lighthouse and get direct deposits</B1>
      </div>
    </div>
  </div>
);

export default Details;
