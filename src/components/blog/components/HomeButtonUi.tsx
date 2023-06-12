import React, { useState } from 'react';
import Link from 'next/link';
import { H3 } from '@components/shared/Typography';
import { LoadingSpinner } from '@components/shared';
import Button from './ButtonUi';
import '../../../../public/static/assets/css/blog.css';

interface Props {
  name?: string | undefined;
}

const HomeButton: React.FC<Props> = ({ name = '' }: Props) => {
  const [clickedHomeButton, setClickedHomeButton] = useState<boolean>(false);
  const homeButtonRender = (): any => {
    return (
      <div className="home-button">
        <Link href="/blog">
          <button
            type="button"
            onClick={(): any => {
              setClickedHomeButton(true);
            }}>
            <Button
              title={!clickedHomeButton ? '🏠' : <LoadingSpinner color="#000000" />}
              selected={false}
              classes="md:mx-0 mx-2"
              minWidth={90}
            />
          </button>
        </Link>
      </div>
    );
  };
  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="col-span-2 xl:col-span-3">
        <div className="mt-10 w-full flex flex-wrap items-center justify-between px-3 lg:px-0 md:justify-between">
          <H3 className="md:pb-0 pb-10">{name.length > 0 ? name : ''}</H3>
          <div className="flex gap-4">{homeButtonRender()}</div>
        </div>
      </div>
    </div>
  );
};

export default HomeButton;
