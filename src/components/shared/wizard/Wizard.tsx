import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { LoadingSpinner } from '@components/shared';
import { sendTrack } from '@utils/analytics';
import { wizardDefaults, WizardProps } from './Props';
import WizardHelper from './WizardHelper';
import './style.css';
// import WizardContext, { WizardContextType } from '@components/shared/wizard/WizardContext';

let backgroundStyle = {
  boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
  background: '#fff',
  marginRight: '0px',
};

/**
 * Wizard Component
 * @param props {steps, storagItemIndex, query}
 * @returns {React.ReactElement} Render Wizard
 */
function Wizard(props: WizardProps = wizardDefaults): React.ReactElement {
  const {
    steps,
    removeHeaderLogo,
    disableFooter,
    commonRoute,
    disableRouting = false,
    disableBackground = false,
    setVisibility = null,
    modalRenderedOn = '',
    setShowWizard,
  } = props;

  const { storageItemIndex, query, disableStorage = false, noShadowBox } = props;
  const router = useRouter();
  const sharedRoute = commonRoute || 'user-onboarding';
  if (noShadowBox) {
    backgroundStyle = { ...backgroundStyle, boxShadow: 'none' };
  }
  const debounce = useRef<any>(null);
  const completedSteps = useRef<any[]>([]);
  const localData = useRef<any>({});
  const { stepId: routerId } = query || router.query;
  const stepKeys = Object.keys(steps);
  const [isLoading, setIsLoading] = useState(true);
  const [stepId, setStepId] = useState<string>(routerId || stepKeys[0]);
  const currentStepIndex = stepKeys.indexOf(stepId);
  const nextStepIndex = stepKeys[currentStepIndex + 1];
  const [Step, updateStep] = useState<any>(() => steps[stepId]);
  const [formData, setFormData] = useState({});

  const {
    setNextStep,
    updateCompletedSteps,
    saveData,
    getData,
    appendToCompletedSteps,
    checkRouterAction,
  } = new WizardHelper({
    ...props,
    routerId,
    query,
    completedSteps,
    localData,
    storageItemIndex,
    setStepId,
    stepId,
    stepKeys,
    disableRouting,
    router,
    updateStep,
    steps,
    formData,
    setFormData,
    disableStorage,
    debounce,
    sharedRoute,
    setIsLoading,
  });

  useEffect(() => {
    checkRouterAction();
  }, [router, checkRouterAction]);

  useEffect(() => {
    setNextStep(routerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routerId]);
  useEffect(() => {
    completedSteps.current =
      JSON.parse((window as any).localStorage.getItem(storageItemIndex as string))?.completedSteps || [];
  }, []);

  // TODO: add context?
  // const contextValue: WizardContextType = {
  //   wizardData: getData(),
  //   saveData: (someData: Partial<any>) => saveData({ ...getData(), ...someData }),
  //   goToStep: setNextStep,
  //   setLoading: setIsLoading,
  // };

  return (
    <>
      <ToastContainer />
      {Step && (
        <div
          className={`auth-wizard-container ${
            !disableBackground
              ? `h-screen overflow-y-auto ${
                  disableRouting ? 'wizardcontainer wizardcontainerpopup' : 'wizardcontainer'
                }`
              : ''
          }`}
          style={!disableBackground ? backgroundStyle : {}}>
          {!removeHeaderLogo && (
            <img
              className="hidden mbp:flex"
              alt="logo"
              src="/static/assets/Icons/logoNotext.svg"
              style={{ paddingLeft: '5px', paddingBottom: '10px' }}
            />
          )}
          <div>
            {isLoading ? (
              <div className="flex justify-center my-10">
                <LoadingSpinner color="#2B7D5B" />
              </div>
            ) : (
              <>
                {Step.Header && (
                  <Step.Header
                    Step={Step}
                    setShowWizard={setShowWizard}
                    setNextStep={setNextStep}
                    steps={steps}
                    stepId={stepId}
                    disableRouting={disableRouting}
                  />
                )}
                {Step.SubHeader && <Step.SubHeader Step={Step} />}
                <Step.Component
                  setVisibility={setVisibility}
                  appendToCompletedSteps={appendToCompletedSteps}
                  updateCompletedSteps={updateCompletedSteps}
                  completedSteps={completedSteps.current}
                  stepId={stepId}
                  getData={getData}
                  saveData={saveData}
                  sendTrack={sendTrack}
                  toast={toast}
                  setNextStep={setNextStep}
                  setIsLoading={setIsLoading}
                  disableStorage={disableStorage}
                  modalRenderedOn={modalRenderedOn}
                  // eslint-disable-next-line consistent-return
                  nextStep={(): any => {
                    if (nextStepIndex) {
                      updateCompletedSteps(stepId);
                      if (!Step.onSubmit) {
                        setNextStep(nextStepIndex);
                      } else {
                        return Step.onSubmit(stepId);
                      }
                    }
                  }}
                />
              </>
            )}
          </div>
          {!disableFooter && Step.Footer && <Step.Footer />}
        </div>
      )}
    </>
  );
}

export default Wizard;
