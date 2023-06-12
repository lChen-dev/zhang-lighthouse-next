import React, { useState, useEffect } from 'react';
import { Header, Footer } from '@components/shared';
import { B1, H2 } from '@components/shared/Typography';
import SeeMore from '@components/blog/components/seeMore/SeeMoreUi';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-reactjs';
import Client from '@components/blog/utils/prismicClient';
import { processAuthorString, scrollToTop } from '@hooks/blog';
import Head from 'next/head';
import Chip from '../components/TagChipUi';
import { HomeImageSkeleton, IndividualBodySkeleton, EmptyImage } from '../components/articleCards/Skeletons';
import '../../../../public/static/assets/css/blog.css';

interface Props {
  doc: any;
}

const SingleArticle: React.FC<Props> = ({ doc }: Props) => {
  const [article, setArticle] = useState<any>(null);
  const [similarPosts, setSimilarPosts] = useState<any>(null);

  useEffect(() => {
    scrollToTop();
    clearStateHandler();
    fetchAuthorInfoAndSetData(doc?.data?.author?.id);
    fetchSimilarPosts();
  }, [doc]);

  const clearStateHandler = (): void => {
    setArticle({
      title: '',
      readTime: 'No Read Time',
      postedDate: 'no publish date',
      id: '',
      description: '',
      tags: [],
      authorAvatar: EmptyImage,
      authorName: 'Not Defined',
      body: '',
    });
    setSimilarPosts([]);
  };

  const fetchAuthorInfoAndSetData = async (id: any): Promise<void> => {
    await Client.query(Prismic.Predicates.at('document.id', id || ''), { lang: '*' }).then((res: any) => {
      const author = res.results[0]?.data;
      setArticle({
        title: doc?.data?.title[0].text || '',
        readTime: doc?.data?.read_time || 'No Read Time',
        postedDate: doc?.data?.publish_date || 'no publish date',
        headerPhoto: doc?.data?.header_photo?.url || EmptyImage,
        id: doc?.id,
        description: doc?.data?.description,
        tags: doc?.tags,
        authorAvatar: author?.profile_picture?.url || EmptyImage,
        authorName: author?.name[0].text || 'Not Defined',
        body: doc?.data?.body || '',
      });
    });
  };

  const fetchSimilarPosts = async (): Promise<void> => {
    const toQuery = doc?.data?.body?.find((elem: { slice_type: string }) => elem.slice_type === 'similar_posts');
    if (toQuery) {
      const arrToQuery = toQuery?.items?.map((item: any) => {
        return item?.posts?.id || '';
      });
      await Client.getByIDs(arrToQuery, { lang: '*' }).then((response: any) => {
        setSimilarPosts(response?.results);
      });
    }
  };

  function sliceContentHandler(): JSX.Element {
    const body = doc?.data?.body?.map((slice: any) => {
      if (slice?.slice_type === 'text') {
        return RichText.render(slice?.primary?.text);
      }
      if (slice?.slice_type === 'image') {
        return (
          <img
            src={slice?.primary?.image?.url}
            width={slice?.primary?.image?.dimensions?.width}
            height={slice?.primary?.image?.dimensions?.height}
            alt={slice?.primary?.image?.alt}
          />
        );
      }
      if (slice?.slice_type === 'quote') {
        return <blockquote>{RichText.render(slice?.primary?.quote)}</blockquote>;
      }
      return null;
    });
    return body;
  }
  return (
    <>
      {article && (
        <Head>
          <meta
            name="description"
            content={`${article?.description?.slice(0, 115)}${article?.description?.length > 115 && '...'}`}
          />
          <meta name="keywords" content={article?.tags?.join(',')} />
          <meta name="author" content={article?.authorName} />
          <meta name="thumbnail" content={article?.headerPhoto} />
          <meta property="og:image" content={article?.headerPhoto} />
        </Head>
      )}
      <Header blackNav />
      <div id="top" className="blog-home">
        <>
          {article ? (
            <div
              className="article-cover w-full relative flex flex-col items-center z-10 mt-20"
              style={{
                backgroundImage: `url(${article?.headerPhoto})`,
              }}
            />
          ) : (
            <div className="w-full relative z-10" style={{ height: 400 }}>
              <HomeImageSkeleton radius={0} />
            </div>
          )}

          <div className="z-20 flex flex-col items-start w-full max-w-screen-xl mx-auto px-5 py-12 md:py-16">
            <div className="w-full">
              {article ? (
                <>
                  <H2 className="mb-6">{article?.title}</H2>
                  <div className="mb-6 w-max flex items-center">
                    <B1 weight="font-normal" style={{ color: '#000' }}>
                      {article?.postedDate}
                    </B1>
                    <div className="flex items-center flex-wrap ml-6">
                      {article?.tags?.map((tag: string | undefined) => {
                        return <Chip title={tag} />;
                      })}
                    </div>
                  </div>
                  <div className="w-max flex items-center">
                    <img
                      alt="profile"
                      src={article?.authorAvatar}
                      className="article-avatar-small object-cover rounded-full"
                    />
                    <B1 weight="font-normal" className="ml-5 mr-2" style={{ color: '#919191' }}>
                      by
                    </B1>
                    <a
                      href={`/blog/author/${processAuthorString(article?.authorName)}`}
                      className="no-underline hover:underline">
                      <B1 weight="font-normal" className="mr-10" style={{ color: '#585858' }}>
                        {article?.authorName}
                      </B1>
                    </a>
                  </div>
                  <div className="post_body mt-6 flex flex-col">{sliceContentHandler()}</div>
                </>
              ) : (
                <IndividualBodySkeleton />
              )}
              <div className="w-full mt-8 md:mt-16">
                <SeeMore data={similarPosts || []} />
              </div>
            </div>
          </div>
        </>
      </div>
      <Footer />
    </>
  );
};

export default SingleArticle;
