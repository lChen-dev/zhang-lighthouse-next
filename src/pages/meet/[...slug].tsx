import React from 'react';

import { Footer, Header, withAuth } from '@components/shared';

const page: React.FC = () => (
  <>
    <Header blackNav />
    <Footer />
  </>
);

const SLOTS = ['15', '30', '45', '60'];
const CALENDLY_ALIAS: any = {
  alan: 'alanatlighthouse',
  matt: 'rentlighthouse',
  thom: 'thom-22',
  elmir: '_elmir',
  steven: 'lighthoused',
  talha: 'talha-lighthouse-app',
  kimmie: 'kimmie-lighthouse',
};

export const getServerSideProps: any = async ({ query }: any) => {
  const { slug }: any = query;
  let [person, slot = ''] = slug;
  person = person.toLowerCase();
  const redirectToHome = {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };

  if (!CALENDLY_ALIAS[person]) {
    // no user found redirect to home
    return redirectToHome;
  }

  if (slot) {
    if (SLOTS.includes(slot)) {
      slot = `${slot}min`;
    } else {
      slot = '';
    }
  }

  return {
    redirect: {
      destination: `https://calendly.com/${CALENDLY_ALIAS[person]}/${slot}`,
      permanent: false,
    },
  };
}

export default page;
