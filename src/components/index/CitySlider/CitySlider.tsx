/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prefer-const */
import { Heading, BodyText } from '@components/shared/ResponsiveFonts';
import { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { sentryCaptureException } from '@utils/sentry';
import { ArrowLeft, ArrowRight } from '@components/shared/Icons';
import Slides from './component/Slides';
import './css/style.css';

const CitySlider = () => {
  let Carousel: any = { state: { activeIndex: 0, itemsCount: 0 } };
  const [state, setState] = useState({
    controlLeft: false,
    controlRight: true,
    currentIndex: 0,
  });
  const updateState = (obj: object) => setState({ ...state, ...obj });
  const prevSlide = (e: any) => {
    if (Carousel) {
      try {
        Carousel.slidePrev();
        let {
          state: { activeIndex, itemsCount },
        } = Carousel;

        activeIndex = activeIndex - 1 <= 0 ? 0 : activeIndex - 1;
        if (activeIndex > 0 && activeIndex < itemsCount - 1) {
          updateState({
            controlLeft: true,
            controlRight: true,
            currentIndex: activeIndex,
            totalSlides: itemsCount,
          });
        } else if (activeIndex <= 0) {
          updateState({
            controlLeft: false,
            controlRight: true,
            currentIndex: activeIndex,
            totalSlides: itemsCount,
          });
        } else {
          updateState({
            controlLeft: true,
            controlRight: false,
            currentIndex: activeIndex,
            totalSlides: itemsCount,
          });
        }
      } catch (error) {
        sentryCaptureException({
          info: 'unable to Carousel slidePrev',
          error,
        });
      }
    }
  };
  const nextSlide = () => {
    if (Carousel) {
      try {
        Carousel.slideNext();
        let {
          state: { activeIndex, itemsCount },
        } = Carousel;
        activeIndex = activeIndex < itemsCount - 1 ? activeIndex + 1 : itemsCount - 1;
        activeIndex = activeIndex <= 0 ? 0 : activeIndex;
        if (activeIndex > 0 && activeIndex < itemsCount - 1) {
          updateState({
            controlLeft: true,
            controlRight: true,
            currentIndex: activeIndex,
            totalSlides: itemsCount,
          });
        } else if (activeIndex <= 0) {
          updateState({
            controlLeft: false,
            controlRight: true,
            currentIndex: activeIndex,
            totalSlides: itemsCount,
          });
        } else {
          updateState({
            controlLeft: true,
            controlRight: false,
            currentIndex: activeIndex,
            totalSlides: itemsCount,
          });
        }
      } catch (error) {
        sentryCaptureException({
          info: 'unable to Carousel slideNext',
          error,
        });
      }
    }
  };
  const onSlideChanged = ({ item, isPrevSlideDisabled, isNextSlideDisabled }: any) =>
    setState({
      currentIndex: item,
      controlLeft: !isPrevSlideDisabled,
      controlRight: !isNextSlideDisabled,
    });
  const { controlLeft, controlRight, currentIndex } = state;

  return (
    <div className="w-full relative flex flex-col items-center justify-center content-center">
      <div className="z-20 pt-20 pl-18 w-full max-w-screen-xl mx-auto relative px-4 overflow-hidden">
        <div className="flex justify-between">
          <div className="block">
            <Heading
              fontSizeClass="4k:text-56px laptop:text-42px text-36px"
              textColorClass="text-black"
              otherClasses="py-10 md:text-left text-center">
              One site is all you need.
            </Heading>
            <BodyText
              fontClass="font-circular"
              fontWeightClass="font-normal"
              textColorClass="font-template"
              fontSizeClass="text-18px"
              otherClasses="block">
              Lighthouse offers wide inventory from 7,000 buildings.
            </BodyText>
          </div>
          <div className="block relative ">
            <div className="absolute hidden md:flex xl:hidden top-0 mt-10 right-0  z-50 rounded-md slider-control-container city-control">
              <div className={`slider-control-block-box ${controlLeft ? 'active' : ''}`} onClick={prevSlide}>
                <ArrowLeft />
              </div>
              <div className={`slider-control-block-box ${controlRight ? 'active' : ''}`} onClick={nextSlide}>
                <ArrowRight />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-5 flex w-11/12 max-w-screen-xl">
        <AliceCarousel
          responsive={{
            0: { items: 1 },
            650: { items: 2 },
            1008: { items: 3 },
            1324: { items: 4 },
            1350: { items: 4 },
          }}
          disableButtonsControls
          disableDotsControls
          ref={(el: any) => {
            if (el !== null) {
              Carousel = el;
            }
          }}
          mouseTracking
          activeIndex={currentIndex}
          onSlideChanged={onSlideChanged}
          onSlideChange={onSlideChanged}
          items={Slides}
        />
      </div>
    </div>
  );
};

export default CitySlider;
