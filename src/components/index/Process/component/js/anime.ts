/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import anime from 'animejs';
import { scrollTrigger, isElementPartiallyInViewport, isScrolledIntoView } from '@utils/scroll-utils';

(anime as any).suspendWhenDocumentHidden = false;

export const parseHTML = (html: any): any => {
  const t = document.createElement('template');
  t.innerHTML = html;
  return t.content.cloneNode(true);
};
export function parseSVG(s: any): any {
  const div: any = document.createElementNS(
    'http://www.w3.org/1999/xhtml',
    'div',
  );
  div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg">${s}</svg>`;
  const frag = document.createDocumentFragment();
  while (div.firstChild.firstChild) frag.appendChild(div.firstChild.firstChild);
  return frag;
}
export function windowAnimation(): any {
  const animation = () => {
    const earningContainer: any = document.querySelector('svg.earning-house .earning-cashback-container');
    const fullVisible: any = isScrolledIntoView('.earning-house-container .earning-house');
    const partialVisible: any = isElementPartiallyInViewport('.earning-house-container .earning-house');
    if (partialVisible && !fullVisible) {
      earningContainer.classList.remove('isThree');
      earningContainer.classList.add('isTwo');
    }
    if (fullVisible) {
      earningContainer.classList.add('isThree');
    }
    if (!partialVisible && !fullVisible) {
      earningContainer.classList.remove('isTwo');
      earningContainer.classList.remove('isThree');
    }
  };
  document.addEventListener('scroll', animation, true);
  animation();
}
export const apartmentAnimation = (): void => {
  scrollTrigger('svg.house', () => {
    anime({
      targets: 'svg.house g.searchLine',
      delay: (el, i) => i * 450,
      easing: 'easeOutExpo',
      transform: ['translate(0, 0)'],
      opacity: 1,
      suspendWhenDocumentHidden: false,
    });
  });
};
export const buildingAnimation = (): void => {
  scrollTrigger('svg.street-light-house', () => {
    anime({
      targets: 'svg.street-light-house g.street-light-line',
      delay: (el, i) => i * 450,
      easing: 'easeOutExpo',
      transform: ['translate(0, 0)'],
      opacity: 1,
      suspendWhenDocumentHidden: false,
    });
  });
};

export const animateAll = (): void => {
  apartmentAnimation();
  buildingAnimation();
  windowAnimation();
};
