export type inputString = {
  target: { value: string };
};

export type primaryButtonProps = {
  onSubmit: (e?: any) => Promise<any> | any;
  formIsValidated: boolean;
  showIcon?: boolean;
  Icon?: () => React.ReactElement;
  customIcon?: boolean;
  buttonText?: string;
  disabled?: boolean;
  isLoading?: boolean;
};
export type codeInputProps = {
  timer: any;
  footerText: string | React.ReactChild;
  footerSubText: string | React.ReactChild;
  buttonText: string;
  onClick: (e?: any) => any;
  secondaryAuthAvailable: boolean;
  isChoicePhonePasswordless: boolean;
  stepId?: string;
  saveData?: (obj: { [k: string]: any }) => any;
  setNextStep?: (step: string, properties?: { [k: string]: any }) => any;
  nextStep?: () => any;
  getData?: () => { [k: string]: any };
  appendToCompletedSteps?: (...steps: string[]) => any;
  completedSteps?: string[];
  updateCompletedSteps?: (string: any) => any;
  setTimer: any;
  nextPath?: string;
  footerDisabled?: boolean;
  setVisibility?: any;
  modalRenderedOn?: string;
  enableUser?: boolean;
};
