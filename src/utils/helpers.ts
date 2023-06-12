import jsCookie from 'js-cookie';

export function removeUndefinedFields(obj: { [key: string]: any | undefined }): void {
  // eslint-disable-next-line no-param-reassign
  Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key]);
}

export const openURLInNewTab = (url: string): void => {
  const newWindow = window.open(url, '_blank', 'noopener noreferrer');
  if (newWindow) newWindow.opener = null;
};

/**
 * Loads one or more `<script>` elements into the document body with the given props.
 */
export function loadScript(
  sources: string[] = [],
  props: { attr: string; value: string }[] = [],
  inHead = false,
): void {
  sources.forEach((src) => {
    const tag = document.createElement('script');
    tag.src = src;
    props.forEach((prop) => tag.setAttribute(prop.attr, prop.value));
    if (inHead) {
      return document.head.appendChild(tag);
    }
    return document.body.appendChild(tag);
  });
}

/**
 * Loads one or more CSS `<link>` elements into the document head with the given props.
 */
export function loadStyle(...hrefs: string[]): void {
  hrefs.forEach((href) => {
    const tag = document.createElement('link');
    tag.setAttribute('ref', 'stylesheet');
    tag.setAttribute('type', 'text/css');
    tag.setAttribute('href', href);
    document.head.appendChild(tag);
  });
}

/**
 *  Update, create and delete URL state
 */
export function updateQueryString(key: string, value: string, url: string): void {
  // eslint-disable-next-line no-param-reassign
  if (!url) url = window.location.href;
  const re = new RegExp(`([?&])${key}=.*?(&|#|$)(.*)`, 'gi');
  let hash;
  let loc;
  if (re.test(url)) {
    if (typeof value !== 'undefined' && value !== null) {
      loc = url.replace(re, `$1${key}=${value}$2$3`);
    } else {
      hash = url.split('#');
      // eslint-disable-next-line no-param-reassign
      url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
      if (typeof hash[1] !== 'undefined' && hash[1] !== null) {
        // eslint-disable-next-line no-param-reassign
        url += `#${hash[1]}`;
      }
      loc = url;
    }
  } else if (typeof value !== 'undefined' && value !== null) {
    const separator = url.includes('?') ? '&' : '?';
    hash = url.split('#');
    // eslint-disable-next-line no-param-reassign
    url = `${hash[0] + separator + key}=${value}`;
    if (typeof hash[1] !== 'undefined' && hash[1] !== null) {
      // eslint-disable-next-line no-param-reassign
      url += `#${hash[1]}`;
    }
    loc = url;
  } else {
    loc = url;
  }
  window.history.replaceState('search', 'Search', loc);
}

export function isPresent(val: any): boolean {
  return !(val === undefined || val === null || (Array.isArray(val) && val.length === 0));
}

export function swapCoordinates(lat: any, lng: any): { lat: any; lng: any } {
  if (lat < lng) {
    // swap coordinate
    return { lat: lng, lng: lat };
  }
  return { lat, lng };
}

export function getMetadata() {
  return {
    source: jsCookie.get('utm_source') || '',
    campaign: jsCookie.get('utm_campaign') || '',
    medium: jsCookie.get('utm_medium') || '',
    content: jsCookie.get('utm_term') || '',
    userId: jsCookie.get('ga_user') || '',
    term: jsCookie.get('utm_term') || '',
    device: jsCookie.get('deviceInfo') || '',
    refId: jsCookie.get('utm_ref') || '',
    userIp: jsCookie.get('userIP') || '',
  };
}
