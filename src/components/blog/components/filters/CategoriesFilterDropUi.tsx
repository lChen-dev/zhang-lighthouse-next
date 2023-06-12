import React, { useContext } from 'react';
import { B2 } from '@components/shared/Typography';
import ClickedFilterButton from './ClickedFilterButton';
import { Context } from '../../context/store';
import '../../../../../public/static/assets/css/blog.css';

interface Props {
  category: string;
  clearHandler: any | undefined;
  categoriesMethod: any | undefined;
  allPostsMethod: any | undefined;
}

/* categories filter button ui renders */

const CategoriesFilterDropUi: any = ({
  category = '',
  clearHandler = null,
  categoriesMethod = null,
  allPostsMethod = null,
}: Props) => {
  const [state, dispatch]: any = useContext(Context);
  switch (category) {
    case 'Most Popular':
      if (state.clickedPopularFilter) {
        return <ClickedFilterButton category={category} clearHandler={clearHandler} allPostsHandler={allPostsMethod} />;
      }
      return (
        <button
          key={category}
          type="button"
          className="mb-4 w-full text-left focus:outline-none"
          onClick={(): any => {
            clearHandler();
            dispatch({ type: 'SET_CLICKEDPOPULARFILTER', payload: true });
            categoriesMethod(category);
          }}>
          <B2>{category}</B2>
        </button>
      );
    case `New Posts`:
      if (state.clickedNewFilter) {
        return <ClickedFilterButton category={category} clearHandler={clearHandler} allPostsHandler={allPostsMethod} />;
      }
      return (
        <button
          key={category}
          type="button"
          className="mb-4 w-full text-left focus:outline-none"
          onClick={(): any => {
            clearHandler();
            dispatch({ type: 'SET_CLICKEDNEWFILTER', payload: true });
            categoriesMethod(category);
          }}>
          <B2>{category}</B2>
        </button>
      );
    case `Posts`:
      if (state.clickedBlogFilter) {
        return <ClickedFilterButton category={category} clearHandler={clearHandler} allPostsHandler={allPostsMethod} />;
      }
      return (
        <button
          key={category}
          type="button"
          className="mb-4 w-full text-left focus:outline-none"
          onClick={(): any => {
            clearHandler();
            dispatch({ type: 'SET_CLICKEDBLOGFILTER', payload: true });
            categoriesMethod(category);
          }}>
          <B2>{category}</B2>
        </button>
      );
    case `City Guides`:
      if (state.clickedCityFilter) {
        return <ClickedFilterButton category={category} clearHandler={clearHandler} allPostsHandler={allPostsMethod} />;
      }
      return (
        <button
          key={category}
          type="button"
          className="mb-4 w-full text-left focus:outline-none"
          onClick={(): any => {
            clearHandler();
            dispatch({ type: 'SET_CLICKEDCITYFILTER', payload: true });
            categoriesMethod(category);
          }}>
          <B2>{category}</B2>
        </button>
      );
    default:
      break;
  }
  return null;
};

export default CategoriesFilterDropUi;
