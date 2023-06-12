import React, { useState, useEffect } from 'react';
import { Header, Footer } from '@components/shared';
import Head from 'next/head';
import { fetchFullTextSearchData, scrollToTop } from '@hooks/blog';
import NoSearchResults from '../components/filters/NoSearchResults';
import LoadingSkeleton from '../components/articleCards/LoadingSkeleton';
import Filter from '../components/filters/SearchFilters';
import ArticleCard from '../components/articleCards/ArticleCard';
import '../../../../public/static/assets/css/blog.css';

interface Props {
  doc: any | null;
  keyword: any | '';
}

const TextSearchUi: React.FC<Props> = ({ doc, keyword }: Props) => {
  const [title, setTitle] = useState<string>('SEARCH RESULTS');
  const [searchKeyWord, setSearchKeyword] = useState<string>('');
  const [isSearchingWithText, setIsSearchingWithText] = useState<boolean>(false);
  const [searchWithTextResults, setSearchWithTextResults] = useState<any>(null);

  useEffect(() => {
    scrollToTop();
    setIsSearchingWithText(true);
    fullTextSearchDataHandler(keyword);
    setIsSearchingWithText(false);
  }, [doc, keyword]);

  function handleSearchWithTextChange(text: string): void {
    setSearchKeyword(text);
  }

  function fullTextSearchDataHandler(_keyword: any): any {
    setIsSearchingWithText(true);
    setSearchWithTextResults(null);
    if (_keyword !== '' && _keyword !== undefined) {
      const queryPromise = fetchFullTextSearchData(_keyword);
      queryPromise.then((_data) => setSearchWithTextResults(_data));
      setIsSearchingWithText(false);
    } else {
      setSearchWithTextResults(null);
      setIsSearchingWithText(false);
    }
  }

  function handleResetTextSearch(): void {
    setSearchKeyword('');
    setSearchWithTextResults(null);
  }

  function renderBody(): any {
    if (isSearchingWithText) {
      return <LoadingSkeleton />;
    }
    if (searchWithTextResults) {
      return (
        <div className="grid grid-cols-3 gap-8">
          {searchWithTextResults?.map((_article: object) => {
            return (
              <div className="col-span-3 sm:col-span-1 lg:col-span-1">
                <ArticleCard initialArticle={_article} height={309} isAuthorVisible={false} />
              </div>
            );
          })}
          {searchWithTextResults?.length === 0 && (
            <NoSearchResults string="keyword" clearHandler={handleResetTextSearch} />
          )}
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
            <div className="col-span-1">
              <Filter
                home={false}
                blogTitle={title}
                data={searchWithTextResults}
                searchKeyword={searchKeyWord}
                onSearchTextChange={(text: string): void => handleSearchWithTextChange(text)}
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

export default TextSearchUi;
