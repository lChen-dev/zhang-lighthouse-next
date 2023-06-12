/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
import anime from 'animejs';
import { scrollTrigger } from '@utils/scroll-utils';

(anime as any).suspendWhenDocumentHidden = false;

const bounceEffect = [
  { value: 0.9, easing: 'easeInSine', duration: 150 },
  { value: 1, easing: 'easeOutSine', duration: 200 },
];

const flow = [
  { type: 'initiate', delay: 2500 },
  { text: '-$1,500', delay: 1000, type: 'rent' },
  { text: '+$75', delay: 1000, keep: true, type: 'cashback' },
  { text: '-$1,500', delay: 1000, type: 'rent' },
  { text: '+$150', delay: 1000, keep: true, type: 'cashback' },
  { text: '-$1,500', delay: 800, type: 'rent' },
  { text: '-$1,500', delay: 800, type: 'rent' },
  { text: '-$1,500', delay: 800, type: 'rent' },
  { text: '+$225', delay: 500, keep: true, type: 'cashback' },
  { text: '+$300', delay: 500, keep: true, type: 'cashback' },
  { text: '+$375', delay: 500, keep: true, type: 'cashback' },
  { type: 'reset', delay: 3000 },
];

// Timeouts
let waitTimeout: NodeJS.Timeout;
let boxTopTimeout: NodeJS.Timeout;
let boxBotTimeout: NodeJS.Timeout;
let lDotTimeout: NodeJS.Timeout;
let rDotTimeout: NodeJS.Timeout;
let resetTimeout: NodeJS.Timeout;

export const waitFor = (ms = 1000): Promise<any> =>
  new Promise((resolve: any) => {
    waitTimeout = setTimeout(() => resolve(true), ms);
  });

