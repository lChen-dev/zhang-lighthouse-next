import { useEffect, useState } from 'react';

export function abTestLabel(key: string): string | null {
  const testKeys = (process.env.NEXT_PUBLIC_ACTIVE_AB_TESTS || '').split(',');
  if (
    typeof window !== 'undefined' &&
    testKeys.length > 0 &&
    testKeys.includes(key)
  ) {
    return `${key}:${localStorage.getItem(key)}`;
  }
  return null;
}

export function isABTestB(key: string): boolean {
  const testKeys = (process.env.NEXT_PUBLIC_ACTIVE_AB_TESTS || '').split(',');
  if (testKeys.length > 0 && testKeys.includes(key)) {
    let testType = localStorage.getItem(key);
    if (testType == null) {
      testType = Math.random() < 0.5 ? 'A' : 'B';
      localStorage.setItem(key, testType);
    }
    return testType === 'B';
  }
  return false;
}

/**
 * Performs an equal chance A/B test calculation and stores the result in local storage
 * to be used later if the same test is reused.
 * @param key The AB test key
 * @param orig The original value
 * @param alter The new value to test out
 */
export function performAB(key: string, orig: any, alter: any): any {
  return isABTestB(key) ? alter : orig;
}

export function useABTest(key: string) {
  const [alternate, setAlternate] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') setAlternate(isABTestB(key));
  }, [key]);

  return {
    alternate,
    label: abTestLabel(key),
  };
}
