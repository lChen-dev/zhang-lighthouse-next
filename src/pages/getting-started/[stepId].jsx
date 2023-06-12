import '../../styles/globals.css';
import '../../components/insurance/styles.css';

import GettingStartedPageUI from '@components/userInquiry/mobile-wrapper';

export default function GettingStartedPage(props) {
  return <GettingStartedPageUI query={props?.query} />;
}
export const getServerSideProps = async ({ query, req, res }) => {
  const { ne, sw, city, stepId } = query;
  console.log(query);
  if ((!ne || !sw) && !city) {
    return {
      redirect: {
        destination: `/getting-started/${query?.stepId ||
          'location'}?ne=-96.7680203964039&ne=32.85139886255895&sw=-96.83239341276132&sw=32.734223656745&zoom=14`,
        permanent: false,
      },
    };
  }

  return { props: { query } };
};
