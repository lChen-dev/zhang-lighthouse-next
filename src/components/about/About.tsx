/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React from 'react';

import { FloatingContainerRelative } from '@components/shared/Hero/FloatingContainer';
import Hero from '@components/about/component/Hero';
import { B1, H2 } from '@components/shared/Typography';
import { RightArrowIcon } from '@components/shared/Icons';
import ButtonCta from '@components/shared/ButtonCta';

import Profile from './component/Profile';
import Features from './component/Features';

import './css/About.css';

const userPicture = (image: string, name = '', title = ''): any => ({
  picture: require(`../../../public/static/assets/images/${image}?size=300`),
  placeholder: require(`../../../public/static/assets/images/${image}?lqip`),
  webp: require(`../../../public/static/assets/images/${image}?webp`),
  name,
  title,
});

const AboutPage = () => {
  return (
    <>
      <Hero />
      <FloatingContainerRelative bgColorClass="bg-transparent" showBoxShadow={false} showOverflow>
        <div className="laptop-md:mx-0 px-6 xl:px-0">
          <Features
            heading="Cash Flow Matters."
            subHeading="Cash matters. Gift cards and promotions aren’t effective. Renters have bills and need real cash more than anything. Cash can go towards actual expenses or directly into wealth-building."
            icon="landscape-cashback"
          />
          <Features
            heading="Renters Are Struggling to Build Wealth."
            subHeading="Wages have trailed behind rent increases for almost two decades. The cost of living is more than just headline rental prices, as fees and other necessities have also creeped up."
            icon="orange-graph"
          />
          <Features
            heading="Homeownership Is Vital."
            subHeading="Homes provide a valuable source of wealth, stability, and security. For a large portion of the population, homes are not even accessible, and has been a driver of inequality."
            icon="lighthouse-neighbourhood"
          />
          <Features
            heading="Future Enterprises Need to Be For Good."
            subHeading="For too long, companies extracted every last dollar out of their customers without giving anything back. 21st-Century corporations need to be held to a higher standard— everyone should be better off."
            icon="lighthouse-smilies"
          />
        </div>
      </FloatingContainerRelative>
      <div className="block max-w-screen-xl mx-auto pb-0 xl:px-0 px-6 mb-4">
        <div className="pb-20">
          <H2 className="mb-4">Lighthouse Is Here to Stay</H2>
          <B1 className="pr-4 block py-2" color="text-gray-soft">
            You already get cash back for everything — credit cards, gas, food, travel — why not rent? Rent is probably
            your single largest monthly expense and you&apos;ve never been rewarded for it. We sometimes joke that you
            don&apos;t even get a &ldquo;thank you&rdquo; for paying your rent on time! With too many people struggling
            to save, we think that right now is the perfect time for a new rental site that has your interest in mind.
            One that rewards you for good behavior and makes your rental experience a bit more enjoyable. That&apos;s
            why we created Lighthouse.
          </B1>
          <img className="my-4 md:my-16" src="/static/assets/images/about-div1.png" alt="room-with-pot" />
          <B1 className="pr-4 block py-2" color="text-gray-soft">
            Apartments need renters and want reliable rent payments. We make these landlords happy by delivering you— a
            responsible renter that wants to pay rent on time. As a result, Lighthouse can reward you with real,
            significant cash back and everyone wins. To top it off, we provide an unparalleled search experience with
            tailored insights, advice, and custom solutions to make the experience of renting fun, seamless, and most
            importantly stress-free.
          </B1>
          <img className="my-4 md:my-16" src="/static/assets/images/about-div2.png" alt="room-with-pot" />
          <B1 className="pr-4 block py-2" color="text-gray-soft">
            We’re just getting started with cash back. We look forward to hearing how to make the platform better and
            even more rewarding. After all, rent should be a stepping stone towards homeownership. Thanks for giving
            Lighthouse a shot.
          </B1>

          <div className="flex flex-row justify-center md:justify-start mt-6">
            <ButtonCta
              className="w-full md:w-auto justify-center"
              href="/start"
              variant="primary"
              icon={RightArrowIcon}>
              Find My Next Apartment
            </ButtonCta>
          </div>
        </div>

        <div className="block pb-20 mt-4">
          <H2 className="mb-4">Who We Are</H2>
          <B1 className="pr-4 block pb-8" color="text-gray-soft">
            We&apos;re a product-focused team ready to simplify rent
          </B1>
          <div className="block md:mx-auto">
            <div className=" w-full mx-auto flex overflow-x-auto md:flex-wrap md:justify-center md:content-center">
              <Profile bottom="-5px" left="10px" {...userPicture('Alan.png')} />
              <Profile left="10px" {...userPicture('Matt.png')} />
              <Profile bottom="-35px" left="10px" height="200px" {...userPicture('Kimmie.png')} />
              <Profile
                bottom="-32px"
                width="240px"
                height="240px"
                left="calc(50% - 100px)"
                {...userPicture('Steve.png')}
              />
              <Profile bottom="-45px" left="10px" height="220px" {...userPicture('Prachi.png')} />
              <Profile bottom="-5px" left="10px" height="190px" {...userPicture('Jack.png')} />
              <Profile bottom="-40px" width="225px" height="225px" {...userPicture('Talha.png')} />
              <Profile left="10px" {...userPicture('Will.png')} />
              <Profile {...userPicture('Azer.png')} />
              <Profile bottom="-40px" width="235px" height="235px" {...userPicture('Thom.png')} />
              <Profile bottom="-40px" width="235px" height="235px" {...userPicture('Stephanie.png')} />
              <Profile left="10px" {...userPicture('Sydney.png')} />
              <Profile bottom="-10px" left="0px" height="210px" width="210px" {...userPicture('ME.png')} />
              <Profile bottom="-30px" left="10px" height="210px" {...userPicture('Sophie.png')} />
              <Profile left="10px" {...userPicture('Lyza.png')} />
              <Profile bottom="-40px" height="210px" width="180px" {...userPicture('Cathy.png')} />
              <Profile bottom="-10px" height="200" width="160px" left="20px" {...userPicture('Dalia.png')} />
              <Profile left="10px" {...userPicture('Sara.png')} />
              <Profile bottom="-20px" left="10px" height="200px" {...userPicture('Nissa.png')} />
              <Profile left="10px" {...userPicture('Karla.png')} />
              <Profile bottom="-30px" left="10px" height="210px" {...userPicture('Ester.png')} />
              <Profile bottom="-40px" height="230px" left="10px" {...userPicture('Jane.png')} />
              <Profile bottom="-20px" left="10px" height="200px" {...userPicture('Ratt.png')} />
              <Profile bottom="-15px" height="220px" width="220px" {...userPicture('Rebecca.png')} />
              <Profile bottom="-5px" left="10px" height="190px" {...userPicture('Don.png')} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
