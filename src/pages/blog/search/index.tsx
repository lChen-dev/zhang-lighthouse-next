import React from 'react';
import NoTextSearchUi from '@components/blog/pages/NoTextSearchPage';
import '../../../../public/static/assets/css/blog.css';
import Store from '@components/blog/context/store';

interface Props {
  keyword: any | '';
}

const NoTextSearchPage: React.FC<Props> = ({ keyword }: Props) => {
  return (
    <Store>
      <NoTextSearchUi keyword={keyword} />
    </Store>
  );
};

export default NoTextSearchPage;
