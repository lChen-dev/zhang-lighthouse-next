import React from 'react';
import HomeBlogUi from '@components/blog/pages/HomeBlogPage';
import Prismic from '@prismicio/client';
import { sentryCaptureException } from '@utils/sentry';
import Client from '@components/blog/utils/prismicClient';
import '../../../public/static/assets/css/blog.css';
import Store from '@components/blog/context/store';

interface Props {
  doc: any | null;
  pinned: any | null;
}

const HomeBlogPage: React.FC<Props> = ({ doc = null, pinned = null }: Props) => {
  return (
    <Store>
      <HomeBlogUi doc={doc} pinned={pinned} />
    </Store>
  );
};

export async function getServerSideProps(props: any): Promise<any> {
  const docs: any = await Client.query(Prismic.Predicates.at('document.type', 'blog_landing'))
    .then((response) => {
      return response?.results;
    })
    .catch((err) => sentryCaptureException({ info: 'error in BlogPage Server Side Props', error: err }));

  const pinnedArticleData = await Client.query(Prismic.Predicates.at('document.id', docs[0]?.data?.pinned?.id || ''), {
    lang: '*',
  }).then((res: any) => {
    return res.results[0];
  });

  return {
    props: {
      doc: docs || null,
      pinned: pinnedArticleData || null,
    },
  };
}

export default HomeBlogPage;
