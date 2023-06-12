import React from 'react';
import { B1 } from '@components/shared/Typography';
import Link from 'next/link';
import Card from './SeeMoreCard';
import { CardSkeleton } from '../articleCards/Skeletons';

interface Props {
  data: any;
}

const SeeMore: React.FC<Props> = ({ data }: Props) => {
  const renderSeeMore = (): JSX.Element => {
    return data
      ? data?.map((article: object) => {
          return (
            <div className="col-span-4 sm:col-span-2 lg:col-span-1">
              <Card initialArticle={article} />
            </div>
          );
        })
      : [1, 2, 3, 4].map((value: number) => {
          return <CardSkeleton height={260} />;
        });
  };

  return (
    <div className="w-full">
      {data && data.length > 0 && (
        <div className="flex items-center justify-between border-b border-black pb-2">
          <B1 className="font-bold" color="text-black">
            See More Posts
          </B1>
          <Link href="/blog">
            <span className="no-underline hover:underline cursor-pointer">
              <B1 style={{ color: '#349661' }}>Blog Home</B1>
            </span>
          </Link>
        </div>
      )}
      <div className="grid grid-cols-4 gap-4 mt-10">{renderSeeMore()}</div>
    </div>
  );
};

export default SeeMore;
