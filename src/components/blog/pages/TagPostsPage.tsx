import React, { useState, useEffect } from 'react';
import { Header, Footer } from '@components/shared';
import { B1 } from '@components/shared/Typography';
import { CardSkeleton } from '@components/blog/components/articleCards/Skeletons';
import ArticleCard from '@components/blog/components/articleCards/ArticleCard';
import HomeButton from '../components/HomeButtonUi';
import '../../../../public/static/assets/css/blog.css';

interface Props {
  docs: any | null;
  tag: string | null;
}

const TagPostUI: React.FC<Props> = ({ docs, tag }: Props) => {
  const [posts, setPosts] = useState<any>([]);
  useEffect(() => {
    const element = document.getElementById('top');
    element?.scrollIntoView();
    if (docs) {
      setPosts(docs);
    }
  }, [docs]);

  function renderNoResultsFound(): JSX.Element {
    return (
      <div
        className="col-span-3 mt-10 mx-auto flex justify-center items-center flex-col no-result"
        style={{ height: '70%', width: '100%' }}>
        <p className="font-medium circular text-color text-center pt-5 pb-2" style={{ fontSize: 30 }}>
          No results
        </p>
        <p className="circular text-color text-center" style={{ fontSize: 16, width: 200 }}>
          Try to use another tag or
          <a role="button" tabIndex={0} className="cursor-pointer text-green-600 font-medium circular" href="/blog">
            {' '}
            go to blog home
          </a>
        </p>
      </div>
    );
  }

  function renderLoadingSkeleton(): JSX.Element {
    return (
      <div className="col-span-1">
        <div className="grid grid-cols-3 gap-8">
          {[1, 2, 3].map((value: number) => {
            return (
              <div className="col-span-1">
                <CardSkeleton height={309} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div id="top" className="blog-home w-full relative flex flex-col items-center z-10">
        <div className="z-20 flex flex-col items-center w-full max-w-screen-xl mx-auto px-3 py-20 md:py-32 pb-20">
          <div className="flex items-end justify-between border-b border-black pb-2 mb-10 w-full">
            <B1 className="font-bold" color="text-black">
              Tag: <span className="text-green-600">{tag}</span>
            </B1>
            <HomeButton />
          </div>
          <div className="grid grid-cols-3 gap-8 w-full">
            {posts?.map((article: object) => {
              return (
                <div className="col-span-3 sm:col-span-1 lg:col-span-1">
                  <ArticleCard initialArticle={article} height={309} isAuthorVisible={false} />
                </div>
              );
            })}
            {posts?.length === 0 && renderNoResultsFound()}
            {!posts && renderLoadingSkeleton()}
          </div>
        </div>
      </div>
      <div className="bg-brand hidden" />
      <Footer />
    </>
  );
};

export default TagPostUI;
