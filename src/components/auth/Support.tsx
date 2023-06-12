import 'react-toastify/dist/ReactToastify.css';
import './styles/styles.css';
import { CheckSVG, HumanSVG, RightArrowSVG, ShieldSVG } from '@components/shared/Icons';
import ProgressSteps from '@components/shared/ProgressSteps/ProgressSteps';
import { wizardStepProps } from '@components/shared/wizard/Props';
import Header from './components/Header';
import { FooterImage } from './components/Footer';

export default function LetUsHelpYou(props: wizardStepProps): React.ReactElement {
  const { setVisibility, modalRenderedOn } = props;
  const workWithExpert = (e: any): void => {
    e.preventDefault();
    if (modalRenderedOn?.toLowerCase().startsWith('/start') && setVisibility) {
      setVisibility(false);
      return;
    }
    window.location.replace('/start');
  };
  const selfSearchAction = (e: any): void => {
    e.preventDefault();
    if (modalRenderedOn?.toLowerCase().startsWith('/search') && setVisibility) {
      setVisibility(false);
      return;
    }
    window.location.replace('/search');
  };

  let Icons = [HumanSVG, CheckSVG, ShieldSVG];
  let activeIcon = 2;
  if (modalRenderedOn?.toLowerCase().startsWith('/insurance')) {
    Icons = [HumanSVG, CheckSVG];
    activeIcon = 1;
  }
  return (
    <div>
      <ProgressSteps Icons={Icons} activeIcon={activeIcon} />
      <form className="o-phone-number-form  mt-6 block no-dark">
        <div className="o-phone-number-form__fields flex flex-col font-circular block">
          <button
            type="button"
            onClick={workWithExpert}
            className="relative w-full block rounded-md border-3 border-brand px-5 outline-none focus:outline-none text-left">
            <div className="flex flex-row w-full mt-4 mb-4 whitespace-normal">
              <div className="block w-11/12 mx-auto ">
                <div className="font-bold text-20px text-gray-dark font-circular">Work with Lightkeeper</div>
                <div className="font-normal text-14 text-gray-normal font-circular whitespace-normal block">
                  I’d like to receive a custom list of apartments and review strategies o find the right unit for me
                </div>
              </div>
              <div className="my-auto text-brand w-1/12 block">
                <RightArrowSVG />
              </div>
            </div>
            <div className="absolute top-0 w-full flex flex-row flex-no-wrap justify-end">
              <div className="text-12px bg-brand w-40  -mt-4 p-2 mr-2 text-center font-circular">
                <span className="text-white">
                  {' '}
                  Don’t worry, <span className="font-bold font-circular text-white">it’s free</span>
                </span>
              </div>
            </div>
          </button>
          <button
            onClick={selfSearchAction}
            type="button"
            className="relative w-full rounded-md border-2  px-5 outline-none focus:outline-none text-left mt-4">
            <div className="flex flex-row w-full justify-center mt-4 mb-4">
              <div className="block w-11/12 mx-auto">
                <div className="font-bold text-20px text-gray-dark font-circular block">Explore on my own</div>
                <div className="font-normal text-14 text-gray-normal font-circular whitespace-normal block">
                  I&apos;d like to perform my own searches and apartment filters. I will simply make sure to go through
                  Lighthouse for cash back
                </div>
              </div>
              <div className="my-auto text-brand w-1/12">
                <RightArrowSVG />
              </div>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}

export const letUsHelpYouStep = {
  Header,
  Component: LetUsHelpYou,
  headerText: 'Let us help you',
  subHeaderText: 'What do you prefer?',
  Footer: FooterImage,
};
