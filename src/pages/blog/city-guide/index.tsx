import React from 'react';
import { sentryCaptureException } from '@utils/sentry';
import CityGuideUi from '@components/blog/pages/CityGuidePage';
import Prismic from '@prismicio/client';
import Client from '@components/blog/utils/prismicClient';
import '../../../../public/static/assets/css/blog.css';
import Store from '@components/blog/context/store';

interface Props {
  doc: any | null;
}

const CityGuidePage: React.FC<Props> = ({ doc = null }: Props) => {
  return (
    <Store>
      <CityGuideUi doc={doc} />
    </Store>
  );
};

export async function getServerSideProps(props: any): Promise<any> {
  const cityGuidesData = await Client.query([Prismic.Predicates.at('document.type', 'city_guide')])
    .then((response) => {
      return response?.results;
    })
    .catch((err) => {
      sentryCaptureException({ info: 'Error while loading city guides posts server side props', error: err });
    });
  return {
    props: {
      doc: cityGuidesData || null,
    },
  };
}

export default CityGuidePage;
