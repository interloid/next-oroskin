/**
 * Footer: glass panel with logo + tagline + social icons, menu columns, newsletter, the bottom row
 * (copyright, country / language pickers, payment icons) and the giant floating wordmark
 * (theme: sections/footer.liquid + snippets/newsletter-form, social-icons, localization-form, motion-pause).
 * Content: site.footer + site.logo.
 */
import Icon from '@/components/Icon';
import PaymentIcons from '@/components/PaymentIcons';
import { logoTextScale } from '@/sections/header';
import type { Site } from '@/lib/types';

export interface FooterProps {
  site: Site;
  path?: string | null;
  colorScheme?: string; // default scheme-1
  showNewsletter?: boolean;
  showWordmark?: boolean;
}

const SOCIAL_NAMES: Record<string, string> = {
  facebook: 'Facebook',
  whatsapp: 'WhatsApp',
  instagram: 'Instagram',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  pinterest: 'Pinterest',
  x: 'X (Twitter)',
};

/** Theme estimate of the word's width in em: capitals 0.72, spaces 0.28, others 0.42 → 100 / em cqi. */
function wordmarkSize(text: string) {
  const chars = [...text];
  let em = 0;
  chars.slice(0, 50).forEach((c) => {
    if (c === ' ') em += 0.28;
    else if (c !== c.toLowerCase()) em += 0.72;
    else em += 0.42;
  });
  em += Math.max(0, chars.length - 50) * 0.5;
  em = Math.max(1, em);
  return `${Math.round((100 / em) * 100) / 100}cqi`;
}

const Chevron = () => <Icon name="chevron" />;

