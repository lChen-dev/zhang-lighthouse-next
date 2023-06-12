import * as Sentry from '@sentry/node';
import { GetServerSidePropsContext, GetServerSideProps, NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

interface ErrorResp {
  info: string;
  error: any;
  data?: object;
}

export const loggingEnabled = Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN && process.env.NODE_ENV === 'production');

Sentry.init({ beforeSend: (event) => (loggingEnabled ? event : null), dsn: process.env.NEXT_PUBLIC_SENTRY_DSN });

export const sentryGetServerSideProps = (handler: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
  try {
    return await handler(ctx);
  } catch (error: any) {
    sentryCaptureException({
      info: error?.message || 'Dynamic error',
      error,
    });
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }
};

class SentryErrorFmt extends Error {
  constructor(payload: ErrorResp) {
    super(`${payload?.error?.name ?? 'uncaught error'} ${payload?.error?.message ?? ''}`);
    this.name = payload?.info || 'Error';
    if (payload?.error?.stack) {
      this.stack = payload.error.stack;
    }
  }
}

export function sentryCaptureException(payload: ErrorResp): void {
  if (!loggingEnabled) {
    displayError(payload);
    return;
  }

  const { data } = payload || {};
  if (data) {
    Sentry.addBreadcrumb({ data });
  }
  Sentry.captureException(new SentryErrorFmt(payload));
}

function displayError(payload: ErrorResp): void {
  console.groupCollapsed(`[SENTRY ERROR]: ${payload?.info}`);
  if (payload?.data) {
    console.info('Data:', payload.data);
  }
  if (payload?.error) {
    console.error(payload.error);
  }
  console.groupEnd();
}
