import { LoadingSpinner } from '@components/shared';
import { CSSProperties } from 'react';
import { primaryButtonProps } from '../Props';

export const ButtonArrowIcon = (): React.ReactElement => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 9H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 2L16 9L9 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PrimaryButton = ({
  onSubmit,
  formIsValidated: formIsComplete,
  showIcon = true,
  Icon = (): React.ReactElement => <></>,
  customIcon = false,
  buttonText = 'Continue',
  disabled = false,
  isLoading = false,
}: primaryButtonProps): React.ReactElement => {
  let UserIcon = ButtonArrowIcon;
  if (customIcon) {
    UserIcon = Icon;
  }
  if (isLoading) {
    UserIcon = (): React.ReactElement => <LoadingSpinner color="#2B7D5B" />;
  }
  return (
    <button
      type="button"
      style={{ marginTop: '42px' }}
      className={`w-full h-14 flex flex-row font-circular outline-none focus:outline-none flex-no-wrap rounded justify-center items-center ${
        !formIsComplete ? 'bg-gray-400' : 'bg-brand'
      }`}
      disabled={!formIsComplete || disabled || isLoading}
      onClick={onSubmit}
    >
      {isLoading ? (
        <div className="flex justify-center my-10">
          <LoadingSpinner color="#2B7D5B" />
        </div>
      ) : (
        <>
          <span className="w-auto font-bold text-lg text-white">{buttonText}</span>
          {showIcon ? (
            <div className=" my-auto font-bold text-lg ml-3">
              <UserIcon />
            </div>
          ) : null}
        </>
      )}
    </button>
  );
};

export const SecondaryButton = ({
  onClick,
  buttonText = '',
  disabled = false,
  textColor = 'text-brand',
}: {
  onClick: (e?: any) => any;
  buttonText: string;
  disabled?: boolean;
  textColor?: string;
}): React.ReactElement => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{ marginTop: '14px' }}
      className={`w-full font-circular outline-none focus:outline-none h-14 font-bold text-lg rounded bg-white ${
        disabled ? ' text-gray-400' : textColor
      }`}
    >
      {buttonText}
    </button>
  );
};

export const LinkButton = ({
  onClick = (e: any): any => null,
  children = null,
  style = { marginTop: '10px' },
  disabled = false,
}: {
  onClick: (e?: any) => unknown;
  children: any;
  style?: CSSProperties;
  disabled?: boolean;
}): React.ReactElement<any, any> => {
  return (
    <button
      className="w-full text-base font-bold text-brand hover:underline text-left font-circular"
      style={style}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default {};
