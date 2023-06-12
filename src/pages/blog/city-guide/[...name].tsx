import React from 'react';
import { sentryCaptureException } from '@utils/sentry';
import CitySearchPageUi from '@components/blog/pages/CitySearchPage';
import Prismic from '@prismicio/client';
import Client from '@components/blog/utils/prismicClient';
import '../../../../public/static/assets/css/blog.css';
import Store from '@components/blog/context/store';

interface Props {
  doc: any | null;
  name: any | null;
}

const CityGuideSearch: React.FC<Props> = ({ name = null, doc = null }: Props) => {
  return (
    <Store>
      <CitySearchPageUi doc={doc} name={name} />
    </Store>
  );
};

export async function getServerSideProps(props: any): Promise<any> {
  const name = props.query.name[0];
  const cityGuidesData: any = await Client.query([Prismic.Predicates.at('document.type', 'city_guide')])
    .then((response) => {
      return response?.results;
    })
    .catch((err) => {
      sentryCaptureException({ info: 'Error while loading city posts server side props', error: err });
    });
  const queryResults: any = [];
  cityGuidesData.map((data: any) => {
    if (data.data.category.slug === name) {
      queryResults.push(data);
    }
    return data;
  });
  return {
    props: {
      doc: queryResults || null,
      name: name || null,
    },
  };
}

export default CityGuideSearch;
