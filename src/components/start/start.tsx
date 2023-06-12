import React, { useEffect, useRef } from 'react';
import jsCookie from 'js-cookie';
import { sendTrack } from '@utils/analytics';
import { useAuth } from 'context/auth';

const typeformEmbed = require('@typeform/embed');

const StartPage: React.FC = (props: any) => {
  const userInfo = useAuth();
  let userId = '';
  if (userInfo?.hasOwnProperty('user') && userInfo?.user?.id) {
    userId = userInfo?.user?.id ?? '';
  }

  const typeformRef: any = useRef(null);

  const disabled = false; // for GA analytics + new onboarding will replace
  const alternateForm = disabled;

  if (alternateForm) {
    setTimeout(() => {
      // use location to force a page load and prevent scripts from being loaded
      window.location.replace('/inquiry');
    }, 0);
  }

  const getAnonymousId = () => {
    try {
      if (window && window?.hasOwnProperty('analytics')) {
        const windowAnalytics = (window as any).analytics;
        return windowAnalytics.user().anonymousId();
      }
    } catch (error) {
      // pass
    }
    return '';
  };

  useEffect(() => {
    const anonymousId = getAnonymousId();
    const gaSource = jsCookie.get('utm_source') || '';
    const gaCampaign = jsCookie.get('utm_campaign') || '';
    const gaMedium = jsCookie.get('utm_medium') || '';
    const gaTerm = jsCookie.get('utm_term') || '';
    const gaContent = jsCookie.get('utm_content') || '';
    const deviceInfo = jsCookie.get('deviceInfo') || '';
    const userIP = jsCookie.get('userIP') || '';
    const refId = jsCookie.get('utm_ref') || '';

    typeformEmbed.makeWidget(
      typeformRef.current,
      `https://form.typeform.com/to/VhYIed8D?source=${gaSource}&campaign=${gaCampaign}&medium=${gaMedium}&term=${gaTerm}&userid=${userId}&content=${gaContent}&referredby=${refId}&userip=${userIP}&device=${deviceInfo}&anonymousid=${anonymousId}&page=${encodeURIComponent(
        (window.location as any)?.href
      )}&hubspotutk=${jsCookie.get('hubspotutk')}&auth0id=${userId || ''}`,
      {
        onSubmit(event: any) {
          sendTrack('TypeformSucess', {
            category: 'typeform',
            action: 'TypeformSucess',
          });
          sendTrack('TypeformSubmit', {
            category: 'typeform',
            action: 'TypeformSubmit',
          });
          setTimeout(() => {
            // use location to force a page load and prevent scripts from being loaded
            window.location.replace(`/search?response_id=${event.response_id}`);
          }, 2000);
        },
        onReady() {
          sendTrack('TypeformStart', {
            category: 'typeform',
            action: 'TypeformStart',
          });
          setTimeout(() => {
            sendTrack('TypeformFirstInteraction', {
              category: 'typeform',
              action: 'TypeformFirstInteraction',
            });
          }, 1000);
        },
      }
    );
  }, []);

  return <div ref={typeformRef} className="absolute inset-0" />;
};

export default StartPage;
