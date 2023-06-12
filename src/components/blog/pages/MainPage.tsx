import React, { useState, useEffect } from 'react';
import Client from '@components/blog/utils/prismicClient';
import ArticleCard from '../components/articleCards/ArticleCard';
import { CardSkeleton } from '../components/articleCards/Skeletons';
import '../../../../public/static/assets/css/blog.css';

interface Props {
  data: any;
  pinned: any;
}

const MainPage: React.FC<Props> = ({ data, pinned }: Props) => {
  const [pinnedArticle, setPinnedArticle] = useState<any | null>(null);
  const [featuredArticles, setFeaturedArticles] = useState<any | null>(null);
  const [sidePanelArticles, setSidePanelArticles] = useState<any | null>(null);

  useEffect(() => {
    if (data || pinned) {
      setPinnedArticle(pinned);
      fetchFeaturedData();
      fetchSidePanelData();
    }
  }, [data, pinned]);

  const fetchFeaturedData = async (): Promise<void> => {
    const toQuery = data?.data?.body?.find((elem: { slice_label: string }) => elem.slice_label === 'featured');
    if (toQuery) {
      const arrToQuery = toQuery?.items?.map((item: any) => {
        return item?.featured_blogpost?.id || '';
      });
      await Client.getByIDs(arrToQuery, { lang: '*' }).then((response: any) => {
        setFeaturedArticles(response?.results);
      });
    }
  };

  const fetchSidePanelData = async (): Promise<void> => {
    const toQuery = data?.data?.body?.find((elem: { slice_label: string }) => elem.slice_label === 'sidepanel');
    if (toQuery) {
      const arrToQuery = toQuery?.items?.map((item: any) => {
        return item?.posts?.id || '';
      });
      await Client.getByIDs(arrToQuery, { lang: '*' }).then((response: any) => {
        setSidePanelArticles(response?.results);
      });
    }
  };

  return (
    <div className="grid grid-cols-3 gap-8 min-w-1256 min-h-1857">
      <div className="col-span-3 lg:col-span-2">
        <div className="grid grid-cols-2 md:gap-8 gap-4 px-3 lg:px-0 ">
          <div className="col-span-2">
            {pinnedArticle ? (
              <ArticleCard initialArticle={pinnedArticle} height={390} isAuthorVisible />
            ) : (
              <CardSkeleton height={390} />
            )}
          </div>
          {featuredArticles?.length > 0
            ? featuredArticles?.map((article: object) => {
                return (
                  <div className="col-span-2 sm:col-span-1 lg:col-span-1">
                    <ArticleCard initialArticle={article} height={309} isAuthorVisible={false} />
                  </div>
                );
              })
            : [1, 2, 3, 4].map((value: number) => {
                return <CardSkeleton height={309} />;
              })}
        </div>
      </div>
      <div className="col-span-3 lg:col-span-1">
        <div className="grid grid-cols-1 gap-8 px-8 lg:px-0 ">
          {sidePanelArticles?.length > 0
            ? sidePanelArticles?.map((article: object) => {
                return (
                  <div className="col-span-1">
                    <ArticleCard initialArticle={article} height={560} isAuthorVisible={false} />
                  </div>
                );
              })
            : [1, 2].map((value: number) => {
                return <CardSkeleton height={628} />;
              })}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
