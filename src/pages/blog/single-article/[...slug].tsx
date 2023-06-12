import React from 'react';

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
  const doc = await Client.getByID(query?.slug[1], { lang: '*' });
  return {
    props: {
      doc: doc || null,
    },
  };
}

export default SingleArticleUtil;
