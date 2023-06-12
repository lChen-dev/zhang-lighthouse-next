import React from 'react';

import SchoolsUI from '@components/schools/schools';
import { unAuthed } from '@utils/http';
import '../../../public/static/assets/css/style.css';
import './styles.css';

interface Props {
  schools: any;
}

export const SchoolsPage: React.FC<Props> = ({ schools }: Props) => {
  return <SchoolsUI schools={schools} />;
};

export async function getServerSideProps() {
  const schoolsMVPRequest = await unAuthed.get('/schools/getSchoolsMVP');
  return {
    props: {
      schools: schoolsMVPRequest.data?.Schools,
    },
  };
}

export default SchoolsPage;
