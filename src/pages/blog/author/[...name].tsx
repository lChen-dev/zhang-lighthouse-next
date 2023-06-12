import React from 'react';
import { sentryCaptureException } from '@utils/sentry';
import SingleAuthorPageUi from '@components/blog/pages/SingleAuthorPage';
import Prismic from '@prismicio/client';
import Client from '@components/blog/utils/prismicClient';
import { processNameString } from '@hooks/blog';
import '../../../../public/static/assets/css/blog.css';
import Store from '@components/blog/context/store';

interface Props {
  name: any | null;
  titleHeader: string | '';
  doc: any | null;
}

const SingleAuthorPage: React.FC<Props> = ({ name, titleHeader = '', doc = null }: Props) => {
  return (
    <Store>
      <SingleAuthorPageUi name={name} titleHeader={titleHeader} doc={doc} />
    </Store>
  );
};

export async function getServerSideProps(props: any): Promise<any> {
  const authorName = props.query.name[0];
  const query: any = await Client.query(Prismic.Predicates.any('document.type', ['individual_post', 'city_guide']))
    .then((response) => {
      return response?.results;
    })
    .catch((err) => {
      sentryCaptureException({ info: 'Error while loading all posts', error: err });
    });

  const dataResult = query.filter((item: any) => {
    return item.data.author.slug === authorName;
  });
  return {
    props: {
      name: authorName,
      titleHeader: processNameString(authorName),
      doc: dataResult || null,
    },
  };
}
export default SingleAuthorPage;
