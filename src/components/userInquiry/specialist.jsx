import { LoadingSpinner } from '@components/shared';
import VerificationCode from '@components/shared/CodeInput/CodeInput';
import jsCookie from 'js-cookie';
import {
  CircularTickSVG,
  DoneTickSVG,
  EmailSVG,
  PhoneSVG,
  TextSVG,
  ToTheRightArrowSVG,
} from '@components/shared/Icons';
import Arcprogressbar from '@components/auth/components/arc-bar';
import { nextApi } from '@utils/http';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';
import { useAuth } from 'context/auth';
import FloatingInput from '@components/shared/FloatingInput/FloatingInput';
import { sentryCaptureException } from '@utils/sentry';

function Specialist({
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
  const [contactMethod, setContactMethod] = useState('Email');
  const [pendingOTP, setPendingOTP] = useState(false);
  const { user } = useAuth();
  const [submitReady, setSubmitReady] = useState(user?.emailVerified && user?.phoneVerified);
  const [phone, setPhone] = useState(user?.phoneNumber || '');
  const [loading, setLoading] = useState(false);
  const [OTPSuccess, setOTPSuccess] = useState(false);
  const checkSubmit = () =>
    (contactMethod === 'Email') & user.emailVerified || (contactMethod !== 'Email' && user.phoneVerified);
  const onSubmit = async () => {
    sendTrack('Guided Visit form step', { Step: 'Specialist', data: { contactStyle: contactMethod } });
    saveData({ contactStyle: contactMethod });
    setOTPSuccess(true);
    const gaUserId = jsCookie.get('ga_user') || '';
    const windowAnalytics = window.analytics;
    const meta = {
      source: jsCookie.get('utm_source') || '',
      campaign: jsCookie.get('utm_campaign') || '',
      medium: jsCookie.get('utm_medium') || '',
      content: jsCookie.get('utm_term') || '',
      userId: gaUserId,
      term: jsCookie.get('utm_term') || '',
      device: jsCookie.get('deviceInfo') || '',
      refId: jsCookie.get('utm_ref') || '',
      userIp: jsCookie.get('userIP') || '',
      anonymousId: gaUserId || windowAnalytics?.user()?.anonymousId(),
    };

    const formdata = getData();
    await nextApi.post('/kustomer/guided-search', {
      firstName: user?.givenName || '',
      lastName: user?.familyName || '',
      email: user?.email || '',
      phone,
      bedrooms: formdata?.bedrooms || '',
      moveDate: formdata?.moveInDate || '',
      budget: formdata?.budget || '',
      amenities: formdata?.amenities || '',
      city: formdata?.city,
      location: formdata?.location,
      contactStyle: contactMethod,
      previousIssues: formdata.budgetscenarios || {},
      meta,
    });
    nextApi
      .post('/inquiries/typeform', {
        firstName: user.givenName || '',
        lastName: user.familyName || '',
        email: user.email || '',
        phone,
        bedrooms: formdata?.bedrooms || '',
        moveDate: formdata?.moveInDate || '',
        budget: formdata?.budget || '',
        amenities: formdata?.amenities || '',
        city: formdata?.city,
        location: formdata?.location,
        contactStyle: contactMethod,
        previousIssues: formdata.budgetscenarios || {},
        meta,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setTimeout(() => {
      window.location.replace(`/search?city=${getData().city}`);
    }, 1500);
  };

  /*
    ______           __                      _   _      ___    _________  _______
  .' ____ \         [  |                    (_) / |_  .'   `. |  _   _  ||_   __ \
  | (___ \_|__   _   | |.--.   _ .--..--.   __ `| |-'/  .-.  \|_/ | | \_|  | |__) |
   _.____`.[  | | |  | '/'`\ \[ `.-. .-. | [  | | |  | |   | |    | |      |  ___/
  | \____) || \_/ |, |  \__/ | | | | | | |  | | | |, \  `-'  /   _| |_    _| |_
   \______.''.__.'_/[__;.__.' [___||__||__][___]\__/  `.___.'   |_____|  |_____|

  */
  const onOtpSubmit = async (code) => {
    const { methodId } = JSON.parse(window.localStorage.getItem('userOnboarding'));

    try {
      // authenticate the OTP against method
      setLoading(true);
      setPendingOTP(false);
      const { data } = await nextApi.post('/auth/authenticate_otp', { methodId, code });
      jsCookie.set(process.env.NEXT_PUBLIC_STYTCH_SESSION_COOKIE || 'lhstyssion', data.sessionToken);
      setLoading(false);
      setOTPSuccess(true);
      setTimeout(() => {
        setOTPSuccess(false);
      }, 2000);
    } catch (e) {
      sentryCaptureException({
        info: 'unable to verify OTP',
        error: {},
      });
    }
  };
  /*
    ______                        __   ___    _________  _______
  .' ____ \                      |  ].'   `. |  _   _  ||_   __ \
  | (___ \_| .---.  _ .--.   .--.| |/  .-.  \|_/ | | \_|  | |__) |
    _.____`. / /__\\[ `.-. |/ /'`\' || |   | |    | |      |  ___/
  | \____) || \__., | | | || \__/  |\  `-'  /   _| |_    _| |_
    \______.' '.__.'[___||__]'.__.;__]`.___.'   |_____|  |_____|

  */
  const sendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (contactMethod === 'Email') {
      const { data } = await nextApi.post('/auth/verify_email', {});
      window.localStorage.setItem(
        'userOnboarding',
        JSON.stringify({
          ...JSON.parse(window.localStorage.getItem('userOnboarding')),
          methodId: data.methodId,
        }),
      );
    } else {
      const { data } = await nextApi.post('/auth/verify_sms', {});
      window.localStorage.setItem(
        'userOnboarding',
        JSON.stringify({
          ...JSON.parse(window.localStorage.getItem('userOnboarding')),
          methodId: data.methodId,
        }),
      );
    }
    setLoading(false);
    setPendingOTP(true);
  };
  useEffect(() => {
    sendTrack('Guided Visit form step loaded', { Step: 'Specialist' });
  }, []);
  return (
    <div className=" rounded-lg shadow-lg inline-block w-full specialist-card" style={{ paddingTop: '30px' }}>
      <div className="w-full text-center text-18px font-normal font-circular text-gray-soft">
        How can we contact you?
      </div>
      <div className="flex flex-row w-full justify-evenly " style={{ marginTop: '20px', marginBottom: '20px' }}>
        {[
          { Icon: PhoneSVG, text: 'Call' },
          { Icon: EmailSVG, text: 'Email' },
          { Icon: TextSVG, text: 'Text' },
        ].map((Option) => (
          <div
            onClick={(e) => {
              e.preventDefault();
              setContactMethod(Option.text);
            }}
            style={{ height: '82px', width: '82px' }}
            className={`flex flex-col relative justify-center items-center cursor-pointer ${
              Option.text === contactMethod ? 'rounded-lg border-2 border-brand' : ''
            }  ${Option.text === contactMethod ? 'text-brand' : 'text-gray-light'}`}>
            <Option.Icon />
            <div
              className={`font-circular font-bold text-16px mt-1 ${
                Option.text === contactMethod ? 'text-brand' : 'text-gray-light'
              }`}>
              {' '}
              {Option.text}
            </div>
            {Option.text === contactMethod && (
              <div className="absolute  top-0 right-0  -" style={{ marginTop: '-9px', marginRight: '-9px' }}>
                <CircularTickSVG />
              </div>
            )}
          </div>
        ))}
      </div>

      {contactMethod === 'Email' && !user.emailVerified && (
        <div className=" border-t mb-2 border-gray-lighter font-circular text-14px pt-2 font-normal text-gray-soft">
          Email is not verified{' '}
          <button onClick={sendOTP} className="outline-none focus:outline-none text-brand font-bold">
            verify your Email
          </button>
        </div>
      )}
      {contactMethod !== 'Email' && !user.phoneVerified && (
        <div className=" border-t my-4 border-gray-lighter font-circular text-14px pt-4 font-normal text-gray-soft">
          To allow Call or Text{' '}
          <button onClick={sendOTP} className="outline-none focus:outline-none text-brand font-bold">
            verify your number
          </button>
        </div>
      )}

      {checkSubmit() && (
        <button
          disabled={OTPSuccess}
          className={`w-full h-15 mt-6 mb-5  flex outline-none focus:outline-none flex-row flex-no-wrap rounded font-circular justify-center items-center ${
            OTPSuccess ? 'bg-gray-400' : 'bg-brand'
          }`}
          onClick={onSubmit}>
          <span className="w-32 font-bold font-circular text-lg text-white">Submit</span>
          <div className=" my-auto font-bold text-lg">
            <ToTheRightArrowSVG />
          </div>
        </button>
      )}

      {loading && (
        <div className="flex justify-center my-10">
          <LoadingSpinner color="#c0c0c0" />
        </div>
      )}

      {OTPSuccess && (
        <div className="flex justify-center my-10">
          <DoneTickSVG />
        </div>
      )}

      {pendingOTP && (
        <>
          <div className="mt-6 text-16px font-circular font-normal text-gray-blue mb-5">
            {' '}
            Enter pass sent to <span className=" font-bold">+1(4**) *** ** 61</span>
          </div>
          <div>
            <VerificationCode onComplete={onOtpSubmit} />
          </div>
          <Arcprogressbar
            Time={120}
            onEnd={() => {
              setPendingOTP(false);
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                setOTPSuccess(true);
              }, 3000);
            }}
          />
        </>
      )}
    </div>
  );
}

export default Specialist;
