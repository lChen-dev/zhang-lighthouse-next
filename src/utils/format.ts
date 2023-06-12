/**
 * Gets the pluralized form of the given word based on the given value
 *
 * @param value The number value to use
 * @param singular The singular form of the word
 * @param plural The plural form of the word. If omitted, an 's' will be appended to the
 *               singular form
 * @return The singular/plural form of the given words
 */
export function pluralize(value: number, singular: string, plural?: string): string {
  if (value === 1) return singular;
  return plural || `${singular}s`;
}

export function isEmpty(value: any): boolean {
  return value === undefined || value === '' || value === null;
}

/**
 * Converts string or numeric integer with currency comma (1000 to 1,000)
 */
export function numberWithCommas(x: string | number): string {
  if (x)
    return parseInt((x.toString() || '0').toString().replace(/\D/gm, ''), 10)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return '0';
}

/**
 * Converts numeric string or integral string to abbreviated number like 1000 to 1k
 * @param value
 */
export function abbreviateNumber(value: number): string {
  const val = value ? value.toString() : '';
  let newValue = `${parseInt((val.includes('.') ? val.split('.')[0] : val).replace(/\D/gm, ''), 10)}`;
  if (value >= 1000) {
    const suffixes = ['', 'k', 'm', 'b', 't'];
    const suffixNum = Math.floor(`${value}`.length / 3);
    let shortValue = '';
    for (let precision = 2; precision >= 1; precision--) {
      shortValue = `${parseFloat(
        (suffixNum !== 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(precision),
      )}`;
      const dotLessShortValue = shortValue.replace(/[^a-zA-Z 0-9]+/g, '');
      if (dotLessShortValue.length <= 2) {
        break;
      }
    }
    newValue = shortValue + suffixes[suffixNum];
  }
  return newValue;
}

const MIN_ALLOWED_PRICE = 400;
export const formatPriceRange = (minPrice?: number, maxPrice?: number): string => {
  if (!minPrice && !maxPrice) return 'Call for Rent';
  if (minPrice && maxPrice && minPrice < MIN_ALLOWED_PRICE && maxPrice < MIN_ALLOWED_PRICE) return 'Call for Rent';
  const prices = Array.from(new Set([minPrice, maxPrice]))
    .filter((e) => e && Number.isFinite(e) && e > MIN_ALLOWED_PRICE)
    .map((e: any) => numberWithCommas(parseInt(e, 10)));
  if (prices.length > 0)
    return `$${prices.join(' - ')}`;
  return 'Call for Rent';
};

export const getCashback = (cashback: number): number => {
  // if cashback exceed 1200, cap it to 1200
  return Math.floor(parseInt(`${cashback >= 1200 ? 1200 : cashback}`, 10));
};
