import lottie from 'lottie-web';
import Insurance from '@tracking/Insurance';

import { useEffect, useState } from 'react';
import AuthPopup from '@components/authPopup';
import { steps } from '@components/auth/Steps';

const headerText = 'Add your first insurance policy';
const subHeaderText = 'Choose what you need, avoid what you don’t.';

steps.phone = { ...steps.phone, headerText, subHeaderText };
steps.email = { ...steps.email, headerText, subHeaderText };
steps.otp = { ...steps.otp, headerText, subHeaderText };

export default function InsuranceLandingPage() {
  const [iconsLoaded, setIconsLoaded] = useState(false);

  const loadIconAnimations = () => {
    const iconEdit = document.getElementById('icon__edit');
    const iconLayers = document.getElementById('icon__layers');
    const iconCoins = document.getElementById('icon__coins');

    lottie.loadAnimation({
      container: iconEdit, // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/static/assets/animations/edit.json', // the path to the animation json
    });

    lottie.loadAnimation({
      container: iconLayers, // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/static/assets/animations/layers.json', // the path to the animation json
    });

    lottie.loadAnimation({
      container: iconCoins, // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/static/assets/animations/coins.json', // the path to the animation json
    });
    setIconsLoaded(true);
  };

  useEffect(() => {
    Insurance.pageLoaded();
  }, []);

  useEffect(() => {
    if (!iconsLoaded) {
      loadIconAnimations();
    }
  }, [iconsLoaded]);

  return (
    <div className="o-landing-page">
      <section className="o-landing-page__hero-section pt-10">
        <div className="o-landing-page__hero-section-content">
          <div className="o-landing-page__hero-copy">
            <h1>Renters insurance designed for you</h1>
            <p>
              Experience shelter from the storm with Lighthouse. Get the affordable renter coverage you need, within
              minutes, and be on your way.
            </p>

            <AuthPopup
              wizardSteps={steps}
              onClick={(e) => {
                Insurance?.addPolicyClicked();
                setTimeout(() => {
                  window.location.replace('/account/insurance');
                }, 500);
              }}>
              <button type="button" className="o-btn o-btn--primary o-card__add-item-button">
                <img src="/static/assets/Icons/plus_white.svg" alt="plus" /> Add a policy
              </button>
            </AuthPopup>
          </div>
          <div className="o-landing-page__hero-image">
            <img src="/static/assets/images/insurance-landing-page-hero.svg" alt="hero" />
          </div>
        </div>
      </section>
      <section className="o-landing-page__benefits-section">
        <div className="o-landing-page__card">
          <div id="icon__edit" className="o-animated-icon" />
          <h2>Easy digital platform</h2>
          <p>Select, purchase, change, update, claim, or cancel your policy through our online portal</p>
        </div>
        <div className="o-landing-page__card">
          <div id="icon__layers" className="o-animated-icon" />
          <h2>Flexible coverage</h2>
          <p>Choose what you need, and avoid what you don’t</p>
        </div>
        <div className="o-landing-page__card">
          <div id="icon__coins" className="o-animated-icon" />
          <h2>Cheaper insurance options</h2>
          <p>Saving you money is in our DNA. We started this program to give you an affordable selection of policies</p>
        </div>
      </section>
    </div>
  );
}
