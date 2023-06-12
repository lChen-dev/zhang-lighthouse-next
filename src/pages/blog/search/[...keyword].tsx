import React from 'react';
import { sentryCaptureException } from '@utils/sentry';
import TextSearchUi from '@components/blog/pages/TextSearchPage';
import Prismic from '@prismicio/client';
import Client from '@components/blog/utils/prismicClient';
import '../../../../public/static/assets/css/blog.css';
import Store from '@components/blog/context/store';

interface Props {
  doc: any | null;
  keyword: any | null;
}

const TextSearchPage: React.FC<Props> = ({ doc = null, keyword }: Props) => {
  return (
    <Store>
      <TextSearchUi doc={doc} keyword={keyword} />
    </Store>
  );
};

export async function getServerSideProps(props: any): Promise<any> {
  const searchKeyword = props.query['keyword'][0];
  const query = await Client.query([
    Prismic.Predicates.any('document.type', ['individual_post', 'city_guide']),
    Prismic.Predicates.fulltext('document', searchKeyword),
  ])
    .then((response) => {
      return response?.results;
    })
    .catch((err) => {
      sentryCaptureException({ info: 'Error while searching with text.', error: err });
    });
  return {
    props: {
      keyword: searchKeyword || '',
      doc: query || null,
    },
  };
}

export default TextSearchPage;
