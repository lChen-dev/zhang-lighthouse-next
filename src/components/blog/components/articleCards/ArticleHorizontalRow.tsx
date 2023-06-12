import React, { useState, useEffect } from 'react';
import { H5, B2 } from '@components/shared/Typography';
import Prismic from '@prismicio/client';
import Client from '@components/blog/utils/prismicClient';
import { EmptyImage } from '@components/blog/components/articleCards/Skeletons';
import Link from 'next/link';

interface Props {
  initialArticle: any;
}

/* returns article lists in popular new section */

const ArticleHorizontalRow: React.FC<Props> = ({ initialArticle }: Props) => {
  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    fetchAuthorInfo(initialArticle?.data?.author?.id);
  }, []);

  const fetchAuthorInfo = async (id: any): Promise<void> => {
    await Client.query(Prismic.Predicates.at('document.id', id || ''), { lang: '*' }).then((res: any) => {
      const author = res.results[0]?.data;
      setArticle({
        title: initialArticle?.data?.title[0].text || '',
        timeRead:
          initialArticle?.data?.time_to_read?.length > 0 ? initialArticle?.data?.time_to_read[0].text : 'no time',
        postedDate: initialArticle?.data?.publish_date || 'no publish date',
        id: initialArticle?.id,
        uid: initialArticle?.uid,
        authorAvatar: author?.profile_picture?.url || EmptyImage,
        authorName: author?.name[0].text || 'Not Defined',
      });
    });
  };

  return (
    <Link href={`/blog/article/${article?.uid}/${article?.id}`}>
      <div className="flex flex-row items-center mt-10">
        <img
          alt="profile"
          src={article?.authorAvatar !== undefined ? article?.authorAvatar : EmptyImage}
          className="article-avatar mx-auto object-cover rounded-full"
        />
        <div className="flex-1 pl-4">
          <a href={`/blog/${article?.uid}/${article?.id}`}>
            <H5 weight="font-bold" className="cursor-pointer no-underline hover:underline">
              {article?.title.length > 45 ? `${article?.title.slice(0, 45)}..` : article?.title}
            </H5>
          </a>
          <div className="flex items-center">
            <B2 weight="font-normal" style={{ marginTop: 6, color: '#919191' }}>
              {article?.timeRead !== undefined ? `${article?.timeRead}` : null}
            </B2>
            <B2 weight="font-normal" style={{ marginTop: 6, color: '#919191', marginLeft: 10 }}>
              {article?.postedDate}
            </B2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleHorizontalRow;
