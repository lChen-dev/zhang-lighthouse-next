import React from 'react';

import { B1, H1 } from '@components/shared/Typography';
import { Home, Card as CardIcon, Reload, RightArrowIcon } from '@components/shared/Icons';
import Card from '@components/schools/components/Card';

import ButtonCta from '@components/shared/ButtonCta';
import StepContent from './component/StepContent';
import UniversitiesDialog from '../UniversitiesDialog';
import './css/style.css';

interface Props {
  showUniversitiesDialog: boolean;
  onShowUniDialog: () => void;
  onHideUniDialog: () => void;
}

const Hero: React.FC<Props> = ({ showUniversitiesDialog, onShowUniDialog, onHideUniDialog }: Props) => {
  return (
    <>
      <div className="hero-image-box w-full relative flex flex-col items-start xl:items-center">
        <div className="z-20 flex flex-col items-start w-full max-w-screen-xl mx-auto px-3 pt-10 md:pt-20 laptop-md:px-0 md:pt-30 xl:pt-32">
          <H1 weight="font-semibold" className="pt-24 inline-flex flex-col text-left items-start">
            <span>Off Campus Apartments</span>
            <span>with Cash Back</span>
          </H1>
          <ButtonCta onClick={() => onShowUniDialog()} icon={RightArrowIcon} className="mt-8 px-4 py-2 md:px-10">
            Select your University
          </ButtonCta>
          <B1
            style={{ background: '#F9F9F9CC', boxShadow: '0 0 1rem 1rem #F9F9F9CC' }}
            className="inline-flex flex-col mt-5 md:mt-8 text-left items-start w-4/4 md:w-1/4">
            <span className="text-gray-soft">
              Earn up to $1,200 while you rent in college. Select apartments that you pay you. Only through Lighthouse.
            </span>
          </B1>
        </div>
        <img
          src="/static/assets/images/schools-apartments.png"
          alt="navCover"
          className="schools-apartment absolute bottom-0 right-0 md:right-0"
        />
      </div>
      <div className="hidden md:block z-0 w-full relative md:z-20 max-w-screen-xl mx-auto px-3 laptop-md:px-0">
        <Card className="hero-cards relative flex flex-col md:flex-row w-full py-2 md:py-10 md:px-2">
          <StepContent
            text="Cash Back ranges from $250 once, up to $150, every month"
            heading="Earn while you rent"
            icon={Reload}
          />
          <StepContent
            borderLeft
            text="Lighthouse network has 7,000+ apartments across 40+ cities"
            heading="Browse 1,000s of homes"
            icon={Home}
          />
          <StepContent
            borderLeft
            text="Connect your bank account to Lighthouse for direct deposits"
            heading="Get paid seamlessly"
            icon={CardIcon}
          />
        </Card>
      </div>
      <div className="block md:hidden z-0 w-full relative md:z-20 max-w-screen-xl mx-auto px-3 laptop-md:px-0">
        <Card className="relative flex flex-col mb-4 md:flex-row w-full py-2 md:py-10 md:px-2">
          <StepContent
            text="Cash Back ranges from $250 once, up to $150, every month"
            heading="Earn while you rent"
            icon={Reload}
          />
        </Card>
        <Card className="relative flex flex-col mb-4 md:flex-row w-full py-2 md:py-10 md:px-2">
          <StepContent
            text="Lighthouse network has 7,000+ apartments across 40+ cities"
            heading="Browse 1,000s of homes"
            icon={Home}
          />
        </Card>
        <Card className="relative flex flex-col mb-4 md:flex-row w-full py-2 md:py-10 md:px-2">
          <StepContent
            text="Connect your bank account to Lighthouse for direct deposits"
            heading="Get paid seamlessly"
            icon={CardIcon}
          />
        </Card>
      </div>
      <div className="bg-brand hidden" />
      <UniversitiesDialog
        show={showUniversitiesDialog}
        selectedUni={null}
        onHide={() => {
          onHideUniDialog();
        }}
      />
    </>
  );
};

export default Hero;
