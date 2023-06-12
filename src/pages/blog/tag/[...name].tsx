import React from 'react';

import TagPostsUI from '@components/blog/pages/TagPostsPage';
import Prismic from '@prismicio/client';
import Client from '@components/blog/utils/prismicClient';
import '../../../../public/static/assets/css/blog.css';

interface Props {
  docs: any | null;
  tag: string | null;
}

export const TagPosts: React.FC<Props> = ({ docs = null, tag }: Props) => {
  return <TagPostsUI docs={docs} tag={tag} />;
};

export async function getServerSideProps(props: any) {
  const { query } = props;
  const tagName = [query?.name[0]];
  const docs = await Client.query(Prismic.Predicates.any('document.tags', tagName)).then((response) => {
    return response?.results;
  });
  return {
    props: {
      docs: docs || null,
      tag: query?.name[0],
    },
  };
}

export default TagPosts;
