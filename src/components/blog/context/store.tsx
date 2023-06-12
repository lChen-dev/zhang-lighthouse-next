import React, { createContext, useReducer } from 'react';
import Reducer from './reducer';

const initialState = {
  categoriesFilterClicked: false,
  tagsFilterClicked: false,
  clickedPopularFilter: false,
  clickedNewFilter: false,
  clickedBlogFilter: false,
  clickedCityFilter: false,
  clickedBlogTagFilter: false,
  clickedFinanceTagFilter: false,
};

const Store = ({ children }: any): any => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return <Context.Provider value={[state, dispatch] as any}>{children}</Context.Provider>;
};

export const Context = createContext(initialState);
export default Store;
