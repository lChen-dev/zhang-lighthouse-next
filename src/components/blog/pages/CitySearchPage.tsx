import React, { useState, useEffect } from 'react';
import { Header, Footer } from '@components/shared';
import Head from 'next/head';
import { processCityString, fetchCityPosts, scrollToTop } from '@hooks/blog';
import LoadingSkeleton from '../components/articleCards/LoadingSkeleton';
import CityGuideSearch from '../components/filters/CityGuideSearch';
import NoCitySearchResults from '../components/filters/NoCityResults';
import ArticleCard from '../components/articleCards/ArticleCard';
import '../../../../public/static/assets/css/blog.css';

interface Props {
  doc: any | null;
  name: any | null;
}

const CitySearchPageUi: React.FC<Props> = ({ doc, name }: Props) => {
  const [title, setTitle] = useState<string>('City Guide');
  const [resultsData, setResultsData] = useState<any | null>(null);
  const [searchKeyWord, setSearchKeyword] = useState<string>('');
  const [cityKeyWord, setCityKeyword] = useState<string>('');
  const [isSearchingFilterData, setIsSearchingFilterData] = useState<boolean>(false);

  useEffect(() => {
    scrollToTop()
    if (doc) {
      setIsSearchingFilterData(true);
      setResultsData(doc);
      setIsSearchingFilterData(false);
    }
  }, [doc, name]);

  function handleSearchWithTextChange(text: string): void {
    setSearchKeyword(text);
  }

  function handleSearchWithCityChange(text: string): void {
    setCityKeyword(text);
  }

  function citySearchDataHandler(_name: any): any {
    setIsSearchingFilterData(true);
    if (_name !== '') {
      const processedString = processCityString(_name);
      const queryPromise = fetchCityPosts();
      const queryResults: any = [];
      queryPromise.then((query: any) => {
        query.map((_data: any) => {
          if (_data.data.category.slug === processedString) {
            queryResults.push(_data);
          }
          return _data;
        });
        return query;
      });
      setResultsData(queryResults);
    }
  }

  function renderBody(): JSX.Element {
    if (isSearchingFilterData) {
      return <LoadingSkeleton />;
    }
    if (resultsData?.length > 0) {
      return (
        <div className="grid grid-cols-3 gap-8">
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
    return (
      <div className="grid grid-cols-3 gap-8">
        <NoCitySearchResults string="city" />
      </div>
    );
  }

  return (
    <>
      <Head>
        <meta name="keywords" content="lighthouse, rental, blog, city, city guide, savings, cashback" />
      </Head>
      <Header />
      <div id="top" className="blog-home w-full relative flex flex-col items-center z-10">
        <div className="z-20 flex flex-col w-full max-w-screen-xl mx-auto px-3 py-20 md:py-32 pb-20">
          <div className="grid grid-cols-1 gap-8">
            <div className="col-span-1">
              <CityGuideSearch
                blogTitle={title}
                data={resultsData}
                searchKeyword={searchKeyWord}
                cityKeyword={cityKeyWord}
                onSearchTextChange={(text: string): void => handleSearchWithTextChange(text)}
                onSearchCityChange={(text): void => handleSearchWithCityChange(text)}
                onSearchCityClick={(_string: any): any => {
                  citySearchDataHandler(_string);
                }}
              />
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

export default CitySearchPageUi;
