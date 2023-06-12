import React, { useState, useEffect } from 'react';
import { Header, Footer } from '@components/shared';
import Head from 'next/head';
import { scrollToTop } from '@hooks/blog';
import NoSearchResults from '../components/filters/NoSearchResults';
import Filter from '../components/filters/SearchFilters';
import '../../../../public/static/assets/css/blog.css';

interface Props {
  keyword: any | '';
}

const NoTextSearchUi: React.FC<Props> = ({ keyword }: Props) => {
  const [title, setTitle] = useState<string>('SEARCH RESULTS');
  const [searchKeyWord, setSearchKeyword] = useState<string>('');
  const [searchWithTextResults, setSearchWithTextResults] = useState<any>(null);

  useEffect(() => {
    scrollToTop();
  }, []);

  function handleSearchWithTextChange(text: string): void {
    setSearchKeyword(text);
  }

  function handleResetTextSearch(): void {
    setSearchKeyword('');
    setSearchWithTextResults(null);
  }

  function renderBody(): any {
    return (
      <div className="grid grid-cols-3 gap-8">
        <NoSearchResults string="keyword" clearHandler={handleResetTextSearch} />;
      </div>
    );
  }

  return (
    <>
      <Head>
        <meta name="keywords" content="lighthouse, rental, blog, city, city guide, savings, cashback" />
      </Head>
      <Header />
      <div className="blog-home w-full relative flex flex-col items-center z-10">
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

export default NoTextSearchUi;
