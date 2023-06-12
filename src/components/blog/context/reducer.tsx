const Reducer = (state: any, action: any): any => {
  switch (action.type) {
    case 'SET_CATEGORIESFILTERCLICKED':
      return {
        ...state,
        categoriesFilterClicked: action.payload,
      };
    case 'SET_TAGSFILTERCLICKED':
      return {
        ...state,
        tagsFilterClicked: action.payload,
      };
    case 'SET_CLICKEDPOPULARFILTER':
      return {
        ...state,
        clickedPopularFilter: action.payload,
      };
    case 'SET_CLICKEDNEWFILTER':
      return {
        ...state,
        clickedNewFilter: action.payload,
      };
    case 'SET_CLICKEDBLOGFILTER':
      return {
        ...state,
        clickedBlogFilter: action.payload,
      };
    case 'SET_CLICKEDCITYFILTER':
      return {
        ...state,
        clickedCityFilter: action.payload,
      };
    case 'SET_CLICKEDBLOGTAGFILTER':
      return {
        ...state,
        clickedBlogTagFilter: action.payload,
      };
    case 'SET_CLICKEDFINANCETAGFILTER':
      return {
        ...state,
        clickedFinanceTagFilter: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
