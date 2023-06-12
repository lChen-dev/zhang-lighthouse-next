export type WizardProps = {
  steps: {
    [key: string]: {
      Header?: React.ReactElement;
      SubHeader?: React.ReactElement;
      Component: React.ReactElement;
      headerText?: string;
      subHeaderText?: string;
      Footer?: React.ReactElement;
      onSubmit?: Function;
      beforeStepLoaded?: Function;
      ShowProgressSteps?: boolean;
    };
  };
  storageItemIndex?: string;
  query?: any;
  commonRoute?: string;
  removeHeaderLogo?: boolean;
  noShadowBox?: boolean;
  disableRouting?: boolean;
  disableBackground?: boolean;
  disableFooter?: boolean;
  disableStorage?: boolean;
  stepsIcons?: React.Component[];
  setVisibility?: any;
  modalRenderedOn?: string;
  setShowWizard?: (show: boolean) => boolean;
};

export type wizardStepProps = {
  getData: () => { [k: string]: any };
  saveData: (obj: { [k: string]: any }) => any;
  nextStep: () => any;
  sendTrack: (event: string, properties?: { [k: string]: any }) => void;
  toast: any;
  setNextStep: (step: string, properties?: { [k: string]: any }) => any;
  updateCompletedSteps: (step: string) => void;
  stepId: string | undefined | null;
  completedSteps: any[];
  appendToCompletedSteps: (...steps: string[]) => any;
  disableStorage: boolean;
  setVisibility?: any;
  modalRenderedOn?: string;
};

export const wizardDefaults: WizardProps = {
  steps: {},
  storageItemIndex: 'userOnboardingData',
};
