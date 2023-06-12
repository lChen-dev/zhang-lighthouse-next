import '../../styles/globals.css';
import '../../components/auth/styles/styles.css';
import '../../components/insurance/styles.css';
import Onboarding from '@components/auth/index';
import SuccessResults from '@components/search/Results';

export default function UserOnboardingPage(props) {
  return (
    <div className="w-full flex flex-row h-full">
      <div className="hidden mbp:w-full mbp:block">
        <SuccessResults onBoardingVersion />
      </div>
      <div className="h-full wizard-wrapper">
        <Onboarding {...props} />
      </div>
    </div>
  );
}

export const getServerSideProps = async ({ query }) => {
  return {
    props: { query },
  };
};
