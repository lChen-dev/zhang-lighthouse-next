import '../../styles/globals.css';
import '../../components/insurance/styles.css';
import UserInquiry from '@components/userInquiry/index';

export default function GuidedStartPage(props) {
  return (
    <div className="w-full flex flex-row h-full justify-center">
      <UserInquiry pageRoute="guidedstart" {...props} />
    </div>
  );
}

export const getServerSideProps = async ({ query }) => {
  return {
    props: { query },
  };
};
