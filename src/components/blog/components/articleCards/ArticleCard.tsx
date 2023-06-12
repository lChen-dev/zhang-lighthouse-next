import React, { useState, useEffect } from 'react';
import { B1, H4 } from '@components/shared/Typography';
import Prismic from '@prismicio/client';
import Client from '@components/blog/utils/prismicClient';
import { EmptyImage } from '@components/blog/components/articleCards/Skeletons';
import { processAuthorString } from '@hooks/blog';
import Chip from '../TagChipUi';

interface Props {
  initialArticle: any | undefined;
  height: number | string | undefined;
  isAuthorVisible: boolean | undefined;
}

const ArticleCard: React.FC<Props> = ({ initialArticle, height = 'auto', isAuthorVisible = false }: Props) => {
  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    fetchAuthorInfo(initialArticle?.data?.author?.id);
  }, []);

  const fetchAuthorInfo = async (id: any): Promise<void> => {
    await Client.query(Prismic.Predicates.at('document.id', id || ''), { lang: '*' }).then((res: any) => {
      const author = res.results[0]?.data;
      setArticle({
        title: initialArticle?.data?.title[0].text || '',
        postedDate: initialArticle?.data?.publish_date || 'no publish date',
        headerPhoto: initialArticle?.data?.header_photo?.url || EmptyImage,
        id: initialArticle?.id,
        uid: initialArticle?.uid,
        description:
          initialArticle?.data?.description?.length > 115
            ? `${initialArticle?.data?.description.slice(0, 115)}...`
            : initialArticle?.data?.description,
        tags: initialArticle?.tags,
        authorAvatar: author?.profile_picture?.url || EmptyImage,
        authorName: author?.name[0].text || 'Not Defined',
        timeRead:
          initialArticle?.data?.time_to_read?.length > 0 ? initialArticle?.data?.time_to_read[0].text : 'no time',
      });
    });
  };

  /* returns article card renders throughout the blog */

  return (
    <a href={`/blog/article/${article?.uid}/${article?.id}`}>
      <div className="w-full h-full flex flex-col">
        <div
          className="blog-image relative w-full min-w-827.66 min-h-390"
          style={{
            height,
            backgroundImage: `url(${article?.headerPhoto})`,
          }}>
          <div className="absolute p-4 top-0">
            <div className="flex items-center flex-wrap">
              {article?.tags?.map((tag: string | undefined) => {
                return <Chip title={tag} />;
              })}
            </div>
          </div>
        </div>
        <div className="flex-1 w-full md:px-6 px-3 py-6">
          <div className="w-full h-full flex flex-col justify-between">
            <div className="w-full">
              <a href={`/blog/article/${article?.uid}/${article?.id}`}>
                <H4 className="mb-4 cursor-pointer no-underline hover:underline">{article?.title}</H4>
              </a>
              <div className="mb-4 pr-4">
                <B1 className="font-normal" style={{ color: '#585858', lineHeight: '26.95px' }}>
                  {article?.description}
                </B1>
              </div>
            </div>
            <div className="flex items-center flex-wrap">
              {isAuthorVisible && (
                <div className="flex items-center">
                  <img
                    alt="profile"
                    src={article?.authorAvatar}
                    className="article-avatar-small mx-auto object-cover rounded-full"
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
              )}
              <B1 weight="font-normal" className="mr-10" style={{ color: '#919191' }}>
                {article?.timeRead} read
              </B1>
              <B1 weight="font-normal" style={{ color: '#919191' }}>
                {article?.postedDate}
              </B1>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ArticleCard;
