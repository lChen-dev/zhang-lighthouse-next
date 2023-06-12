import { validate } from 'email-validator';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { phoneStep } from './PhoneOtpStep';
import { emailStep } from './EmailOtpStep';
import { otpConfirmationStep } from './AuthenticateOtpStep';
import { gettingAcquaintedStartStep } from './Acquainted-Start';
import { gettingAcuaintedVerifiedStep } from './Acquainted-Verify';
import { letUsHelpYouStep } from './Support';

export type beforeStepLoadedProps = {
  allSteps: string[];
  currentStepIndex: number;
  prevStepIndex: string;
  previousStep: string;
  reset: Function;
  setIsLoading: Function;
  currentData: { [key: string]: any };
};

export const steps: any = {
  phone: phoneStep,
  email: emailStep,
  otp: {
    ...otpConfirmationStep,
    beforeStepLoaded: ({ reset, currentData }: beforeStepLoadedProps): boolean => {
      if (
        // either email or phoneNumber needs to be present before this step is loaded
        !(currentData?.hasOwnProperty('email') && currentData.email && validate(currentData.email)) &&
        !(
          currentData?.hasOwnProperty('phoneNumber') &&
          currentData.phoneNumber &&
          isValidPhoneNumber(currentData.phoneNumber)
        )
      ) {
        reset();
        return true;
      }
      return false;
    },
  },
  'getting-acquainted-start': gettingAcquaintedStartStep,
  'getting-acquainted-verified': gettingAcuaintedVerifiedStep,
  'get-help': letUsHelpYouStep,
};
