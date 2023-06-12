import Analytics from 'analytics';
import segmentPlugin from '@analytics/segment';

const plugins = [];
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction && process.env.NEXT_PUBLIC_SEGMENT_KEY) {
  plugins.push(
    segmentPlugin({
      writeKey: process.env.NEXT_PUBLIC_SEGMENT_KEY,
    })
  );
}

/* Initialize analytics */
const analytics = Analytics({
  app: 'Lighthouse',
  version: process.env.npm_package_version,
  plugins,
});

/**
 *
 * @description track method when analytics is enabled
 * @param event {string} - event name
 * @param obj {object} traits or meta
 *
 */
export const sendTrack = (event: string, obj = {}): void => {
  if (typeof window !== 'undefined' && window.hasOwnProperty('analytics') && process.env.NODE_ENV === 'production') {
    const analytics: any = (window as any).analytics;
    let anonymousId: any = null;
    let userId: any = null;
    let identity: any = {};
    try {
      anonymousId = analytics.user().anonymousId() || null;
      userId = analytics.user().id() || null;
      identity = {
        ...(anonymousId ? { anonymousId } : {}),
        ...(userId ? { userId } : {}),
      };
    } catch (e) { }
    const track = analytics.track;
    if (event.trim() !== '') {
      track && typeof track == 'function' && track(event, { ...obj, ...identity });
    }
  }
};

export function track(title: any, args: any): void {
  analytics.track(title, args);
}

export function identify(userId: any, traits: any): void {
  analytics.identify(userId, traits);
}

export function page(): void {
  analytics.page();
}

export default analytics;
