import React from 'react';
import { sentryCaptureException } from '@utils/sentry';
import SingleArticle from '@components/blog/pages/SingleArticlePage';
import Client from '@components/blog/utils/prismicClient';
import '../../../../public/static/assets/css/blog.css';

interface Props {
  doc: any;
}

export const SingleArticleUtil: React.FC<Props> = ({ doc }: Props) => {
  return <SingleArticle doc={doc} />;
};

export async function getServerSideProps(props: any): Promise<any> {
  const { query } = props;
  if (!query?.slug[0] || !query?.slug[1]) {
    return {
      redirect: {
        destination: '/blog',
        permanent: false,
      },
    };
  }
  const doc = await Client.getByID(query?.slug[1], { lang: '*' });
  return {
    props: {
      doc: doc || null,
    },
  };
}

export default SingleArticleUtil;
