import React from 'react';

import { Renting as RentingSVG } from '@components/shared/Svgs';
import { H2 } from '@components/shared/Typography';

import RentingBlock from './component/RentingBlock';

const Renting = (): React.ReactElement => (
  <div className="w-full relative flex flex-col items-center justify-center content-center">
    <div className="z-20 pl-18 pt-10 w-full max-w-screen-xl mx-auto relative laptop-md:px-0 px-4">
      <H2 className="pb-5 md:pb-10 text-left">The Way Renting Should Be</H2>
      <div className="md:w-10/12 w-full md:flex block pr-2">
        <div className="w-full block">
          <RentingBlock
            title="Where Does the Money Come From?"
            description="Apartments spend hundreds, if not thousands, to fill their empty units. Lighthouse helps them find renters and gets paid for it. These payments are shared with you and the apartment is happy."
          />
          <RentingBlock
            title="Finally, Cash Back on Rent"
            description="You already get cash back for everything. Why not rent? Rent is your single largest monthly expense and you've never been rewarded for paying it. Lighthouse allows you to earn cash back while you rent and save money for life's big milestones."
          />
          <RentingBlock
            title="Overwhelmed with Too Many Choices?"
            description="Information about apartments is all over the place. Not only that, facts about eligibility, rental policies, and fees are kept in the dark. Lighthouse has a database of apartment policies and knows the industry best practices to get you in. Work with our team and know what you need before you apply."
          />
        </div>
        <div className="md:w-2/12 w-full md:block hidden" style={{ width: 'auto' }}>
          <div className="block relative" style={{ top: '-350px', left: '100px', maxHeight: '800px' }}>
            <RentingSVG width="280" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Renting;
