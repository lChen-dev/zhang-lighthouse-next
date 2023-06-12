import React from 'react';
import { H5 } from '@components/shared/Typography';
import Link from 'next/link';
import Chip from '../TagChipUi';
import { EmptyImage } from '../articleCards/Skeletons';

interface Props {
  initialArticle: any | undefined;
}

const Card: React.FC<Props> = ({ initialArticle }: Props) => {
  const article = {
    title: initialArticle?.data?.title[0].text || '',
    headerPhoto: initialArticle?.data?.header_photo?.url || EmptyImage,
    id: initialArticle?.id,
    uid: initialArticle?.uid,
    tags: initialArticle?.tags,
  };
  return (
    <Link href={`/blog/article/${article?.uid}/${article?.id}`}>
      <div className="w-full h-full flex flex-col">
        <div
          className="blog-image relative w-full rounded-none"
          style={{
            height: 290,
            backgroundImage: `url(${article?.headerPhoto})`,
            borderRadius: 0,
          }}>
          <div className="absolute p-4 top-0">
            <div className="flex items-center flex-wrap">
              {article?.tags?.map((type: string | undefined) => {
                return <Chip title={type} />;
              })}
            </div>
          </div>
        </div>
        <div className="flex-1 w-full md:px-6 px-3 py-6">
          <div className="w-full h-full flex flex-col justify-between">
            <div className="w-full">
              <a href={`/blog/${article?.uid}/${article?.id}`}>
                <H5 className="mb-4 cursor-pointer no-underline hover:underline">{article?.title}</H5>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
