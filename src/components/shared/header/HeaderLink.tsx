import React from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { H6 } from '@components/shared/Typography';

interface Props {
  href: string;
  text: string | JSX.Element;
  title?: string;
  colorClass?: string;
}

const HeaderLink: React.FC<Props> = ({ href, text, title, colorClass }: Props) => {
  const { pathname } = useRouter();
  const selected = pathname.startsWith(href);
  return (
    <div className={classNames('px-1 mx-3 sm:mx-4', { 'border-b-2 border-gray-lighter': selected })}>
      <a title={title} href={href}>
        <H6 className={classNames(colorClass)}>{text}</H6>
      </a>
    </div>
  );
};

HeaderLink.defaultProps = {
  title: undefined,
  colorClass: 'text-black',
};

export default HeaderLink;
