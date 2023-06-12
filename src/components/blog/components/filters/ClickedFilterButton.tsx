import React from 'react';
import { B2 } from '@components/shared/Typography';
import '../../../../../public/static/assets/css/blog.css';

interface Props {
  category: string;
  clearHandler: any | undefined;
  allPostsHandler: any | undefined;
}

/* UI handler for filter buttons that are clicked again to move back to all posts in explore more page */

const ClickedFilterButton: React.FC<Props> = ({
  category = '',
  clearHandler = null,
  allPostsHandler = null,
}: Props) => {
  return (
    <button
      key={category}
      type="button"
      className="mb-4 w-full text-left focus:outline-none underline"
      onClick={(): any => {
        clearHandler();
        allPostsHandler();
      }}>
      <B2>{category}</B2>
    </button>
  );
};

export default ClickedFilterButton;
