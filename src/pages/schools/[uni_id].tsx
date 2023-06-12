import React from 'react';

import SpecificSchoolUI from '@components/schools/specificSchool';

import '../../../public/static/assets/css/style.css';
import { unAuthed } from '@utils/http';

interface Props {
  school: any;
}

export const SpecificSchoolsPage: React.FC<Props> = ({ school }: Props) => {
  return <SpecificSchoolUI school={school} />;
};

export async function getServerSideProps(props: any): Promise<object> {
  const { query } = props;
  const request = await unAuthed.get(`/schools/getSchoolByURL/${query?.uni_id}`);
  if (request?.data?.length === 0) {
    return {
      redirect: {
        destination: '/schools',
        permanent: false,
      },
    };
  }
  return {
    props: {
      school: request?.data || null,
    },
  };
}

export default SpecificSchoolsPage;
