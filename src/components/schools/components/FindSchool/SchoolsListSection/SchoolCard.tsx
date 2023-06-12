import React from 'react';

import { H5, B2 } from '@components/shared/Typography';

interface Props {
  school: School;
}

type School = {
  buildings: string[];
  city: string;
  classesStart: string;
  count: number;
  facebookGroup: string;
  header: string;
  includeUniInMVP: boolean;
  lightHouseGroup: boolean;
  lighthouseCount: number;
  linkToLighthouseGroup: string;
  logo: string;
  mascotName: string;
  name: string;
  ranking: number;
  rawCount: number;
  state: string;
  students: number;
  subtitle: string;
  urlRoute: string;
  zipCode: string;
  createdAt: string;
  id: string;
  updatedAt: string;
};

const SchoolCard: React.FC<Props> = ({ school }: Props) => {
  return (
    <a href={`schools${school?.urlRoute}`} className="w-full flex items-center mt-10 cursor-pointer md:w-1/3">
      <div
        className="border rounded p-3 mr-5 overflow-hidden"
        style={{ borderColor: '#E8E8E8', width: 100, height: 100 }}>
        {school?.logo !== '' && <img src={school?.logo} alt={school?.name} />}
      </div>
      <div>
        <H5>{school?.name}</H5>
        <B2 className="mt-1">
          <span className="text-gray-soft">{school?.city}</span>
        </B2>
      </div>
    </a>
  );
};

export default SchoolCard;
