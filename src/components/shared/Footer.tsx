import { nextApi } from '@utils/http';
import React, { useState } from 'react';
import * as keyCode from 'keycode-js';
import { useErrors } from '@hooks/errors';
import { MediumText, Text } from '@components/shared/ResponsiveFonts';
import { FacebookGreenIcon, InstagramGreenIcon, RightArrowIcon, TwitterGreenIcon } from '@components/shared/Icons';
import { B2 } from '@components/shared/Typography';

const Footer = () => {
  const { addError } = useErrors();
  const [email, setEmail] = useState('');
  const [ifSubscribed, updateSubscribedState] = useState(false);

  const validateEmail = (str: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(str);
  };
  const submitSubscribeRequest = async () => {
    if (validateEmail(email)) {
      // hide backend API address from public
      const { status } = await nextApi.post('/self/subscribe', {
        email,
      });
      if (status === 200) {
        updateSubscribedState(true);
      }
    }
  };
  const updateEmail = (el: any) => {
    /**
     * Return Key
     * keyCode = 13
     * KeyText = "Enter"
     */
    if (el.keyCode === keyCode.KEY_RETURN) {
      submitSubscribeRequest().catch(addError);
      return;
    }
    setEmail(el.target.value);
  };
  return (
    <footer
      className="bg-white mb-8 text-black sm:pt-16 pt-0 pb-8 px-0 font-circular overflow-hidden"
      style={{
        borderTop: '1px solid rgba(0,0,0,.1)',
      }}
    >
      <div className="mx-auto flex flex-col sm:flex-row block max-w-screen-xl">
        <div className="sm:w-2/5 mx-auto justify-center block sm:pb-0 pb-0 px-5 sm:text-left text-left order-last sm:order-first flex flex-col w-full">
          <div className="block">
            <a href="/" className="block mb-6">
              <img
                src="/static/assets/Icons/logo.svg"
                width="160px"
                height="50px"
                className="sm:mx-0 mx-0 object-contain"
                alt="logo"
              />
            </a>
            <MediumText
              textColorClass="text-gray-template"
              fontSizeClass="text-18px"
              fontWeightClass="font-normal"
              otherClasses="py-2"
              customTag="p"
            >
              Lighthouse Financial Technologies, Inc. {new Date().getFullYear()}
            </MediumText>
          </div>
          <div className="border-t sm:border-none order-first" />
          <div
            className="block pt-5 mt-10 sm:mt-5 md:mb-10 mb-10  w-full md:mx-0 mx-0 order-first sm:order-last"
            style={{ height: '64px', width: '220px' }}
          >
            <div className="flex justify-start md:justify-start w-full">
              <a href="http://www.facebook.com/lighthouse.rewards" target="_blank" className="pr-4">
                <FacebookGreenIcon width="64" height="64" />
              </a>
              <a href="https://www.twitter.com/lighthouse_apts" target="_blank" className="pr-4">
                <TwitterGreenIcon width="64" height="64" />
              </a>
              <a href="https://instagram.com/lighthouse_apts" target="_blank" className="pr-4">
                <InstagramGreenIcon width="64" height="64" />
              </a>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-wrap text-sm md:mt-0 laptop-md:ml-0 ml-4 text-black pt-10 pb-16 sm:pt-0 sm:pb-0">
          <ul className="text-black list-none p-0 flex flex-col text-left w-full xl:w-3/12 lg:w-3/12 md:w-3/12 sm:w-6/12 w-6/12 order-2 sm:order-none pb-5 sm:pb-0">
            <li className="inline-block pb-3 mb-6 sm:pb-0 flex justify-between items-center pr-10 sm:block">
              <Text
                fontSizeClass="text-18px sm:text-18px"
                textColorClass="text-black"
                otherClasses="tracking-wide py-2 px-0 sm:px-3"
              >
                Learn
              </Text>
            </li>
            <li className="hidden sm:block">
              <a href="/learn" className="inline-block">
                <MediumText
                  textColorClass="text-gray-template"
                  textHoverClass="hover:text-black"
                  fontWeightClass="font-normal"
                  fontSizeClass="text-18px"
                  otherClasses="py-2 px-0 sm:px-3"
                  customTag="p"
                >
                  How it works
                </MediumText>
              </a>
            </li>
            <li className="hidden sm:block">
              <a href="/faq" className="inline-block">
                <MediumText
                  textColorClass="text-gray-template"
                  textHoverClass="hover:text-black"
                  fontSizeClass="text-18px"
                  fontWeightClass="font-normal"
                  otherClasses="py-2 px-0 sm:px-3"
                  customTag="p"
                >
                  FAQ
                </MediumText>
              </a>
            </li>
            <div
              className="block sm:hidden"
              style={{
                height: 'auto',
                opacity: '1',
                lineHeight: 'unset',
              }}
            >
              <li>
                <a href="/learn" className="inline-block">
                  <MediumText
                    textColorClass="text-gray-template"
                    textHoverClass="hover:text-black"
                    fontWeightClass="font-normal"
                    otherClasses="py-2 px-0 sm:px-3"
                    customTag="p"
                  >
                    How it works
                  </MediumText>
                </a>
              </li>
              <li>
                <a href="/faq" className="inline-block">
                  <MediumText
                    textColorClass="text-gray-template"
                    textHoverClass="hover:text-black"
                    fontWeightClass="font-normal"
                    otherClasses="py-2 px-0 sm:px-3"
                    customTag="p"
                  >
                    FAQ
                  </MediumText>
                </a>
              </li>
            </div>
          </ul>
          <ul className="text-gray-700 list-none p-0 flex flex-col text-left w-full xl:w-3/12 lg:w-3/12 md:w-3/12 sm:w-6/12 w-6/12 order-2 sm:order-none pb-5 sm:pb-0">
            <li className="inline-block pb-3  mb-6 sm:pb-0 flex justify-between items-center pr-10 sm:block">
              <Text
                fontSizeClass="text-18px sm:text-18px"
                textColorClass="text-black"
                otherClasses="tracking-wide py-2 px-0 sm:px-3"
              >
                Company
              </Text>
            </li>
            <li className="hidden sm:block">
              <a href="/about" className="inline-block">
                <MediumText
                  textColorClass="text-gray-template"
                  textHoverClass="hover:text-black"
                  fontSizeClass="text-18px"
                  fontWeightClass="font-normal"
                  otherClasses="py-2 px-0 sm:px-3"
                  customTag="p"
                >
                  About us
                </MediumText>
              </a>
            </li>
            <li className="hidden sm:block">
              <a href="/careers" className="inline-block">
                <MediumText
                  textColorClass="text-gray-template"
                  textHoverClass="hover:text-black"
                  fontSizeClass="text-18px"
                  fontWeightClass="font-normal"
                  otherClasses="py-2 px-0 sm:px-3"
                  customTag="p"
                >
                  Careers
                </MediumText>
              </a>
            </li>
            <li className="hidden sm:block">
              <a href="/privacy" className="inline-block ">
                <MediumText
                  textColorClass="text-gray-template"
                  textHoverClass="hover:text-black"
                  fontSizeClass="text-18px"
                  fontWeightClass="font-normal"
                  otherClasses="py-2 px-0 sm:px-3"
                  customTag="p"
                >
                  Privacy
                </MediumText>
              </a>
            </li>
            <li className="hidden sm:block">
              <a href="/terms" className="inline-block">
                <MediumText
                  textColorClass="text-gray-template"
                  textHoverClass="hover:text-black"
                  fontSizeClass="text-18px"
                  fontWeightClass="font-normal"
                  otherClasses="py-2 px-0 sm:px-3"
                  customTag="p"
                >
                  Terms of Service
                </MediumText>
              </a>
            </li>
            <div
              className="block sm:hidden"
              style={{
                height: 'auto',
                opacity: '1',
                lineHeight: 'unset',
              }}
            >
              <li>
                <a href="/about" className="inline-block">
                  <MediumText
                    textColorClass="text-gray-template"
                    textHoverClass="hover:text-black"
                    fontWeightClass="font-normal"
                    otherClasses="py-2 px-0 sm:px-3"
                    customTag="p"
                  >
                    About us
                  </MediumText>
                </a>
              </li>
              <li>
                <a href="/careers" className="inline-block">
                  <MediumText
                    textColorClass="text-gray-template"
                    textHoverClass="hover:text-black"
                    fontWeightClass="font-normal"
                    otherClasses="py-2 px-0 sm:px-3"
                    customTag="p"
                  >
                    Careers
                  </MediumText>
                </a>
              </li>
              <li>
                <a href="/privacy" className="inline-block ">
                  <MediumText
                    textColorClass="text-gray-template"
                    textHoverClass="hover:text-black"
                    fontWeightClass="font-normal"
                    otherClasses="py-2 px-0 sm:px-3"
                    customTag="p"
                  >
                    Privacy
                  </MediumText>
                </a>
              </li>
              <li>
                <a href="/terms" className="inline-block">
                  <MediumText
                    textColorClass="text-gray-template"
                    textHoverClass="hover:text-black"
                    fontWeightClass="font-normal"
                    otherClasses="py-2 px-0 sm:px-3"
                    customTag="p"
                  >
                    Terms of Service
                  </MediumText>
                </a>
              </li>
            </div>
          </ul>
          <ul className="text-black list-none p-0 flex flex-col text-left w-full xl:w-2/12 lg:w-2/12 md:w-2/12 sm:w-6/12 w-6/12 order-2 sm:order-none pb-5 sm:pb-0">
            <li className="inline-block pb-3  mb-6 sm:pb-0 pr-10 flex justify-between items-center sm:block">
              <Text
                fontSizeClass="text-18px sm:text-18px"
                textColorClass="text-black"
                otherClasses="tracking-wide py-2 px-0 sm:px-3"
              >
                Explore
              </Text>
            </li>
            <li className="hidden sm:block">
              <a href="/start" className="inline-block">
                <MediumText
                  textColorClass="text-gray-template"
                  fontSizeClass="text-18px"
                  textHoverClass="hover:text-black"
                  fontWeightClass="font-normal"
                  otherClasses="py-2 px-0 sm:px-3"
                  customTag="p"
                >
                  Get Started
                </MediumText>
              </a>
            </li>
            {/* <li className="hidden sm:block">
              <a href="https://blog.lighthouse.app" target="_blank" rel="noreferrer" className="inline-block">
                <MediumText
                  textColorClass="text-gray-template"
                  textHoverClass="hover:text-black"
                  fontSizeClass="text-18px"
                  fontWeightClass="font-normal"
                  otherClasses="py-2 px-0 sm:px-3"
                  customTag="p"
                >
                  Blog
                </MediumText>
              </a>
            </li> */}
            <div
              className="block sm:hidden"
              style={{
                height: 'auto',
                opacity: '1',
                lineHeight: 'unset',
              }}
            >
              <li>
                <a href="/start" className="inline-block">
                  <MediumText
                    textColorClass="text-gray-template"
                    textHoverClass="hover:text-black"
                    fontWeightClass="font-normal"
                    otherClasses="py-2 px-0 sm:px-3"
                    customTag="p"
                  >
                    Get Started
                  </MediumText>
                </a>
              </li>
              <li>
                <a href="https://blog.lighthouse.app" target="_blank" rel="noreferrer" className="inline-block">
                  <MediumText
                    textColorClass="text-gray-template"
                    textHoverClass="hover:text-black"
                    fontWeightClass="font-normal"
                    otherClasses="py-2 px-0 sm:px-3"
                    customTag="p"
                  >
                    Blog
                  </MediumText>
                </a>
              </li>
            </div>
          </ul>

          <div className="text-black flex flex-col xl:w-4/12 lg:w-4/12 sm:w-6/12 w-full md:py-0 py-5 pb-10 sm:pb-0">
            <div>
              <Text
                fontSizeClass="text-18px sm:text-18px"
                textColorClass="text-black"
                otherClasses="tracking-wide py-2 px-0"
              >
                Subscribe
              </Text>
            </div>
            <div className="flex mt-6 pl-0 pr-8 w-full pb-1">
              {ifSubscribed && <Text textColorClass="text-black">Successfully subscribed!</Text>}
              {!ifSubscribed && (
                <div className="bg-white w-full">
                  <div
                    className="flex w-full  sm:pr-0 pr-0 relative"
                    style={{ border: '1px solid #F1F1F1', borderRadius: '2px', zIndex: 0 }}
                  >
                    <input
                      aria-label="email"
                      id="emailInp"
                      type="email"
                      className="sm:pl-2 pl-1 appearance-none text-gray text-16px focus:outline-none w-full sm:hidden block p-2 font-circular placeholder-current"
                      placeholder="Enter your email"
                      defaultValue={email}
                      style={{ height: 40, width: 300 }}
                      onKeyUp={(el: any) => updateEmail(el)}
                    />
                    <input
                      aria-label="email"
                      id="emailInpLg"
                      type="email"
                      className=" sm:pl-2 pl-1 appearance-none text-gray sm:text-md text-18px focus:outline-none w-full sm:block hidden font-circular placeholder-current"
                      placeholder="Enter your email"
                      defaultValue={email}
                      style={{ height: 40 }}
                      onKeyUp={(el: any) => updateEmail(el)}
                    />
                    <button
                      type="button"
                      onClick={() => submitSubscribeRequest().catch(addError)}
                      className="w-12/12 pr-2 text-sm bg-white font-semibold uppercase lg:w-auto text-primary"
                      style={{
                        position: 'absolute',
                        right: 5,
                        top: '50%',
                        transform: 'translateY(-50%)',
                      }}
                    >
                      <div
                        className="block text-primary"
                        style={{ width: '24px', color: '#34966D', height: '24px', paddingTop: 2 }}
                      >
                        <RightArrowIcon />
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto block max-w-screen-xl">
        <div className="flex mt-10 pl-5">
          <a href="/static/assets/files/IABS 1-0.pdf" target="_blank">
            <B2 weight="font-bold">TREC Info About Brokerage Services</B2>
          </a>
          <span style={{ width: 1, marginInline: 10, background: '#2A343A', opacity: 0.2 }} />
          <a href="/static/assets/files/Consumer-Protection-Notice.pdf" target="_blank">
            <B2 weight="font-bold">TREC Consumer Protection Notice</B2>
          </a>
        </div>
        <p className="pl-5 text-left text-12px text-gray font-normal font-circular mt-6 w-12/12 mx-auto justify-start">
          LFT Insurance Services, Inc. is a licensed insurance agency in the states that it sells policies in California
          and Texas.
        </p>
        <p className="pl-5 pr-10 text-left text-12px text-gray font-normal font-circular w-12/12 mx-auto justify-start">
          Insurance is underwritten by Markel American Insurance Company and produced by LFT Insurance Services, Inc.
          LFT Insurance Services, Inc. receives compensation based on the premiums for the insurance policies it sells.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
