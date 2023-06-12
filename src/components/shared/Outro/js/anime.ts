import anime from 'animejs';

import { scrollTrigger } from '@utils/scroll-utils';
import { numberWithCommas } from '@utils/format';

(anime as any).suspendWhenDocumentHidden = false;

export const animateTexts = (): void => {
  console.log('triggered number animation');
  scrollTrigger('.animateNumber', () => {
    Array.from(document.querySelectorAll('span.animateNumber')).map((element: any, i) => {
      let value = element.getAttribute('data-value');
      let prepend = element.getAttribute('data-prepend');
      let append = element.getAttribute('data-append');
      let comma = element.getAttribute('data-comma');
      value = parseInt(value) || 0;
      prepend = prepend || '';
      append = append || '';
      comma = typeof comma === 'boolean' ? comma : comma.toLowerCase().trim() === 'true';
      setTimeout(() => {
        let tempValue = 0;
        anime({
          targets: `.animateNumber[data-id="${i + 1}"]`,
          delay: 200,
          innerHTML: [0, value],
          round: 2,
          easing: 'easeOutExpo',
          update: () => {
            element.innerHTML = `${prepend}${comma ? numberWithCommas(tempValue) : tempValue}${append}`;
            tempValue++;
          },
          complete: () => {
            element.innerHTML = `${prepend}${comma ? numberWithCommas(value) : value}${append}`;
          },
        });
      }, 500 * i);
    });
  });
};
