import React from 'react';
import { B1 } from '@components/shared/Typography';

interface Props {
  title: string;
  subTitle: string;
}

const Header: React.FC<Props> = ({ title, subTitle }: Props) => (
  <>
    <B1 className="mb-0">{title}</B1>
    <div
      className="font-medium font-circular text-gray-blue text-26px mb-1"
      style={{ letterSpacing: '-0.03', lineHeight: '1.2em', marginTop: '6px' }}>
      {subTitle}
    </div>
  </>
);

export default Header;
