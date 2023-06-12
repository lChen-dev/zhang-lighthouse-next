import jsCookie from 'js-cookie';

interface GAParams {
  utm_ref?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_term?: string;
  utm_campaign?: string;
  utm_content?: string;
  gclid?: string;
}

export default class GA {
  private static getParamsFromUrl(): GAParams {
    const { searchParams } = new URL(window.location.href);
    return {
      utm_ref: searchParams.get('utm_ref') || '',
      utm_source: searchParams.get('utm_source') || '',
      utm_medium: searchParams.get('utm_medium') || '',
      utm_term: searchParams.get('utm_term') || '',
      utm_campaign: searchParams.get('utm_campaign') || '',
      utm_content: searchParams.get('utm_content') || '',
      gclid: searchParams.get('gclid') || '',
    };
  }

  public static hasActiveParams(): boolean {
    const ALL_CURRENT_UTM_COUNT = 6;
    const obj: any = GA.getParamsFromUrl();
    return (
      Object.keys(obj).filter((item) =>
        item
          .toLowerCase()
          .trim()
          .includes('utm') && obj[item]
      ).length === ALL_CURRENT_UTM_COUNT
    );
  }

  public static getGADataFromCookie(): GAParams {
    return {
      utm_ref: jsCookie.get('utm_ref') || '',
      utm_source: jsCookie.get('utm_source') || '',
      utm_medium: jsCookie.get('utm_medium') || '',
      utm_term: jsCookie.get('utm_term') || '',
      utm_campaign: jsCookie.get('utm_campaign') || '',
      utm_content: jsCookie.get('utm_content') || '',
      gclid: jsCookie.get('gclid') || '',
    };
  }

  public static setGAData(): void {
    const gaParams = GA.getParamsFromUrl();
    const gaCookie = GA.getGADataFromCookie();

    for (const index of Object.keys(gaParams)) {
      const val: any = gaParams[index as keyof GAParams] || gaCookie[index as keyof GAParams] || '';
      if (val) jsCookie.set(index, val, { expires: 30 });
    }
  }
}
