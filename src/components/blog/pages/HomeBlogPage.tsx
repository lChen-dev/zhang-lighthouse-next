import React, { useState, useEffect, useContext } from 'react';
import { Header, Footer, LoadingSpinner } from '@components/shared';
import Head from 'next/head';
import Link from 'next/link';
import { scrollToTop } from '@hooks/blog';
import LoadingSkeleton from '../components/articleCards/LoadingSkeleton';
import Filter from '../components/filters/SearchFilters';
import MainPage from './MainPage';
import PopularNew from '../components/sidePanel/PopularNewSectionUi';
import Button from '../components/ButtonUi';
import { Context } from '../context/store';
import '../../../../public/static/assets/css/blog.css';

interface Props {
  doc: any | null;
  pinned: any | null;
}

const HomeBlogUi: React.FC<Props> = ({ doc, pinned }: Props) => {
  const [title, setTitle] = useState<string>('Lighthouse Library');
  const [data, setData] = useState<any | null>(null);
  const [searchKeyWord, setSearchKeyword] = useState<string>('');
  const [exploreMoreClicked, setExploreMoreClicked] = useState<boolean>(false);
  const [isSearchingFilterData, setIsSearchingFilterData] = useState<boolean>(false);
  const [searchWithTextResults, setSearchWithTextResults] = useState<any>(null);
  const [state, dispatch]: any = useContext(Context);

  useEffect(() => {
    scrollToTop();
    if (doc) {
      setData(doc[0]);
    }
  }, [state, doc]);

  function handleSearchWithTextChange(text: string): void {
    setSearchKeyword(text);
  }

  function renderBody(): JSX.Element {
    if (isSearchingFilterData) {
      return <LoadingSkeleton />;
    }
    return (
      <>
        <div className="col-span-2">
          <PopularNew data={data} />
          <div className="explore-button flex flex-row-reverse mt-3 mb-5">
            <Link href="/blog/explore-posts">
              <button
                type="button"
                onClick={(): any => {
                  setExploreMoreClicked(true);
                }}>
                <Button
                  title={!exploreMoreClicked ? 'Explore Posts' : <LoadingSpinner color="#F8F8F8" />}
                  selected={true}
                  classes="md:mx-0 mx-2"
                  minWidth={195}
                />
              </button>
            </Link>
          </div>
        </div>
        <div className="col-span-1">
          <MainPage data={data} pinned={pinned} />
        </div>
      </>
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
          <div className="grid grid-cols-1 gap-7">
            <div className="col-span-1 mb-6">
              <Filter
                home={true}
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

export default HomeBlogUi;
