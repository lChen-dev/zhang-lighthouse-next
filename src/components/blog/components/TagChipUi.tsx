import React from 'react';
import { B2 } from '@components/shared/Typography';
import Link from 'next/link';
import '../../../../public/static/assets/css/blog.css';

interface Props {
  title: string | undefined;
}

const Chip: React.FC<Props> = ({ title = '' }: Props) => {
  return (
    <Link href={`/blog/tag/${title}`}>
      <span className="article-tag-chip px-3 py-1 flex items-center justify-center focus:outline-none mr-3 cursor-pointer">
        <B2 weight="font-bold" color="text-black">
          {title}
        </B2>
      </span>
    </Link>
  );
};

export default Chip;
