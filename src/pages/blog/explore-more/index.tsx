import React from 'react';
import { sentryCaptureException } from '@utils/sentry';
import ExploreMoreUi from '@components/blog/pages/ExploreMorePage';
import Prismic from '@prismicio/client';
import Client from '@components/blog/utils/prismicClient';
import '../../../../public/static/assets/css/blog.css';
import Store from '@components/blog/context/store';

interface Props {
  doc: any | null;
  popNew: any | null;
}

const ExploreMorePage: React.FC<Props> = ({ doc = null, popNew = null }: Props) => {
  return (
    <Store>
      <ExploreMoreUi doc={doc} popNew={popNew} />
    </Store>
  );
};

export async function getServerSideProps(props: any) {
  const allPostsData = await Client.query([Prismic.Predicates.any('document.type', ['city_guide', 'individual_post'])])
    .then((response) => {
      return response?.results;
    })
    .catch((err) => {
      sentryCaptureException({ info: 'Error while loading home blog server side props', error: err });
    });
  const popularNewData = await Client.query(Prismic.Predicates.at('document.type', 'blog_landing')).then((response) => {
    return response?.results;
  });
  return {
    props: {
      doc: allPostsData || null,
      popNew: popularNewData || null,
    },
  };
}

export default ExploreMorePage;
