/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/jsx-props-no-spreading */
import Document, { Main, Html, NextScript, Head } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import * as Sentry from '@sentry/browser';
import userAgentParser from 'user-agent-parse';
import { loggingEnabled } from '@utils/sentry';

process.on('unhandledRejection', (err) => {
  if (loggingEnabled) {
    Sentry.captureException(err);
  }
});

process.on('uncaughtException', (err) => {
  if (loggingEnabled) {
    Sentry.captureException(err);
  }
});

export const config = { amp: true };
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    let uaName = '';
    if (typeof navigator !== 'undefined') uaName = userAgentParser.parse(window.navigator.userAgent).name;

    return (
      <Html lang="en" amp>
        <Head>
          <link rel="stylesheet" href="/static/assets/css/Mackinac.css" />
          <link rel="stylesheet" href="/static/assets/css/Circular.css" />
        </Head>
        <body>
          <Main />
          <NextScript defer />
        </body>
      </Html>
    );
  }
}
