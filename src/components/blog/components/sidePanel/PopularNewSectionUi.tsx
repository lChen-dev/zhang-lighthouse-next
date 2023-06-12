import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { H2 } from '@components/shared/Typography';
import { fetchPopularNewData } from '@hooks/blog';
import { LoadingSpinner } from '@components/shared';
import Button from '../ButtonUi';
import ArticleHorizontalRow from '../articleCards/ArticleHorizontalRow';
import { RowSkeleton, HomeImageSkeleton } from '../articleCards/Skeletons';
import '../../../../../public/static/assets/css/blog.css';

interface Props {
  data: any;
}

const PopularNew: React.FC<Props> = ({ data }: Props) => {
  const [sideFilter, setSideFilter] = useState<string>('popular');
  const [sideData, setSideData] = useState<any | null>(null);
  const [popularData, setPopularData] = useState<any | null>(null);
  const [newData, setNewData] = useState<any | null>(null);
  const [clickedPopularExpand, setClickedPopularExpand] = useState<boolean>(false);
  const [clickedNewExpand, setClickedNewExpand] = useState<boolean>(false);
  const [clickedCityGuides, setClickedCityGuides] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      sideDataHandler('popular');
      sideDataHandler('new');
    }
  }, [data]);

  function sideDataHandler(filter: any): any {
    setPopularData([]);
    setNewData([]);
    const query = fetchPopularNewData(filter);
    if (filter === 'popular') {
      query.then((_data) => setPopularData(_data));
    } else if (filter === 'new') {
      query.then((_data) => setNewData(_data));
    }
  }

  function sideFilterChangeHandler(filter: any): any {
    setSideData([]);
    setSideFilter(filter);
    const query = fetchPopularNewData(filter);
    query.then((_data) => setSideData(_data));
  }

  function expandButtonDisplayHandler(): JSX.Element {
    if (popularData.length > 4 && sideFilter === 'popular') {
      return (
        <div className="flex justify-center">
          <Link href="/blog/most-popular">
            <button type="button" onClick={(): any => setClickedPopularExpand(true)}>
              <Button
                title={!clickedPopularExpand ? 'Expand' : <LoadingSpinner color="#000000" />}
                selected={false}
                classes="md:mx-0 mx-2"
                minWidth={95.25}
              />
            </button>
          </Link>
        </div>
      );
    }
    if (newData.length > 4 && sideFilter === 'new') {
      return (
        <div className="flex justify-center">
          <Link href="/blog/new-posts">
            <button type="button" onClick={(): any => setClickedNewExpand(true)}>
              <Button
                title={!clickedNewExpand ? 'Expand' : <LoadingSpinner color="#000000" />}
                selected={false}
                classes="md:mx-0 mx-2"
                minWidth={95.25}
              />
            </button>
          </Link>
        </div>
      );
    }
    return <div />;
  }

  function renderSkeleton(): any {
    return [1, 2, 3, 4].map((value: number): any => {
      return <RowSkeleton />;
    });
  }

  function popularDataRender(): any {
    return popularData?.length > 0
      ? popularData.slice(0, 4).map((article: object) => {
          return <ArticleHorizontalRow initialArticle={article} />;
        })
      : renderSkeleton();
  }

  function newDataRender(): any {
    return newData?.length > 0
      ? newData.slice(0, 4).map((article: object) => {
          return <ArticleHorizontalRow initialArticle={article} />;
        })
      : renderSkeleton();
  }

  function renderSideBox(): any {
    return (
      <div className="col-span-3 xl:col-span-1 px-3 lg:px-0 min-w-397 min-h-629">
        <div className="suggest-box w-full h-full box-border border flex flex-col p-5 lg:p-7">
          <div className="flex items-center justify-between lg:px-6 mt-1">
            <Button
              title="Most Popular"
              selected={sideFilter === 'popular'}
              classes="md:mx-0 mx-2"
              onClick={(): any => {
                sideFilterChangeHandler('popular');
              }}
            />
            <Button
              title="New Posts"
              selected={sideFilter === 'new'}
              classes="md:mx-0 mx-2"
              onClick={(): any => {
                sideFilterChangeHandler('new');
              }}
            />
          </div>
          <div className="lg:mt-1 my-6">
            {sideFilter === 'popular' ? popularDataRender() : null}
            {sideFilter === 'new' ? newDataRender() : null}
          </div>
          <div>{popularData && newData ? expandButtonDisplayHandler() : null}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-3 xl:col-span-2 px-3 lg:px-0">
        <div className="city-guide-box relative w-full">
          {data ? (
            <img
              src={data?.data?.hero_image?.url || '/public/static/assets/images/blog-home.png'}
              className="w-full"
              alt={data?.data?.hero_image?.alt || ''}
              style={{
                borderRadius: 20,
              }}
            />
          ) : (
            <div
              className="w-full"
              style={{
                height: 670,
              }}>
              <HomeImageSkeleton radius={20} />
            </div>
          )}
          <div className="absolute top-0 right-0 mt-6 pr-6 w-2/3 sm:w-1/2">
            <div className="flex flex-col items-start">
              <H2 color="text-white">{data?.data?.subtitle?.length > 0 ? data?.data?.subtitle[0].text : ''}</H2>
              <Link href="/blog/city-guide">
                <button
                  type="button"
                  onClick={(): any => {
                    setClickedCityGuides(true);
                  }}>
                  <Button
                    title={!clickedCityGuides ? 'City Guides' : <LoadingSpinner color="#000000" />}
                    selected={false}
                    classes="lg:mt-10 mt-4"
                    minWidth={160}
                  />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {renderSideBox()}
    </div>
  );
};

export default PopularNew;