const runFor = 2; // setting to null will keep it running
let ranFor = 1;
export async function animateCashbackFlow(
  data = {
    rightDot: '.sep-right .dot',
    leftDot: '.sep-left .dot',
    boxTop: '.box.top',
    boxBottom: '.box.bottom',
    leftLine: '.sep-left .line',
    rightLine: '.sep-right .line',
    leftSep: '.sep-left',
    rightSep: '.sep-right',
  },
) {
  const $e: any = (e: any) => document.querySelector(e);
  const $c: any = (html: any) => {
    const t = document.createElement('template');
    t.innerHTML = html;
    return t.content.cloneNode(true);
  };
  const { rightDot, leftDot, boxTop, boxBottom, leftLine, rightLine, leftSep, rightSep } = data;
  const leftSepEl = $e(leftSep);
  const rightSepEl = $e(rightSep);
  const rightDotEl = $e(rightDot);
  const leftDotEl = $e(leftDot);
  const boxTopEl = $e(boxTop);
  const boxBottomEl = $e(boxBottom);
  const leftLineEl = $e(leftLine);
  const rightLineEl = $e(rightLine);

  const bounceHouse = {
    targets: boxTop,
    scale: bounceEffect,
    easing: 'easeInBack',
    suspendWhenDocumentHidden: false,
  };
  const bounceCard = {
    targets: boxBottom,
    scale: bounceEffect,
    easing: 'easeInBack',
    suspendWhenDocumentHidden: false,
    update: () => {
      boxBottomEl.classList.add('active');
    },
  };
  const initiate = () => {
    const lineLeft = anime({
      targets: leftLine,
      height: '170px',
      easing: 'easeInOutQuad',
      delay: 2000,
      suspendWhenDocumentHidden: false,
    });
    const lineRight = anime({
      targets: rightLine,
      height: '170px',
      easing: 'easeInOutQuad',
      delay: 2000,
      suspendWhenDocumentHidden: false,
    });
  };
  let completed: any = false;
  for (const [key, action] of flow.entries()) {
    if (completed) {
      // eslint-disable-next-line no-continue
      continue;
    }
    const { type, text, delay, keep } = action;
    if (type === 'initiate') {
      initiate();
    }
    if (type === 'rent') {
      const oldLeftDot = $e(leftDot).outerHTML;
      let newLeftDot = $c(oldLeftDot);
      newLeftDot = newLeftDot.querySelector('.dot');
      newLeftDot.setAttribute('id', `left_dot_${key}`);
      leftSepEl.appendChild(newLeftDot);
      const rent = anime({
        targets: `#left_dot_${key}`,
        bottom: '170px',
        easing: 'easeOutQuint',
        delay: delay || 0,
        suspendWhenDocumentHidden: false,
        begin: () => {
          if (!keep) {
            boxTopEl.classList.remove('animate');
            boxTopEl.classList.add('animateOut');
            boxTopTimeout = setTimeout(() => {
              boxTopEl.classList.remove('animateOut');
              boxTopEl.setAttribute('data-text', '');
            }, 200);
          }
          lDotTimeout = setTimeout(() => {
            const dot = $e(`#left_dot_${key}`);
            anime(bounceHouse);
            if (dot) dot.remove();
            boxTopEl.setAttribute('data-text', text || '');
            boxTopEl.classList.add('animate');
          }, delay + 400);
        },
      });
    }
    if (type === 'cashback') {
      const oldRightDot = $e(rightDot).outerHTML;
      let newRightDot = $c(oldRightDot);
      newRightDot = newRightDot.querySelector('.dot');
      newRightDot.setAttribute('id', `right_dot_${key}`);
      rightSepEl.appendChild(newRightDot);
      anime({
        targets: `#right_dot_${key}`,
        bottom: '190px',
        easing: 'easeOutQuint',
        delay: delay || 0,
        suspendWhenDocumentHidden: false,
        begin: () => {
          if (!keep) {
            boxBottomEl.classList.remove('animate');
            boxBottomEl.classList.add('animateOut');
            boxBotTimeout = setTimeout(() => {
              boxBottomEl.classList.remove('animateOut');
              boxBottomEl.setAttribute('data-text', '');
            }, 200);
          }
          rDotTimeout = setTimeout(() => {
            anime(bounceCard);
            const dot = $e(`#right_dot_${key}`);
            if (dot) dot.remove();
            boxBottomEl.setAttribute('data-text', text || '');
            boxBottomEl.classList.add('animate');
          }, delay + 400);
        },
      });
    }
    if (type === 'reset') {
      if (runFor === null || ranFor < runFor) {
        anime({
          targets: '.sep .line',
          height: '0px',
          easing: 'easeOutQuint',
          delay: 1000,
          suspendWhenDocumentHidden: false,
          complete: () => {
            boxBottomEl.classList.remove('active');
            boxBottomEl.classList.remove('animate');
            boxBottomEl.classList.remove('animateOut');
            boxBottomEl.removeAttribute('data-text');
            boxTopEl.classList.remove('active');
            boxTopEl.classList.remove('animate');
            boxTopEl.classList.remove('animateOut');
            boxTopEl.removeAttribute('data-text');
            boxTopEl.classList.add('animate__animated');
            boxTopEl.classList.add('animate__fadeOutLeft');
            leftDotEl.style.opacity = 0;
            rightDotEl.style.opacity = 0;
            resetTimeout = setTimeout(() => {
              boxTopEl.classList.remove('animate__fadeOutLeft');
              boxTopEl.classList.add('animate__fadeInRight');
              animateCashbackFlow();

              resetTimeout = setTimeout(() => {
                boxTopEl.classList.remove('animate__animated');
                leftDotEl.style.opacity = 1;
                rightDotEl.style.opacity = 1;
              }, 800);
            }, 500);
          },
        });
        ranFor++;
      } else {
        completed = true;
      }
    }
    await waitFor(delay || 0);
  }
}

export function unmountAnimation(): void {
  clearTimeout(waitTimeout);
  clearTimeout(boxTopTimeout);
  clearTimeout(boxBotTimeout);
  clearTimeout(lDotTimeout);
  clearTimeout(rDotTimeout);
  clearTimeout(resetTimeout);
}

export default function animate(): void {
  scrollTrigger('.cashback-container.animated-cashback-container', () => {
    animateCashbackFlow();
  });
}
