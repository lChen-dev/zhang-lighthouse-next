/* eslint-disable prefer-const */
/* eslint-disable no-lonely-if */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-named-as-default */

import { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { ArrowLeft, ArrowRight } from '@components/shared/Icons';
import { sentryCaptureException } from '@utils/sentry';
import Testimonials from './TrustPilotSlides';

export const SliderConfig = {
  showArrows: false,
  showStatus: false,
  showIndicators: false,
  infiniteLoop: true,
  autoPlay: false,
  swipeable: false,
  dynamicHeight: true,
  emulateTouch: false,
  showThumbs: false,
  animationDuration: 500,
  autoHeight: false,
  disableDotsControls: true,
  mouseTracking: false,
  touchTracking: false,
  disableButtonsControls: true,
};

export const TrustPilotSlider = () => {
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
        } else {
          if (activeIndex <= 0) {
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
        }
      } catch (error) {
        sentryCaptureException({
          info: 'trust pilot slider prev is not working',
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
        } else {
          if (activeIndex <= 0) {
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
        }
      } catch (error) {
        sentryCaptureException({
          info: 'trust pilot slideNext is not working',
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
    <>
      <div className="absolute flex top-0 right-0 z-50 rounded-md slider-control-container">
        <div className={`slider-control-block-box ${controlLeft ? 'active' : ''}`} onClick={prevSlide}>
          <ArrowLeft />
        </div>
        <div className={`slider-control-block-box ${controlRight ? 'active' : ''}`} onClick={nextSlide}>
          <ArrowRight />
        </div>
      </div>
      <AliceCarousel
        {...SliderConfig}
        ref={(el: any) => {
          if (el !== null) {
            Carousel = el;
          }
        }}
        activeIndex={currentIndex}
        onSlideChanged={onSlideChanged}
        onSlideChange={onSlideChanged}
        items={Testimonials}
      />
    </>
  );
};

export default TrustPilotSlider;
