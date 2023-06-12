/* eslint-disable prefer-destructuring */

import { sentryCaptureException } from './sentry';

function getElement(el: any): Element {
  let element: any = typeof el === 'string' ? document.querySelector(el) : el;
  if (typeof (window as any).jQuery !== 'undefined' && el instanceof (window as any).jQuery) element = element[0];
  return element;
}

// when element is fully visible and inside viewport
export function isElementInViewport(el: any, error?: any): any {
  try {
    const element = getElement(el);
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;

    return (
      rect.left >= 0 && rect.top >= 0 && rect.left + rect.width <= windowWidth && rect.top + rect.height <= windowHeight
    );
  } catch (e) {
    if (error) error(e);
    return false;
  }
}

// element doesn't have to be in the viewport, just at scroll level to trigger it
export function isScrolledIntoView(el?: any): boolean {
  try {
    const element = getElement(el);
    const rect = element.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = rect.bottom;

    // Only completely visible elements return true:
    let isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
    // Partially visible elements return true:
    isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
  } catch (error) {
    return false;
  }
}

// when element is partially in viewport
export function isElementPartiallyInViewport(el: any, error?: any): any {
  try {
    const element = getElement(el);
    const rect = element.getBoundingClientRect();

    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;

    const vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
    const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;

    return vertInView && horInView;
  } catch (e) {
    if (error) error(e);
    return false;
  }
}

export function scrollTrigger(el: any, callback: any, DomElement = false): any {
  try {
    const element: any = typeof el === 'string' ? document.querySelector(el) : el;
    if (!element.classList.toString().includes('scrollActive')) {
      if (typeof callback === 'function') {
        let innerTimerArray: any = null;
        let binded: any = false;
        const exec = () => {
          clearTimeout(innerTimerArray);
          if (!binded) {
            innerTimerArray = setTimeout(() => {
              if (isScrolledIntoView(el)) {
                callback();
                binded = true;
              }
            }, 100);
          }
        };
        document.removeEventListener('scroll', exec, true);
        document.addEventListener('scroll', exec, true);
        exec();
        element.classList.add('scrollActive');
      }
      if (typeof callback === 'object' && Array.isArray(callback) && callback.length > 0) {
        const innerTimerArray: any = [null];
        callback.map((events, i) => {
          const exec = () => {
            clearTimeout(innerTimerArray[i]);
            innerTimerArray[i] = setTimeout(() => {
              if (isScrolledIntoView(element)) {
                events();
              }
            }, 100);
          };
          document.removeEventListener('scroll', exec, true);
          document.addEventListener('scroll', exec, true);
          exec();
        });
        // Array.from(el).map((e) => e && e.classList.add('scrollActive'));
      }
    }
  } catch (error) {
    sentryCaptureException({
      info: 'scroll trigger failed to execute',
      error,
      data: { el },
    });
  }
}

export function doScrolling(scrollY = 0, duration = 200): null {
  const startingY = window.pageYOffset;
  const diff = scrollY - startingY;
  let start: any;
  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const percent = Math.min(time / duration, 1);
    window.scrollTo(0, startingY + diff * percent);
    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  });
  return null;
}
