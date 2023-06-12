import 'react-toastify/dist/ReactToastify.css';
import { H4 } from '@components/shared/Typography';
import './styles/styles.css';
import ProgressSteps from '@components/shared/ProgressSteps/ProgressSteps';
import { CheckSVG, HumanSVG, ShieldSVG } from '@components/shared/Icons';
import { wizardStepProps } from '@components/shared/wizard/Props';
import Header from './components/Header';
import { FooterImage } from './components/Footer';

export default function GettingAcquaintedVerified(props: wizardStepProps): React.ReactElement {
  const { setNextStep, updateCompletedSteps, stepId, modalRenderedOn } = props;

  /*
    ______           __                      _   _
  .' ____ \         [  |                    (_) / |_
  | (___ \_|__   _   | |.--.   _ .--..--.   __ `| |-'
   _.____`.[  | | |  | '/'`\ \[ `.-. .-. | [  | | |
  | \____) || \_/ |, |  \__/ | | | | | | |  | | | |,
   \______.''.__.'_/[__;.__.' [___||__||__][___]\__/

  */

  const onSubmit = (e: any): void => {
    e.preventDefault();
    updateCompletedSteps(stepId as string);
    setNextStep('get-help');
  };
  let Icons = [HumanSVG, CheckSVG, ShieldSVG];
  const activeIcon = 1;
  if (modalRenderedOn?.toLowerCase().startsWith('/insurance')) {
    Icons = [HumanSVG, CheckSVG];
  }

  return (
    <div>
      <ProgressSteps Icons={Icons} activeIcon={activeIcon} />
      <form onSubmit={onSubmit} className="o-phone-number-form  mt-6 no-dark">
        <div className="o-phone-number-form__fields flex flex-col px-3">
          <H4 className="w-11/12 block whitespace-normal">
            {' '}
            You have to add Lighthouse as your referral source on the apartment application
          </H4>

          {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
          <div className="font-normal text-18px text-gray-dark font-circular">Otherwise, no cashback☝️</div>
          <button
            type="button"
            onClick={onSubmit}
            className="mt-10 w-full bg-brand h-14 flex flex-row flex-no-wrap rounded justify-center items-center outline-none focus:outline-none"
          >
            {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
            <span className="w-64 font-bold text-md text-white font-circular">I understand, continue 🤝</span>
            <div className=" my-auto font-bold text-lg mr-2">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 9H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 2L16 9L9 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}

export const gettingAcuaintedVerifiedStep = {
  Header,
  Component: GettingAcquaintedVerified,
  headerText: 'Get your cash back',
  subHeaderText: 'Start earning up to $1,800 on renting',
  Footer: FooterImage,
};
