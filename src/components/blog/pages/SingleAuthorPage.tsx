import React, { useState, useEffect, useContext } from 'react';
import { Header, Footer } from '@components/shared';
import Head from 'next/head';
import Client from '@components/blog/utils/prismicClient';
import Prismic from '@prismicio/client';
import { B1 } from '@components/shared/Typography';
import { scrollToTop } from '@hooks/blog';
import { RichText } from 'prismic-reactjs';
import LoadingSkeleton from '../components/articleCards/LoadingSkeleton';
import HomeButton from '../components/HomeButtonUi';
import ArticleCard from '../components/articleCards/ArticleCard';
import { EmptyImage } from '../components/articleCards/Skeletons';
import { Context } from '../context/store';
import '../../../../public/static/assets/css/blog.css';

interface Props {
  name: string | '';
  titleHeader: string | '';
  doc: any | null;
}

const SingleAuthorPageUi: React.FC<Props> = ({ name, titleHeader, doc }: Props) => {
  const [authorData, setAuthorData] = useState<any>(null);
  const [resultsData, setResultsData] = useState<any | null>(null);
  const [isSearchingFilterData, setIsSearchingFilterData] = useState<boolean>(false);
  const [state, dispatch]: any = useContext(Context);

  useEffect(() => {
    scrollToTop();
    if (doc) {
      setIsSearchingFilterData(true);
      fetchAuthorInfo(doc[0]?.data?.author?.id);
      setResultsData(doc);
      setIsSearchingFilterData(false);
    }
  }, [state, doc]);

  const fetchAuthorInfo = async (id: any): Promise<void> => {
    await Client.query(Prismic.Predicates.at('document.id', id || ''), { lang: '*' }).then((res: any) => {
      const author = res.results[0]?.data;
      setAuthorData({
        authorAvatar: author?.profile_picture?.url || EmptyImage,
        authorName: author?.name[0].text || 'Not Defined',
        authorDescription: author?.bio || [],
      });
    });
  };

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

  function renderAuthorDescription(): any {
    if (authorData?.authorDescription !== undefined) {
      return RichText.render(authorData?.authorDescription);
    }
    return null;
  }

  return (
    <>
      <Head>
        <meta
          name="keywords"
          content={`lighthouse, rental, blog, city, city guide, savings, cashback, ${authorData?.authorName}`}
        />
        <meta
          name="description"
          content={`${authorData?.authorDescription?.slice(0, 115)}${authorData?.authorDescription?.length > 115 &&
            '...'}`}
        />
        <meta name="author" content={authorData?.authorName} />
        <meta name="thumbnail" content={authorData?.authorAvatar} />
        <meta property="og:image" content={authorData?.authorAvatar} />
      </Head>
      <Header />
      <div id="top" className="blog-home w-full relative flex flex-col items-center z-10">
        <div className="z-20 flex flex-col w-full max-w-screen-xl mx-auto px-3 py-20 md:py-32 pb-20">
          <div className="grid grid-cols-1 gap-8">
            <div className="col-span-1">
              <HomeButton name={authorData?.authorName} />
            </div>
            <div className="flex gap-10">
              <img
                alt="profile"
                src={authorData?.authorAvatar ? authorData?.authorAvatar : EmptyImage}
                className="article-avatar-large object-cover rounded-full"
              />
            </div>
            <div>
              <blockquote>{renderAuthorDescription()}</blockquote>
            </div>
            <div>
              <B1 className="font-bold underline" color="text-black">
                Articles by {authorData?.authorName}
              </B1>
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

export default SingleAuthorPageUi;
