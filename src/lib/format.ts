/**
 * Money and date text. The currency format and the locale are not written in the storefront: they come
 * from the backend's site settings (`moneyFormat`, `locale`, `currency` in GET /site).
 *
 * money() is called from many sections, deep in the tree, so the settings are kept here instead of being
 * passed through every prop: loadSiteFormat(site) stores them, and src/components/PageRenderer.tsx (and the
 * hand-written checkout pages) call it before anything is rendered. One deployment serves one market, so
 * one set of settings for the whole process is correct. If one deployment ever serves several currencies,
 * make this per request (React `cache()`), keyed by the visitor's market.
 */
import type { Site } from './types';

export interface SiteFormat {
  /** "${{amount}}": {{amount}} is replaced by the formatted number */
  moneyFormat: string;
  /** BCP 47 tag: "en-US" */
  locale: string;
  /** ISO 4217 code: "USD" */
  currency: string;
}

let current: SiteFormat | null = null;

/** Stores the site's money and locale settings for money() and the date helpers. Returns them. */
export function loadSiteFormat(site: Pick<Site, 'moneyFormat' | 'locale' | 'currency'>): SiteFormat {
  current = { moneyFormat: site.moneyFormat, locale: site.locale || 'en-US', currency: site.currency };
  return current;
}

/** The stored settings. Throws when a page forgot to load them: better than showing a wrong currency. */
export function siteFormat(): SiteFormat {
  if (!current) throw new Error('Site format is not loaded: call loadSiteFormat(await api.site()) before rendering prices');
  return current;
}

/** The currency sign alone ("$"), for labels next to a number input */
export function currencySymbol(format: SiteFormat = siteFormat()): string {
  return format.moneyFormat.replace('{{amount}}', '').trim();
}

/** "$9,000.00" from 900000 (minor units) */
export function money(amount: number, format: SiteFormat = siteFormat()): string {
  const value = (amount / 100).toLocaleString(format.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return format.moneyFormat.replace('{{amount}}', value);
}

/** "June 28, 2026" from an ISO date or timestamp, in the site's locale. Dates without a time are not shifted. */
export function longDate(iso: string, options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }): string {
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(iso);
  const date = new Date(dateOnly ? `${iso}T00:00:00Z` : iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString(siteFormat().locale, dateOnly ? { ...options, timeZone: 'UTC' } : options);
}
