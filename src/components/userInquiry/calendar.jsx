import React, { useEffect, useState } from 'react';
import './calendar.css';
import Calendar from 'react-calendar';
import { ResetDarkSVG, ToTheRightArrowSVG } from '@components/shared/Icons';
import DatePicker from 'react-mobile-datepicker';
import './styles.css';

const monthMap = {
  '1': 'Jan',
  '2': 'Feb',
  '3': 'Mar',
  '4': 'Apr',
  '5': 'May',
  '6': 'Jun',
  '7': 'Jul',
  '8': 'Aug',
  '9': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec',
};
function CalendarWidget({
  getData,
  saveData,
  nextStep,
  prevStep,
  sendTrack,
  toast,
  setNextStep,
  updateCompletedSteps,
  stepId,
}) {
  const [date, setDate] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());

  const displayValue = (value) => {
    return `${value.toLocaleString('en-us', { month: 'short' })} ${value.getDate()}, ${value.getFullYear()}`;
  };
  useEffect(() => {
    sendTrack('Guided Visit form step loaded', { Step: 'MoveInDate' });
    const modalElement = document.getElementsByClassName('datepicker')[0];
    modalElement.classList.add('custom-wheel');
    const captionElement = document.getElementsByClassName('datepicker-caption')[0];
    captionElement.classList.add('wheel-hide-caption');
    const scrollElements = document.getElementsByClassName('datepicker-scroll');
    for (const el of scrollElements) {
      el.classList.add('custom-datepicker-scroll');
      el.classList.add('custom-viewport');
    }
    const vpElements = document.getElementsByClassName('datepicker-viewport');
    for (const el of vpElements) {
      el.classList.add('custom-viewport');
    }

    const colElements = document.getElementsByClassName('datepicker-col-1');
    for (const el of colElements) {
      el.classList.add('no-margin-wheel');
    }
    const wElements = document.getElementsByClassName('datepicker-wheel');
    for (const el of wElements) {
      el.classList.add('new-color-wheel');
    }
  }, []);

  return (
    <div className="w-full mbp:w-368px">
      <div className="mbp:hidden block  relative">
        <div
          className="absolute top-0 right-0 transform z-auto  bg-gray-lighter pt-1 rounded-l-md pl-1 text-20px font-bold  font-circular  h-full w-20 align-middle my-auto"
          style={{ height: '38px', transform: 'translate(53px,119px)' }}>
          {date.toLocaleDateString('en-us', { weekday: 'short' })}
        </div>
        <DatePicker
          min={new Date()}
          max={new Date(new Date().setFullYear(new Date().getFullYear() + 10))}
          isOpen={true}
          isPopup={false}
          showCaption={true}
          onChange={(e) => setDate(e)}
          showHeader={false}
          showFooter={false}
          value={date}
          dateConfig={{
            date: {
              format: 'DD',
              caption: 'Day',
              step: 1,
            },
            month: {
              format: (value) => monthMap[value.getMonth() + 1],
              caption: 'Mon',
              step: 1,
            },
            year: {
              format: 'YYYY',
              caption: 'Year',
              step: 1,
            },
          }}
        />
      </div>
      <Calendar
        className="border-none hidden mbp:block   border-0"
        activeStartDate={activeStartDate}
        onActiveStartDateChange={({ activeStartDate, value, view }) => {
          saveData({ moveInDate: activeStartDate });
          setActiveStartDate(activeStartDate);
        }}
        value={date}
        onChange={setDate}
        navigationLabel={({ date, label, locale, view }) =>
          `${date.toLocaleString(locale, { month: 'short' })} ${date.getFullYear()}`
        }
        minDate={new Date()}
      />
      <div
        class="hidden mbp:block h-auto w-full rounded-lg font-circular border-gray-light relative  border mt-4"
        style={{ lineHeight: '24px' }}>
        <div class=" mt-3 mb-3 ml-6 text-16px font-normal pr-10" style={{ lineHeight: '24px' }}>
          I am moving on <span class="font-bold  text-20px">{displayValue(date)}</span>
        </div>
        <div className="absolute h-full top-0 right-0 flex justify-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              setDate(new Date());
              setActiveStartDate(new Date());
            }}
            class=" outline-none focus:outline-none  mr-5 ">
            <ResetDarkSVG />
          </button>
        </div>
      </div>
      <button
        type="button"
        style={{ marginTop: '14px' }}
        className={`w-full h-15 mb-16 mbp:mb-0 flex flex-row flex-no-wrap rounded outline-none focus:outline-none font-circular justify-center items-center bg-brand`}
        onClick={() => {
          sendTrack('Guided Visit form step', { Step: 'MoveInDate', data: { moveInDate: date } });
          setNextStep('specialist');
          saveData({ moveInDate: date });
          updateCompletedSteps(stepId);
        }}>
        <span className="w-32 font-bold font-circular text-lg text-white">Next step</span>
        <div className=" my-auto font-bold text-lg">
          <ToTheRightArrowSVG />
        </div>
      </button>
    </div>
  );
}

export default CalendarWidget;
