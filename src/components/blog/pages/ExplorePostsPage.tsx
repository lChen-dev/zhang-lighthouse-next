import React, { useState, useEffect, useContext } from 'react';
import { Header, Footer } from '@components/shared';
import Client from '@components/blog/utils/prismicClient';
import Head from 'next/head';
import { fetchAllPostsData, fetchPostCityFilterData, fetchTagFilterData, scrollToTop } from '@hooks/blog';
import ExploreFilter from '../components/filters/ExploreFilter';
import CategoriesFilterDropUi from '../components/filters/CategoriesFilterDropUi';
import TagsFilterDropUi from '../components/filters/TagsFilterDropUi';
import LoadingSkeleton from '../components/articleCards/LoadingSkeleton';
import Filter from '../components/filters/SearchFilters';
import ArticleCard from '../components/articleCards/ArticleCard';
import { Context } from '../context/store';
import '../../../../public/static/assets/css/blog.css';

interface Props {
  doc: any | null;
  popNew: any | null;
}

const ExplorePostsUi: React.FC<Props> = ({ doc, popNew }: Props) => {
  const [title, setTitle] = useState<string>('Explore Posts');
  const [resultsData, setResultsData] = useState<any | null>(null);
  const [searchKeyWord, setSearchKeyword] = useState<string>('');
  const [isSearchingFilterData, setIsSearchingFilterData] = useState<boolean>(false);
  const [searchWithTextResults, setSearchWithTextResults] = useState<any>(null);
  const [state, dispatch]: any = useContext(Context);

  useEffect(() => {
    scrollToTop();
    if (doc) {
      setIsSearchingFilterData(true);
      setResultsData(doc);
      setIsSearchingFilterData(false);
    }
  }, [doc, popNew]);

  function handleSearchWithTextChange(text: string): void {
    setSearchKeyword(text);
  }

  const fetchPopularNewFilterData = (filter: any): any => {
    setIsSearchingFilterData(true);
    const toQuery = popNew[0]?.data?.body?.find((elem: { slice_label: string }) => elem.slice_label === filter);
    if (toQuery) {
      const arrToQuery = toQuery?.items?.map((item: any) => {
        return item?.posts?.id || '';
      });
      Client.getByIDs(arrToQuery, { lang: '*' }).then((response: any) => {
        setResultsData([]);
        setResultsData(response?.results);
        setIsSearchingFilterData(false);
      });
    }
  };

  function fetchPostCityDataHandler(key: any): any {
    setIsSearchingFilterData(true);
    const queryPromise = fetchPostCityFilterData(key);
    setResultsData([]);
    queryPromise.then((_data: any) => setResultsData(_data));
    setIsSearchingFilterData(false);
  }

  function fetchTagFilterDataHandler(key: any): any {
    setIsSearchingFilterData(true);
    const queryPromise = fetchTagFilterData(key);
    setResultsData([]);
    queryPromise.then((_data) => setResultsData(_data));
    setIsSearchingFilterData(false);
  }

  function fetchAllPostsHandler(): any {
    const queryPromise = fetchAllPostsData();
    setIsSearchingFilterData(true);
    setResultsData([]);
    queryPromise.then((_data) => {
      setResultsData(_data);
    });
    setIsSearchingFilterData(false);
  }

  function clearFilterSelected(): any {
    setResultsData([]);
    dispatch({ type: 'SET_CATEGORIESFILTERCLICKED', payload: false });
    dispatch({ type: 'SET_TAGSFILTERCLICKED', payload: false });
    dispatch({ type: 'SET_CLICKEDPOPULARFILTER', payload: false });
    dispatch({ type: 'SET_CLICKEDNEWFILTER', payload: false });
    dispatch({ type: 'SET_CLICKEDBLOGFILTER', payload: false });
    dispatch({ type: 'SET_CLICKEDCITYFILTER', payload: false });
    dispatch({ type: 'SET_CLICKEDBLOGTAGFILTER', payload: false });
    dispatch({ type: 'SET_CLICKEDFINANCETAGFILTER', payload: false });
  }

  /* to update with new tags */
  const categoriesList = ['Most Popular', 'New Posts', 'Posts', 'City Guides'];

  function categoriesFilterButtonHandler(): any {
    return (
      <div className="category-filters-dropdown px-5">
        <div className="border-t border-black -mx-2 mb-3" style={{ borderColor: '#C4C4C4' }} />
        <div className="flex flex-col items-start">
          {categoriesList.map((category: string) => {
            return (
              <CategoriesFilterDropUi
                category={category}
                clearHandler={clearFilterSelected}
                categoriesMethod={categoriesFilterFunctionsHandler}
                allPostsMethod={fetchAllPostsHandler}
              />
            );
          })}
        </div>
      </div>
    );
  }

  /* to update with new tags */
  const tagsList = ['Blog', 'Finance'];

  function tagsFilterButtonHandler(): any {
    return (
      <div className="tags-filters-dropdown px-5">
        <div className="border-t border-black -mx-2 mb-3" style={{ borderColor: '#C4C4C4' }} />
        <div className="flex flex-col items-start">
          {tagsList.map((category: string) => {
            return (
              <TagsFilterDropUi
                category={category}
                clearHandler={clearFilterSelected}
                tagsMethod={tagsFilterFunctionsHandler}
                allPostsMethod={fetchAllPostsHandler}
              />
            );
          })}
        </div>
      </div>
    );
  }

  function categoriesFilterFunctionsHandler(category: any): any {
    switch (category) {
      case 'Most Popular':
        fetchPopularNewFilterData('popular');
        break;
      case `New Posts`:
        fetchPopularNewFilterData('new');
        break;
      case 'Posts':
        fetchPostCityDataHandler('individual_post');
        break;
      case 'City Guides':
        fetchPostCityDataHandler('city_guide');
        break;
      default:
        break;
    }
  }

  function tagsFilterFunctionsHandler(category: any): any {
    switch (category) {
      case 'Blog':
        fetchTagFilterDataHandler('blog');
        break;
      case `Finance`:
        fetchTagFilterDataHandler('finance');
        break;
      default:
        break;
    }
  }

  function renderBody(): JSX.Element {
    if (isSearchingFilterData) {
      return <LoadingSkeleton />;
    }
    if (resultsData) {
      return (
        <div className="grid grid-cols-3 gap-8 mt-2">
          {resultsData.map((_article: object) => {
            return (
              <div className="col-span-3 sm:col-span-1 lg:col-span-1">
                <ArticleCard initialArticle={_article} height={309} isAuthorVisible={false} />
              </div>
            );
          })}
        </div>
      );
    }
    return <LoadingSkeleton />;
  }

  return (
    <>
      <Head>
        <meta name="keywords" content="lighthouse, rental, blog, city, city guide, savings, cashback" />
      </Head>
      <Header />
      <div id="top" className="blog-home w-full relative flex flex-col items-center z-10">
        <div className="z-20 flex flex-col w-full max-w-screen-xl mx-auto px-3 py-20 md:py-32 pb-20">
          <div className="grid grid-cols-1 gap-7">
            <div className="col-span-1">
              <Filter
                home={false}
                blogTitle={title}
                data={searchWithTextResults}
                searchKeyword={searchKeyWord}
                onSearchTextChange={(text: string): void => handleSearchWithTextChange(text)}
              />
            </div>
            <div className="flex items-center relative w-full h-full mb-4 justify-center lg:justify-between md:justify-between sm:justify-between xsm:justify-between">
              <ExploreFilter categoriesHandler={categoriesFilterButtonHandler} tagsHandler={tagsFilterButtonHandler} />
            </div>
            {renderBody()}
          </div>
        </div>
      </div>
      <div className="bg-brand hidden" />
      <Footer />
    </>
  );
};

export default ExplorePostsUi;
