import React, { useState, useEffect, useContext } from 'react';
import { Header, Footer } from '@components/shared';
import Head from 'next/head';
import { scrollToTop } from '@hooks/blog';
import LoadingSkeleton from '../components/articleCards/LoadingSkeleton';
import CityGuideSearch from '../components/filters/CityGuideSearch';
import ArticleCard from '../components/articleCards/ArticleCard';
import { Context } from '../context/store';
import '../../../../public/static/assets/css/blog.css';

/* summary: all contents for the blog rendered through here */

interface Props {
  doc: any | null;
}

const CityGuideUi: React.FC<Props> = ({ doc }: Props) => {
  const [title, setTitle] = useState<string>('City Guide');
  const [resultsData, setResultsData] = useState<any | null>(null);
  const [searchKeyWord, setSearchKeyword] = useState<string>('');
  const [cityKeyWord, setCityKeyword] = useState<string>('');
  const [isSearchingFilterData, setIsSearchingFilterData] = useState<boolean>(false);
  const [state, dispatch]: any = useContext(Context);

  useEffect(() => {
    scrollToTop();
    if (doc) {
      setIsSearchingFilterData(true);
      setResultsData(doc);
      setIsSearchingFilterData(false);
    }
  }, [doc, state]);

  function handleSearchWithTextChange(text: string): void {
    setSearchKeyword(text);
  }

  function handleSearchWithCityChange(text: string): void {
    setCityKeyword(text);
  }

  function renderBody(): JSX.Element {
    if (isSearchingFilterData) {
      return <LoadingSkeleton />;
    }
    if (resultsData) {
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
          <div className="grid grid-cols-1 gap-8">
            <div className="col-span-1 mb-2">
              <CityGuideSearch
                blogTitle={title}
                data={resultsData}
                searchKeyword={searchKeyWord}
                cityKeyword={cityKeyWord}
                onSearchTextChange={(text: string): void => handleSearchWithTextChange(text)}
                onSearchCityChange={(text): void => handleSearchWithCityChange(text)}
                onSearchCityClick={(_string: any): any => {
                  return null;
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

export default CityGuideUi;
