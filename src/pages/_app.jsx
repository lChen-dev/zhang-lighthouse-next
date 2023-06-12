/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import NextApp from 'next/app';
import * as Sentry from '@sentry/browser';
import jsCookie from 'js-cookie';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import userAgentParser from 'user-agent-parse';
import { AnalyticsProvider } from 'use-analytics';
import Div100vh from 'react-div-100vh';
import { loggingEnabled, sentryCaptureException } from '@utils/sentry';
import { nextApi } from '@utils/http';
import { loadScript } from '@utils/helpers';
import { ErrorProvider } from '@hooks/errors';
import RequestErrorAlert from '@components/shared/RequestErrorAlert';
import AnnouncementBanner from '@components/shared/AnnouncementBanner';
import Storage from '@tracking/storage';
import analytics from '@utils/analytics';
import { getUserFromCookie, setUserInCookie } from '../context/auth/util';
import AuthProvider from '../context/auth';

import SEO from '../../next-seo.config';
import JsonLD from '../strings/site-jsonld';
import MetaTags from '../strings/site-meta';
import '../styles.css';

Sentry.init({
  beforeSend: (event) => (loggingEnabled ? event : null),
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: true,
  environment: process.env.NEXT_PUBLIC_SENTRY_ENV,
  release: process.env.NEXT_PUBLIC_SENTRY_RELEASE,
});
Sentry.configureScope((scope) => {
  scope.setTag('nodejs', process.version);
  scope.setTag('runtimeEngine', 'server');
  scope.setTag('buildTime', 10);
});

class App extends NextApp {
  componentDidCatch(error, errorInfo) {
    if (loggingEnabled) {
      Sentry.withScope((scope) => {
        Object.keys(errorInfo).forEach((key) => {
          scope.setExtra(key, errorInfo[key]);
        });
        Sentry.captureException(error);
      });
      super.componentDidCatch(error, errorInfo);
    }
  }

  constructor(props) {
    super(props);
    this.state = { user: null };
  }