export default function Footer({ site, path = null, colorScheme = 'scheme-1', showNewsletter = true, showWordmark = true }: FooterProps) {
  const f = site.footer;
  const { logo } = site;
  const columns = f.menu ?? [];
  let tracks = 'minmax(0, 2fr)';
  if (columns.length) tracks += ` minmax(0, ${columns.length}fr)`;
  if (showNewsletter) tracks += ' minmax(0, 1.5fr)';
  const word = f.wordmark ?? { word: logo.text, accent: logo.accent };
  const countries = f.countries ?? [];
  const languages = f.languages ?? [];
  const currentCountry = countries.find((c) => c.current) ?? countries[0];
  const currentLanguage = languages.find((l) => l.current) ?? languages[0];
  const current = (url: string) => (path && url === path ? 'page' : undefined);
  const nl = f.newsletter;

  return (
    <div id="shopify-section-footer" className="shopify-section shopify-section-group-footer-group">
      <footer
        className={`footer full-width color-${colorScheme}`}
        style={
          {
            '--logo-width': '50px',
            '--logo-text-size': '47px',
            '--logo-text-scale': logoTextScale(`${logo.text}${logo.accent}`),
            '--footer-columns': String(Math.max(1, columns.length)),
            '--footer-tracks': tracks,
            '--footer-link-mix': '70%',
            '--wordmark-size': wordmarkSize(`${word.word}${word.accent}`),
            '--nav-underline': "url('/cdn/shop/t/8/assets/nav-underline.svg')",
          } as React.CSSProperties
        }
      >
        <div className="footer__panel">
          <div className="footer__top">
            <div className="footer__brand">
              <a className="footer__logo" href="/">
                {logo.image ? (
                  <img
                    src={logo.image}
                    alt=""
                    width={logo.imageWidth ?? 100}
                    height={logo.imageHeight ?? 146}
                    loading="lazy"
                    className="footer__logo-image"
                    sizes="50px"
                  />
                ) : null}
                <span className="footer__logo-text logo-text-fit">
                  {logo.text}
                  {logo.accent ? <em>{logo.accent}</em> : null}
                </span>
              </a>
              {f.tagline ? <div className="footer__tagline" dangerouslySetInnerHTML={{ __html: f.tagline }} /> : null}
              {f.social?.length ? (
                <ul className="social-icons" role="list">
                  {f.social.map((s) => (
                    <li key={s.network}>
                      <a className="social-icons__link" href={s.url}>
                        <Icon name={s.network} />
                        <span className="visually-hidden">{SOCIAL_NAMES[s.network] ?? s.network}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            {columns.length ? (
              <nav className="footer__nav" aria-label="Footer">
                {columns.map((col, i) => (
                  <div className="footer__column" key={i}>
                    {col.children?.length ? (
                      <>
                        <h2 className="footer__heading">{col.title}</h2>
                        <ul className="footer__links" role="list">
                          {col.children.map((l, j) => (
                            <li key={j}>
                              <a className="footer__link" href={l.url} aria-current={current(l.url)}>
                                {l.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <ul className="footer__links" role="list">
                        <li>
                          <a className="footer__link" href={col.url} aria-current={current(col.url)}>
                            {col.title}
                          </a>
                        </li>
                      </ul>
                    )}
                  </div>
                ))}
              </nav>
            ) : null}

            {showNewsletter ? (
              <div className="footer__column footer__newsletter">
                {nl?.heading ? <h2 className="footer__heading">{nl.heading}</h2> : null}
                {nl?.text ? <div className="footer__newsletter-text" dangerouslySetInnerHTML={{ __html: nl.text }} /> : null}
                {/* Next port: posts to /api/newsletter (theme: Shopify's customer form at /contact) */}
                <form method="post" action="/api/newsletter" id="NewsletterForm-footer" acceptCharset="UTF-8" className="newsletter-form">
                  <input type="hidden" name="form_type" value="customer" />
                  <input type="hidden" name="utf8" value="✓" />
                  <input type="hidden" name="contact[tags]" value="newsletter" />
                  <label className="visually-hidden" htmlFor="NewsletterForm-footer-email">
                    Email
                  </label>
                  <input
                    className="newsletter-form__input"
                    id="NewsletterForm-footer-email"
                    type="email"
                    name="contact[email]"
                    defaultValue=""
                    placeholder={nl?.placeholder ?? 'Enter your email'}
                    autoComplete="email"
                    autoCapitalize="off"
                    spellCheck={false}
                    required
                  />
                  <p
                    className="newsletter-form__error"
                    id="NewsletterForm-footer-check"
                    data-missing="Enter your email address."
                    data-format="Enter an email address like name@example.com."
                    hidden
                  ></p>
                  <button type="submit" className="button newsletter-form__button">
                    {nl?.buttonLabel ?? 'Subscribe'}
                  </button>
                </form>
              </div>
            ) : null}
          </div>

          <div className="footer__bottom">
            <p className="footer__copyright">{f.copyright ?? `© ${new Date().getFullYear()} ${site.name}. All rights reserved.`}</p>
            <div className="footer__utilities">
              {countries.length > 1 || languages.length > 1 ? (
                /* Static list in the port: no real country / language switch (action "#") */
                <form method="get" action="#" id="footer-localization" acceptCharset="UTF-8" className="localization">
                  {countries.length > 1 && currentCountry ? (
                    <localization-picker className="localization__picker">
                      <details className="localization__details">
                        <summary className="localization__toggle">
                          <span className="visually-hidden">Country/region:</span>
                          <span className="localization__label">
                            {currentCountry.name} ({currentCountry.currency}){' '}
                          </span>
                          <Chevron />
                        </summary>
                        <ul className="localization__list" role="list">
                          {countries.map((c) => (
                            <li key={c.code}>
                              <button
                                type="submit"
                                className="localization__option"
                                name="country_code"
                                value={c.code}
                                aria-current={c === currentCountry ? 'true' : undefined}
                              >
                                {c.name} <span className="localization__currency">{c.currency}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </details>
                    </localization-picker>
                  ) : null}
                  {languages.length > 1 && currentLanguage ? (
                    <localization-picker className="localization__picker">
                      <details className="localization__details">
                        <summary className="localization__toggle">
                          <span className="visually-hidden">Language:</span>
                          <span className="localization__label">{currentLanguage.name}</span>
                          <Chevron />
                        </summary>
                        <ul className="localization__list" role="list">
                          {languages.map((l) => (
                            <li key={l.code}>
                              <button
                                type="submit"
                                className="localization__option"
                                name="language_code"
                                value={l.code}
                                lang={l.code}
                                aria-current={l === currentLanguage ? 'true' : undefined}
                              >
                                {l.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </details>
                    </localization-picker>
                  ) : null}
                </form>
              ) : null}
              {f.payment?.length ? (
                <div className="footer__payment">
                  <span className="visually-hidden" id="FooterPaymentLabel">
                    Payment methods
                  </span>
                  <PaymentIcons names={f.payment} labelledBy="FooterPaymentLabel" />
                </div>
              ) : null}
            </div>
          </div>

          {showWordmark ? (
            <div className="footer__wordmark-area">
              <p className="footer__wordmark" aria-hidden="true">
                <span className="footer__wordmark-text" data-word={word.word} data-accent={word.accent}></span>
              </p>
              <motion-pause className="motion-pause footer__wordmark-pause" data-target=".footer__wordmark-area">
                <button type="button" className="motion-pause__button" aria-pressed="false" hidden>
                  <span className="visually-hidden">Pause the moving shop name</span>
                  <svg className="motion-pause__icon motion-pause__icon--pause" aria-hidden="true" focusable="false" viewBox="0 0 16 16" width="16" height="16">
                    <rect x="3.5" y="2.5" width="3" height="11" rx="1" fill="currentColor" />
                    <rect x="9.5" y="2.5" width="3" height="11" rx="1" fill="currentColor" />
                  </svg>
                  <svg className="motion-pause__icon motion-pause__icon--play" aria-hidden="true" focusable="false" viewBox="0 0 16 16" width="16" height="16">
                    <path d="M4.5 2.8v10.4a.8.8 0 0 0 1.2.7l8.4-5.2a.8.8 0 0 0 0-1.4L5.7 2.1a.8.8 0 0 0-1.2.7z" fill="currentColor" />
                  </svg>
                </button>
              </motion-pause>
            </div>
          ) : null}
        </div>
      </footer>
    </div>
  );
}
