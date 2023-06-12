import React from 'react';
import { useRouter } from 'next/router';

import { BedSVG, LocationPinSVG, AmenitySVG, BudgetSVG, CalendarSVG } from '@components/shared/Icons';

import CalendarWidget from './calendar';
import Header from './Header';
import Location from './location';
import Bedrooms from './Bedrooms';
import Amenities from './amenities';
import Histogramme from './histogramme';
import Specialist from './specialist';
import ProgressSteps from '../shared/ProgressSteps/ProgressSteps';

export const stepsIcons: any[] = [LocationPinSVG, BedSVG, AmenitySVG, BudgetSVG, CalendarSVG];
const defaultHeaderText = 'Advanced search';
const defaultSubHeaderText = 'Work with expert';
export const stepsExtended: any[] = [
  { Icon: LocationPinSVG, name: 'City & Location' },
  { Icon: BedSVG, name: 'Bedrooms' },
  { Icon: AmenitySVG, name: 'Amenties', Optional: true },
  { Icon: BudgetSVG, name: 'Budget & Credit History' },
  { Icon: CalendarSVG, name: 'Moving date' },
];
export const steps: any = {
  location: {
    Component: Location,
    Header: () => {
      const router = useRouter();

      return !router.pathname.includes('guidedstart') ? (
        <Header title={defaultHeaderText} subTitle={defaultSubHeaderText} />
      ) : null;
    },
    SubHeader: () => {
      const router = useRouter();
      return (
        <>
          {!router.pathname.includes('guidedstart') && <ProgressSteps Icons={stepsIcons} activeIcon={0} />}
          {!router.pathname.includes('guidedstart') ? (
            <div
              className=" font-circular font-medium text-gray-blue text-26px lg:text-36px "
              style={{ letterSpacing: '-0.03', lineHeight: '1.2em', marginTop: '26px', marginBottom: '35px' }}>
              Any preferred locations? <span className="text-24px text-gray-light font-normal ">(Optional)</span>
            </div>
          ) : (
            <div
              className=" font-circular font-medium text-gray-blue text-26px lg:text-36px "
              style={{
                letterSpacing: '-0.03',
                lineHeight: '1.2em',
                marginTop: router.pathname.includes('guidedstart') ? '46px' : '26px',
                marginBottom: '35px',
              }}>
              Get started! City?
            </div>
          )}
        </>
      );
    },
    headerText: defaultHeaderText,
    subHeaderText: defaultSubHeaderText,
    ShowProgressSteps: true,
  },
  bedrooms: {
    Component: Bedrooms,
    Header: () => {
      const router = useRouter();

      return !router.pathname.includes('guidedstart') ? (
        <Header title={defaultHeaderText} subTitle={defaultSubHeaderText} />
      ) : null;
    },
    headerText: defaultHeaderText,
    subHeaderText: defaultSubHeaderText,
    SubHeader: () => {
      const router = useRouter();
      return (
        <>
          {!router.pathname.includes('guidedstart') && <ProgressSteps Icons={stepsIcons} activeIcon={1} />}
          <div
            className=" font-circular font-medium text-gray-blue text-26px lg:text-36px "
            style={{
              letterSpacing: '-0.03',
              lineHeight: '1.2em',
              marginTop: router.pathname.includes('guidedstart') ? '46px' : '26px',
              marginBottom: '35px',
            }}>
            How many bedrooms suits you?
          </div>
        </>
      );
    },
    ShowProgressSteps: true,
  },
  amenities: {
    Component: Amenities,
    Header: () => {
      const router = useRouter();

      return !router.pathname.includes('guidedstart') ? (
        <Header title={defaultHeaderText} subTitle={defaultSubHeaderText} />
      ) : null;
    },
    SubHeader: () => {
      const router = useRouter();
      return (
        <>
          {!router.pathname.includes('guidedstart') && <ProgressSteps Icons={stepsIcons} activeIcon={2} />}
          <div
            className=" font-circular font-medium text-gray-blue text-26px lg:text-36px "
            style={{
              letterSpacing: '-0.03',
              lineHeight: '1.2em',
              marginTop: router.pathname.includes('guidedstart') ? '46px' : '26px',
              marginBottom: '35px',
            }}>
            Any specific amenities like pet friendly, etc?
          </div>
        </>
      );
    },
    headerText: defaultHeaderText,
    subHeaderText: defaultSubHeaderText,
    ShowProgressSteps: true,
  },
  budget: {
    Component: Histogramme,
    Header: () => {
      const router = useRouter();

      return !router.pathname.includes('guidedstart') ? (
        <Header title={defaultHeaderText} subTitle={defaultSubHeaderText} />
      ) : null;
    },
    SubHeader: () => {
      const router = useRouter();
      return (
        <>
          {!router.pathname.includes('guidedstart') && <ProgressSteps Icons={stepsIcons} activeIcon={3} />}
          <div
            className=" font-circular font-medium text-gray-blue text-26px lg:text-36px "
            style={{
              letterSpacing: '-0.03',
              lineHeight: '1.2em',
              marginTop: router.pathname.includes('guidedstart') ? '46px' : '26px',
              marginBottom: '35px',
            }}>
            What is your budget for rent per month?
          </div>
        </>
      );
    },
    headerText: defaultHeaderText,
    subHeaderText: defaultSubHeaderText,
    ShowProgressSteps: true,
  },
  calendar: {
    Component: CalendarWidget,
    Header: () => {
      const router = useRouter();

      return !router.pathname.includes('guidedstart') ? (
        <Header title={defaultHeaderText} subTitle={defaultSubHeaderText} />
      ) : null;
    },
    SubHeader: () => {
      const router = useRouter();
      return (
        <>
          {!router.pathname.includes('guidedstart') && <ProgressSteps Icons={stepsIcons} activeIcon={4} />}
          <div
            className=" font-circular font-medium text-gray-blue text-26px lg:text-36px "
            style={{
              letterSpacing: '-0.03',
              lineHeight: '1.2em',
              marginTop: router.pathname.includes('guidedstart') ? '46px' : '26px',
              marginBottom: '35px',
            }}>
            When are you planning to move?
          </div>
        </>
      );
    },
    headerText: defaultHeaderText,
    subHeaderText: defaultSubHeaderText,
    ShowProgressSteps: true,
  },
  specialist: {
    Component: Specialist,
    SubHeader: () => {
      const router = useRouter();
      return (
        <>
          <div
            className={` font-circular font-medium text-gray-blue text-26px ${
              router.pathname.includes('guidedstart') ? 'mbp:mt-10 mt-12' : 'mbp:mt-32 mt-12'
            } lg:text-36px `}
            style={{ letterSpacing: '-0.03', lineHeight: '1.2em' }}>
            Great!
          </div>
          <div
            className=" font-circular font-medium text-gray-blue text-26px lg:text-36px "
            style={{ letterSpacing: '-0.03', lineHeight: '1.2em', marginBottom: '35px' }}>
            Sit back and relax, our Specialist will connect with you 😊
          </div>
        </>
      );
    },
    headerText: defaultHeaderText,
    subHeaderText: defaultSubHeaderText,
  },
};