  async componentDidMount() {
    // dark theme handler
    const user = getUserFromCookie();

    const isDarkDefault = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (!jsCookie.get('theme')) {
      jsCookie.set('theme', { darkTheme: isDarkDefault }, { expires: 30 });
    }

    this.setState({ user });

    const { userAgent } = navigator;
    const { device_type: deviceType, name, os, version } = userAgentParser.parse(userAgent);
    const deviceInfo = `${name} ${version} - ${deviceType} - ${os}`;
    const { pathname } = this.props.router;
    // to remove slash
    const path = pathname
      .replace(/\//gm, '')
      .toLowerCase()
      .trim();
    if (path !== 'start' && path !== 'privacy' && path !== 'terms' && path !== 'lookup') {
      // defer script load in end, without element-blocking
      loadScript(
        ['/static/assets/js/FacebookPixel.js'],
        [
          { attr: 'defer', value: true },
          { attr: 'crossOrigin', value: 'anonymous' },
        ]
      );
    }
    Storage.init();

    if (jsCookie.get('lh_user')) {
      await nextApi
        .get('/users/me', {
          timeout: 1000 * 60,
          validateStatus: () => true,
        })
        .then(({ data, status }) => {
          if (status >= 400) {
            jsCookie.remove('lh_user');
            jsCookie.remove(process.env.NEXT_PUBLIC_STYTCH_SESSION_COOKIE ?? 'lhstyssion');
            this.setState({ user: null });
            return;
          }
          window.localStorage.setItem('UserObject', JSON.stringify(data));
          window.localStorage.setItem('UserObjectReset', true);

          this.setState({ user: data });
          setUserInCookie(data);
        })
        .catch(() => {
          sentryCaptureException({ info: 'unable to fetch /users/me', error: {} });
        });
    }

    // analytics
    if (window && window?.hasOwnProperty('analytics') && window.analytics?.hasOwnProperty('user')) {
      setTimeout(() => {
        const windowAnalytics = window.analytics;
        const anonymousId = windowAnalytics.user().anonymousId();
        const uniqueUserId = anonymousId;

        if (!jsCookie.get('ga_user')) {
          jsCookie.set('ga_user', anonymousId, { expires: 30 });
        }

        // page track
        if (!this.props.router.pathname.includes('building')) {
          analytics?.page({
            path: this.props.router.pathname,
            url: window.location.href,
            anonymousId,
          });
        } else {
          analytics?.page({
            title: 'Property Page',
            path: this.props.router.pathname,
            anonymousId,
          });
        }
        // user session set
        const userIsIdentified = jsCookie.get('Identified');
        if (user && !userIsIdentified) {
          // set up ab tests and tracking
          const userId = user.sub;
          const { email } = user;
          const givenName = user.given_name;
          const familyName = user.family_name;
          if (!userId) return;
          analytics?.identify(userId, {
            email,
            firstName: givenName,
            lastName: familyName,
            name: `${givenName} ${familyName}`,
            anonymousId,
            gclid: jsCookie.get('gclid'),
          });
          // amplitude set id
          if (window.amplitude) {
            window.amplitude.setUserId(userId);
          }
          jsCookie.set('Identified', 1, { expires: 365 });
        }

        // --------------- UTM -------------------

        nextApi
          .get('/self/user-ip', { timeout: 2 * 60 * 1000 })
          .then(({ data: userIP }) => {
            jsCookie.set('userIP', userIP);
          })
          .catch((e) => {
            jsCookie.set('userIP', '');
          });
        if (deviceInfo) {
          jsCookie.set('deviceInfo', deviceInfo);
        }

        // ---------- visitor alerts -------------
        const docReferrer = document.referrer;
        let referrer = jsCookie.get('referrer');
        if (!referrer) {
          try {
            referrer =
              docReferrer && docReferrer !== ''
                ? new URL(document.referrer).hostname || 'www.lighthouse.app'
                : 'www.lighthouse.app';
          } catch (e) {
            //
          }
          jsCookie.set('referrer', referrer);
        }
        if (
          process.env.NEXT_PUBLIC_VISITOR_ALERTS_ENABLED === 'true' &&
          path !== 'redirect' &&
          !userAgent.includes('Vercelbot') &&
          !userAgent.includes('headless')
        ) {
          const isUniqueVisitor = jsCookie.get('unique_visitor') || '';
          // eslint-disable-next-line promise/param-names
          nextApi
            .post(
              `${process.env.NEXT_PUBLIC_API_URL}visitor`,
              {
                pathname,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                userAgent,
                unique_visitor: isUniqueVisitor,
                pageLoadedIn: 0,
                gaUserId: uniqueUserId, // anonymousId
                visitorFrom: referrer,
              },
              {
                timeout: 2 * 60 * 1000, // 2 min
              }
            )
            .then((e) => console.log('successfully recorded visitor'))
            .catch((error) => {
              sentryCaptureException({
                info: 'unable to log visitor',
                error,
              });
            });
          if (!isUniqueVisitor)
            jsCookie.set('unique_visitor', '1', {
              expires: 365, // 1 year
            });
        }
      }, 3000);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    const { user } = this.state;
    const { pathname } = this.props.router;
    const thumbnail = `https://www.lighthouse.app/api/thumbnail?path=${pathname || ''}&quality=10`;

    return (
      <>
        <Head>
          {MetaTags({
            image: thumbnail,
            path: pathname,
            domain: process.env.VERCEL_URL,
          })}
          <script type="application/ld+json">{JSON.stringify(JsonLD)}</script>
        </Head>
        <AuthProvider user={user}>
          <DefaultSeo {...SEO} openGraph={{ ...SEO.openGraph, images: [{ url: thumbnail }] }} />
          <AnalyticsProvider instance={analytics}>
            <ErrorProvider>
              <Div100vh className="flex flex-col">
                <RequestErrorAlert />
                <AnnouncementBanner />
                <div id="doc-wrapper" className="flex-1 overflow-y-auto relative">
                  <Component {...pageProps} />
                </div>
              </Div100vh>
            </ErrorProvider>
          </AnalyticsProvider>
        </AuthProvider>
      </>
    );
  }
}

export default App;
