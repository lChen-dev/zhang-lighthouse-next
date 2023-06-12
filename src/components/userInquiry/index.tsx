import { useRouter } from 'next/router';
import { Header, LoadingSpinner } from '@components/shared';

import 'react-toastify/dist/ReactToastify.css';

import Wizard from '@components/shared/wizard/Wizard';

import { steps } from './steps';
import ProgressStepsExpanded from './ProgressStepsExpanded';

function UserInquiry(props: any) {
  const router = useRouter();

  return (
    <>
      {props.pageRoute && <Header blackNav />}
      <div className=" w-full  flex-row flex justify-center">
        {props.pageRoute === 'guidedstart' && router.query.stepId !== 'specialist' && (
          <ProgressStepsExpanded count={5} />
        )}
        <div
          className="w-full   mbp:w-144 mx-auto flex justify-center"
          style={{ marginTop: props.pageRoute === 'guidedstart' ? '' : '10px' }}>
          <Wizard
            noShadowBox
            steps={steps}
            commonRoute={props?.pageRoute || 'getting-started'}
            removeHeaderLogo
            storageItemIndex="userInquiryData"
            setShowWizard={props.setShowInquiry}
          />
        </div>
      </div>
    </>
  );
}

export default UserInquiry;
