import React from 'react';
import { sentryCaptureException } from '@utils/sentry';
import PopularNewUi from '@components/blog/pages/PopularNewPage';
import Prismic from '@prismicio/client';
import Client from '@components/blog/utils/prismicClient';
import '../../../../public/static/assets/css/blog.css';
import Store from '@components/blog/context/store';

interface Props {
  titleHeader: string | '';
  type: string | '';
  doc: any | null;
}

const WhatsNewPage: React.FC<Props> = ({ titleHeader = 'New Posts', type = 'new', doc = null }: Props) => {
  return (
    <Store>
      <PopularNewUi titleHeader={titleHeader} type={type} doc={doc} />
    </Store>
  );
};

export async function getServerSideProps(props: any) {
  const response = await Client.query(Prismic.Predicates.at('document.type', 'blog_landing'))
    .then((_response) => {
      return _response?.results[0];
    })
    .catch((err) => sentryCaptureException({ info: 'error in BlogPage Server Side Props', error: err }));
  const toQuery = response?.data?.body?.find((elem: { slice_label: string }) => elem.slice_label === 'new');
  if (toQuery) {
    const arrToQuery = toQuery?.items?.map((item: any) => {
      return item?.posts?.id || '';
    });
    const popularNewDataQuery = await Client.getByIDs(arrToQuery, { lang: '*' })
      .then((_data: any) => {
        return _data?.results;
      })
      .catch((err) => {
        sentryCaptureException({ info: 'Error while loading all posts', error: err });
      });
    return {
      props: {
        doc: popularNewDataQuery || null,
      },
    };
  }
  return null;
}
export default WhatsNewPage;
