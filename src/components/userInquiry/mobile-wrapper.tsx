import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ArrowLeft, MapOpenSVG } from '@components/shared/Icons';
import { useRouter } from 'next/router';
import { removeUndefinedFields } from '@utils/helpers';
import LocationAutocomplete from '@components/onboarding/LandingPageSearch';
import { steps } from './steps';
import UserInquiry from '.';

const SuccessResults = dynamic(() => import('@components/search/Results'), { ssr: false });

function GettingStartedPageUI(props: any) {
  const stepId = props?.query?.stepId;
  const city = props?.query?.city;
  const router = useRouter();
  const { query, pathname } = router;
  const [show, setShow] = useState(stepId !== 'location');
  const [grayFilter, setGrayFilter] = useState(stepId === 'location');
  const [callWizardButton, setCallWizardButton] = useState(stepId === 'location');
  const [showMapMenu, setShowMapMenu] = useState(stepId !== 'location');
  const [showCitySelect, setShowCitySelect] = useState(!city);
  const showMap = (): void => {
    setShow(false);
    setCallWizardButton(true);
    setGrayFilter(true);
    setShowMapMenu(false);
  };
  const hideMap = (e: any) => {
    if (grayFilter) setGrayFilter(false);
    setCallWizardButton(false);
    setShow(true);
    setShowMapMenu(true);
  };
  const updateQuery = (newArgs: { [key: string]: any }) => {
    const newQuery = { ...query, ...newArgs };
    removeUndefinedFields(newQuery);
    router.replace({
      pathname,
      query: newQuery,
    });
  };
  const back = () => {
    const newIndex =
      Object.keys(steps).findIndex((v) => v === query?.stepId) >= 1
        ? Object.keys(steps).findIndex((v) => v === query?.stepId) - 1
        : 0;
    const newQuery = { ...query, stepId: Object.keys(steps)[newIndex] };
    removeUndefinedFields(newQuery);
    router.replace({
      pathname,
      query: newQuery,
    });
  };
  const confirmDrawing = (e: any) => {
    hideMap(e);
  };
  return (
    <div className="w-full flex flex-row h-screen relative overflow-y-hidden">
      <div className=" w-full block">
        <SuccessResults onBoardingVersion confirmDrawing={confirmDrawing} />
      </div>
      <div
        className={`  conditionalShadow w-full  absolute top-0 mbp:flex right-0 ease-in duration-500 ${
          show ? ' translate-y-8 mbp:translate-y-0 ' : 'translate-y-full mbp:translate-y-0'
        } transform  mbp:w-459px `}>
        <UserInquiry {...props} />
      </div>
      <div
        onClick={() => {
          setCallWizardButton(false);
          setGrayFilter(false);
        }}
        className={`  ${
          grayFilter ? 'block' : 'hidden'
        } mbp:hidden absolute top-0 right-0 h-full w-full bg-gray bg-opacity-75 `}>
        <div className="m-auto text-white " style={{ transform: 'translate(0,40vh)' }}>
          <div className="flex flex-col w-full justify-center items-center">
            <div className="font-circular font-bold text-28px text-white">Tap to draw your region</div>
            <div className="font-circular font-bold text-16px text-white">Setup you searching region</div>
          </div>
        </div>
      </div>
      {callWizardButton && (
        <div
          onClick={hideMap}
          className="  block  absolute mbp:hidden bottom-0  h-40 rounded-t-3xl w-full bg-white flex flex-col">
          <div className="w-full flex-row justify-center flex">
            <div className=" w-16 mt-4 bg-gray-light rounded-3xl border border-gray-light" style={{ height: '3px' }} />
          </div>
          <div
            className="font-circular text-gray-blue font-bold ml-4  mt-3 mb-px text-33px"
            style={{ letterSpacing: '-0.03em', lineHeight: '43px' }}>
            Any preferred locations?{' '}
            <span className="font-normal text-24px text-gray-light text-left" style={{ lineHeight: '28.8px' }}>
              (Optional)
            </span>
          </div>
          <div className="font-circular text-gray-soft font-normal text-18px mt-2  ml-4">
            More tailored insights in{' '}
          </div>
        </div>
      )}
      <div
        className={`flex mbp:hidden  transform ease-linear   absolute ${
          show ? 'top-0 h-20' : 'top-0 mt-3 h-16 rounded-lg '
        }   mx-auto  bg-white flex-col mx-3"`}
        style={{ width: show ? '100%' : 'calc(100% - 40px)', right: show ? 0 : '20px' }}>
        {show && (
          <div className="w-full flex-row justify-between flex my-auto  " style={{ paddingTop: show ? '22px' : 0 }}>
            <button
              onClick={back}
              className="w-20 relative h-full outline-none focus:outline-none text-gray-blue"
              style={{ marginLeft: '28px' }}>
              <div className="absolute left-0 pt-px">
                <ArrowLeft />
              </div>

              <div className="ml-10 font-circular text-18px font-bold">Form</div>
            </button>
            <button
              onClick={showMap}
              className="w- relative transform -translate-x-10 h-full outline-none focus:outline-none text-brand ">
              <div className="absolute left-0 pt-px">
                <MapOpenSVG />
              </div>
              <div className="ml-8 font-circular text-16px font-bold">Show Map</div>
            </button>
          </div>
        )}
        {!show && (
          <>
            {showCitySelect && (
              <LocationAutocomplete
                selected={(newLocationInput, newBoundary) => {
                  updateQuery({
                    city: newLocationInput,
                    ne: newBoundary.NE,
                    sw: newBoundary.SW,
                  });
                  setShowCitySelect(false);
                }}
              />
            )}
            {!showCitySelect && (
              <div className="w-full flex-row justify-between flex my-auto  ">
                <button
                  onClick={back}
                  className="w-48 relative h-full outline-none focus:outline-none text-gray-blue"
                  style={{ marginLeft: '28px' }}>
                  <div className="absolute left-0 pt-px">
                    <ArrowLeft />
                  </div>

                  <div className="ml-10 font-circular text-18px font-bold text-left">{city}</div>
                </button>
                <button
                  onClick={() => setShowCitySelect(true)}
                  className="w- relative transform -translate-x-10 h-full outline-none focus:outline-none text-brand ">
                  <div className="ml-8 font-circular text-16px font-bold">Change city</div>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default GettingStartedPageUI;
