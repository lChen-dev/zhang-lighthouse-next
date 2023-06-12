import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';
import * as Sentry from '@sentry/node';
import { loggingEnabled } from '@utils/sentry';

const MAX_ERROR_LIST_SIZE = 4;

type TimestampedError = {
  error: Error;
  timestamp: Date;
};

type ErrorContextType = {
  errors: TimestampedError[];
  addError: (err: Error) => void;
  clearErrors: () => void;
};
const ErrorContext = createContext<ErrorContextType>({
  errors: [],
  addError: () => null,
  clearErrors: () => null,
});

/**
 * Gets the error message from a given error
 * @param err The given error
 */
export const getErrorMessage = (err: any): string => {
  if (err.isAxiosError) {
    const error = err as AxiosError;
    const resp = error.response;
    return resp?.data.message || resp?.statusText || error.message;
  }

  if (err instanceof Error) {
    return err.message;
  }
  return err?.message ?? err;
};

interface Props {
  children: React.ReactNode;
}
export const ErrorProvider: React.FC<Props> = ({ children }: Props) => {
  const router = useRouter();
  const [errors, setErrors] = useState<TimestampedError[]>([]);

  // When the route changes, clear the errors
  useEffect(() => {
    const onRouteChange = (): void => setErrors([]);
    router.events.on('routeChangeStart', onRouteChange);
    return router.events.off('routeChangeStart', onRouteChange);
  }, [router]);

  const contextValue: ErrorContextType = {
    errors,
    addError: useCallback(
      (err) => {
        if (loggingEnabled) {
          Sentry.withScope((scope) => {
            scope.addBreadcrumb({
              message: 'Error banner shown',
              level: Sentry.Severity.Error,
            });
            Sentry.captureException(err);
          });
        }

        const matchingData = errors.find((data) => getErrorMessage(data.error) === getErrorMessage(err));
        if (!matchingData) {
          if (errors.length >= MAX_ERROR_LIST_SIZE) errors.shift();
          setErrors([...errors, { error: err, timestamp: new Date() }]);
        }
      },
      [errors],
    ),
    clearErrors: useCallback(() => setErrors([]), []),
  };

  return <ErrorContext.Provider value={contextValue}>{children}</ErrorContext.Provider>;
};

/**
 * Uses the `ErrorContext` to allow errors to be globally added
 */
export const useErrors = () => useContext(ErrorContext);

/**
 * Used to handle displaying errors when they occur during an SSR request.
 * @param ssrError The SSR error
 */
export const useSSRErrorHandler = (ssrError?: Error) => {
  const { addError } = useErrors();
  useEffect(() => {
    if (ssrError) addError(ssrError);
  }, [ssrError, addError]);
};
