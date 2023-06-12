import React, { useContext } from 'react';
import { B2 } from '@components/shared/Typography';
import ClickedFilterButton from './ClickedFilterButton';
import { Context } from '../../context/store';
import '../../../../../public/static/assets/css/blog.css';

interface Props {
  category: string;
  clearHandler: any | undefined;
  tagsMethod: any | undefined;
  allPostsMethod: any | undefined;
}

/* tags filter dropdown UI render */

const TagsFilterDropUi: any = ({
  category = '',
  clearHandler = null,
  tagsMethod = null,
  allPostsMethod = null,
}: Props) => {
  const [state, dispatch]: any = useContext(Context);
  switch (category) {
    case 'Blog':
      if (state.clickedBlogTagFilter) {
        return <ClickedFilterButton category={category} clearHandler={clearHandler} allPostsHandler={allPostsMethod} />;
      }
      return (
        <button
          key={category}
          type="button"
          className="mb-4 w-full text-left focus:outline-none"
          onClick={(): any => {
            clearHandler();
            dispatch({ type: 'SET_CLICKEDBLOGTAGFILTER', payload: true });
            tagsMethod(category);
          }}>
          <B2>{category}</B2>
        </button>
      );
    case `Finance`:
      if (state.clickedFinanceTagFilter) {
        return <ClickedFilterButton category={category} clearHandler={clearHandler} allPostsHandler={allPostsMethod} />;
      }
      return (
        <button
          key={category}
          type="button"
          className="mb-4 w-full text-left focus:outline-none"
          onClick={(): any => {
            clearHandler();
            dispatch({ type: 'SET_CLICKEDFINANCETAGFILTER', payload: true });
            tagsMethod(category);
          }}>
          <B2>{category}</B2>
        </button>
      );
    default:
      break;
  }
  return null;
};

export default TagsFilterDropUi;
