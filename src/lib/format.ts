import site from '@/data/site.json';

/** "Rs. 9,000.00" from 900000 (minor units), using the site's money format. */
export function money(amount: number, format: string = site.moneyFormat) {
  const value = (amount / 100).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return format.replace('{{amount}}', value);
}
