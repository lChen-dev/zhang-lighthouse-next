import { Floorplan, Property } from '@models/Property';
import { numberWithCommas, pluralize } from '@utils/format';
import { isPresent } from '@utils/helpers';
import Cookies from 'js-cookie';

/**
 * @param {number} bed
 * @description provide number 0+ to convert it to bedString
 * @returns {string} string bed index
 */
export const getMinPriceIndex = (bed: number): string => {
  if (bed < 1) return 'StudioMin';
  if (bed === 1) return '1BRMin';
  return `${bed}BRsMin`;
};

/**
 *
 * @param {number} bed
 * @description provide number 0+ to convert it to bedString
 * @returns {string} string bed index
 */
export const getMaxPriceIndex = (bed: number): string => {
  if (bed < 1) return 'StudioMax';
  if (bed === 1) return '1BRMax';
  return `${bed}BRsMax`;
};

/**
 * @param {object} prices
 * @param {number} bed
 * @description get range of price
 * @returns {string} string result
 */
export const bedPrice = (prices: any[], bed: number | null = null): string => {
  let bedPrices: any[];
  if (bed) {
    const bedSorted = prices.filter((e) => e.bed === bed).map((e) => e.maxPrice);
    const minPrice = Math.min.apply(null, bedSorted);
    const maxPrice = Math.max.apply(null, bedSorted);
    const price = [minPrice, maxPrice];

    bedPrices = price.filter((e) => Number.isFinite(e));
  } else {
    bedPrices = prices;
  }
  if (bedPrices.length > 0) {
    return Array.from(new Set(bedPrices.filter((e) => Number.isFinite(e) && e > 0)))
      .map((e) => `$${numberWithCommas(e)}`)
      .join(' - ');
  }
  return 'Call for Rent';
};

export const bedName = (bed: number): string => {
  if (bed === 0.5) return 'STU';
  if (bed > 0) return `${bed}BR`;
  return '';
};

export const bedToStudio = (bed: number, studioText = 'STU'): string => (bed < 1 ? studioText : `${bed}`);

export const formatBedRange = (minBed: number, maxBed: number): string => {
  if (!minBed && !maxBed) return 'Unknown';
  if (!minBed) return bedToStudio(maxBed);
  if (!maxBed) return bedToStudio(minBed);
  if (minBed === maxBed) return bedToStudio(minBed);
  return `${bedToStudio(minBed)}-${bedToStudio(maxBed)}`;
};

export const bedRange = (
  minBed?: number | null,
  maxBed?: number | null,
  studioLabel = 'Studio',
  bedroomLabel = 'Bedroom',
): string => {
  let str = '';
  if (minBed !== null && minBed !== undefined) {
    str = bedToStudio(minBed, studioLabel);
    if (minBed >= 1) str += ` ${pluralize(minBed, bedroomLabel)}`;
  }

  if (maxBed !== minBed) {
    if (isPresent(minBed) && isPresent(maxBed)) str += ' - ';
    if (maxBed !== null && maxBed !== undefined) {
      str += `${bedToStudio(maxBed, studioLabel)} ${pluralize(maxBed, bedroomLabel)}`;
    }
  }
  return str;
};

export const allBedPrices = (prices: any[]): string[] => {
  return [0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    .map((bed) => {
      const price = bedPrice(prices, bed);
      const name = bedName(bed);
      return price !== 'Call for Rent' ? `${name}: ${price}` : '';
    })
    .filter((price) => price !== '');
};

export const generateMarkers = (record: any[]) =>
  record.map((marker) => ({
    id: marker._id,
    lng: marker.location.coordinates[0],
    lat: marker.location.coordinates[1],
    srcs: marker && marker.image ? [marker.image].map((e) => e.file) : [],
    title: marker.property_name,
    // address: `${marker.address} ${marker.city}`,
    // minPrice: marker.minPrice,
    // maxPrice: marker.maxPrice,
    minBed: marker.minBed,
    maxBed: marker.maxBed,
    reward: marker.cash_reward || '',
    // unitCount: 0,
    // slug: marker.slug,
    // metro: marker.metro,
    prices: marker.prices,
    price: marker.minPice || marker.maxPrice,
  }));

export const getBedroomsList = (floorplans: Floorplan[]): string => {
  return floorplans
    .map((floorplan) => floorplan.bedroomCount)
    .sort()
    .reduce((acc: string[], val: number) => {
      const bedLabel = bedRange(val, null, 'Studio', 'Bed');
      return acc.includes(bedLabel) ? acc : [...acc, bedLabel];
    }, [])
    .join(', ');
};

/**
 *
 * if < $300, say total
 * if >=$300, break into monthly
 * */
export function formatCashbackOnMapCard(cashback: number): string {
  const maxCashback = String(cashback > 1200 ? 1200 : cashback);
  const finalCashback = Math.floor(parseInt(maxCashback, 10));

  if (cashback > 300) {
    const monthly = String(finalCashback / 12);
    const monthlyPrice = Math.floor(parseInt(monthly, 10));
    return `$${numberWithCommas(monthlyPrice)}/mo back`;
  }
  return `$${numberWithCommas(finalCashback)} Cash Back`;
}

export function getBuildingURL(property: Property): string {
  return `/building/${property.nanoId || property.id}/${(property.name.toLowerCase().trim() || '').replace(/\s/gim, '-')}`;
}

function getStoredQueryString(): any {
  try {
    const data = Cookies.get('__last_search_query');
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    // pass
  }

  return {};
}

export function storeSearchQuery(nanoId: string): void {
  const { search } = new URL(window.location.href);
  if (!search) {
    return;
  }

  const store = getStoredQueryString();
  store[nanoId] = search;

  Cookies.set('__last_search_query', JSON.stringify(store), {
    expires: new Date(new Date().getTime() + 60 * 60 * 1000 * 24 * 7), // 1week
  });
}

/**
 * get search page params from cookie
 * and redirect user back to old query
 * */
export function getSearchRedirectURL(nanoId: any): any {
  if (nanoId) {
    const queryString = getStoredQueryString()[nanoId];
    if (queryString) {
      return `/search${queryString}`;
    }
  }
  return null;
}
