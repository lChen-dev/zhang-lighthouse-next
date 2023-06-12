import React from 'react';
import { B1, H2 } from '@components/shared/Typography';
import { useRouter } from 'next/router';
import { ArrowLeft } from '@components/shared/Icons';

function HeaderComponent({
  title,
  subTitle,
  setNextStep,
  steps,
  stepId,
  disableRouting,
}: {
  title: string;
  subTitle: string;
  setNextStep?: any;
  steps?: any;
  stepId?: any;
  disableRouting?: any;
}): React.ReactElement {
  const router = useRouter();
  const moveBack = (): void => {
    setNextStep(
      Object.keys(steps).findIndex((v) => v === stepId) > 1
        ? Object.keys(steps)[Object.keys(steps).findIndex((v) => v === stepId) - 1]
        : Object.keys(steps)[stepId === 'phone' ? 1 : 0]
    );
  };

  const checkOnboardingroutes = (): boolean => {
    return (
      router.asPath.includes('phone') ||
      router.asPath.includes('email') ||
      router.asPath.includes('otp') ||
      router.asPath.includes('getting-acquainted-start') ||
      router.asPath.includes('getting-acquainted-verified')
    );
  };
  return (
    <>
      <button
        type="button"
        onClick={(e: any): void => {
          e.preventDefault();
          moveBack();
        }}
        className={`outline focus:outline-none visible authpopup:invisible transform -translate-y-2 ${
          disableRouting && ['phone', 'email'].includes(stepId) ? 'hidden' : ''
        }`}
      >
        {' '}
        <ArrowLeft />
      </button>
      <H2 className="font-bold mbp:pt-6 pt-2 no-dark">{title}</H2>
      {checkOnboardingroutes() && (
        <B1 style={{ lineHeight: '24px', marginTop: '6px', whiteSpace: 'normal' }} className="hidden md:flex no-dark">
          {subTitle}
        </B1>
      )}
    </>
  );
}

const Header = ({ Step, setNextStep, steps, stepId, disableRouting }: any): React.ReactElement => (
  <HeaderComponent
    disableRouting={disableRouting}
    title={Step.headerText}
    subTitle={Step.subHeaderText}
    setNextStep={setNextStep}
    steps={steps}
    stepId={stepId}
  />
);

export const defaultHeaderText = 'Welcome to Lighthouse';
export const defaultSubHeaderText =
  'Where you can earn up to $1,200 for a new lease. Sign up today and get a $50 bonus.';

export default Header;
