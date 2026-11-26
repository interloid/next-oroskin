/**
 * Contact locations (theme: sections/contact-locations.liquid + blocks/_social-list, _social-card,
 * _location-list, _location-card): "Connect on social" cards (one link each, new tab), then
 * "Our global locations" office cards (country code badge, place, address, hours, optional map link).
 * A part with no cards is left out; no cards at all = no section.
 */
import { Fragment } from 'react';
import Icon from '@/components/Icon';
import { screenClasses, screenVars, type ScreenOptions } from '@/components/ContactShared';
import type { PageContext } from '@/components/PageRenderer';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

export interface SocialCard {
  network: 'instagram' | 'x' | 'youtube' | 'facebook' | 'linkedin' | 'tiktok' | 'pinterest' | string;
  name?: string; // default: the network's name
  handle?: string;
  followers?: string;
  link?: string; // no link = the card is not a link (no arrow)
}

export interface LocationCard {
  code?: string; // badge, e.g. "FR"
  title?: string;
  address?: string; // line breaks kept
  hours?: string;
  mapLink?: string;
}

export interface ContactLocationsProps extends SectionCommon, ScreenOptions {
  socialEyebrow?: string;
  socialHeading?: string; // HTML
  socialIconStyle?: 'brand' | 'mono';
  social?: SocialCard[];
  locationsEyebrow?: string;
  locationsHeading?: string; // HTML
  locations?: LocationCard[];
  animation?: 'fade-up' | 'none';
}

const NETWORK_NAMES: Record<string, string> = {
  instagram: 'Instagram',
  x: 'X (Twitter)',
  youtube: 'YouTube',
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
  tiktok: 'TikTok',
  pinterest: 'Pinterest',
};
const BRAND_NETWORKS = ['instagram', 'x', 'youtube', 'facebook', 'linkedin'];
const NEW_WINDOW = <span className="visually-hidden"> (opens in a new window)</span>;

export default function ContactLocations({
  id,
  context,
  socialEyebrow,
  socialHeading,
  socialIconStyle = 'brand',
  social = [],
  locationsEyebrow,
  locationsHeading,
  locations = [],
  animation = 'fade-up',
  fillScreen,
  scaleScreen,
  textBoost,
  ...common
}: ContactLocationsProps & { id: string; context?: PageContext }) {
  const anim = (context?.index ?? 0) === 0 ? 'none' : animation;
  const animAttr = (name: string) => (anim !== 'none' ? { 'data-animate': name } : {});
  const offices = locations.filter((l) => l.title || l.address);
  if (!social.length && !offices.length) return null;

  return (
    <div id={`section-${id}`} className="shopify-section">
      <div
        className={`contact-locations full-width section-width--${common.width ?? 'widest'} color-${common.colorScheme ?? 'scheme-2'}${screenClasses({ fillScreen, scaleScreen })}`}
        style={sectionStyle(
          { paddingTop: common.paddingTop ?? 64, paddingBottom: common.paddingBottom ?? 96 },
          screenVars({ scaleScreen, textBoost }),
        )}
      >
        <animate-on-scroll className="contact-locations__inner">
          {social.length ? (
            <div className="contact-locations__social">
              {socialEyebrow || socialHeading ? (
                <div className="contact-locations__titles contact-locations__titles--social" {...animAttr('fade-up')}>
                  {socialEyebrow ? <p className="eyebrow eyebrow--center">{socialEyebrow}</p> : null}
                  {socialHeading ? <h2 className="contact-locations__heading" dangerouslySetInnerHTML={{ __html: socialHeading }} /> : null}
                </div>
              ) : null}
              {!socialHeading ? <h2 className="visually-hidden">{socialEyebrow || 'Social media'}</h2> : null}
              <div className="social-list">
                <div className="social-list__grid">
                  {social.map((s, i) => {
                    const brand = socialIconStyle === 'brand' && BRAND_NETWORKS.includes(s.network);
                    const inner = (
                      <>
                        <span className={`social-card__badge${brand ? ' social-card__badge--brand' : ''}`} aria-hidden="true">
                          {brand ? <Icon file={`social-brand-${s.network}.svg`} /> : <Icon name={s.network} />}
                        </span>
                        {s.link ? (
                          <span className="social-card__arrow" aria-hidden="true">
                            <Icon name="arrow-solid" />
                          </span>
                        ) : null}
                        <h3 className="social-card__name">{s.name || NETWORK_NAMES[s.network] || s.network}</h3>
                        {s.handle ? <span className="social-card__handle">{s.handle}</span> : null}
                        {s.followers ? <span className="social-card__followers">{s.followers}</span> : null}
                        {s.link ? NEW_WINDOW : null}
                      </>
                    );
                    return (
                      <div className="social-card-item" {...animAttr(anim)} key={i}>
                        {s.link ? (
                          <a className="social-card social-card--link" href={s.link} target="_blank" rel="noopener">
                            {inner}
                          </a>
                        ) : (
                          <div className="social-card">{inner}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}

          {offices.length ? (
            <div className="contact-locations__offices">
              {locationsEyebrow || locationsHeading ? (
                <div className="contact-locations__titles" {...animAttr('slide-left')}>
                  {locationsEyebrow ? <p className="eyebrow">{locationsEyebrow}</p> : null}
                  {locationsHeading ? (
                    <h2 className="contact-locations__heading" dangerouslySetInnerHTML={{ __html: locationsHeading }} />
                  ) : null}
                </div>
              ) : null}
              {!locationsHeading ? <h2 className="visually-hidden">{locationsEyebrow || 'Our locations'}</h2> : null}
              <div
                className="location-list"
                {...(anim !== 'none'
                  ? { 'data-animate': 'slide-left', style: { '--animate-delay': '100ms' } as React.CSSProperties }
                  : {})}
              >
                {offices.map((l, i) => (
                  <div className={`location-card${l.mapLink ? ' location-card--link' : ''}`} key={i}>
                    {l.code ? (
                      <span className="location-card__badge" aria-hidden="true">
                        {l.code}
                      </span>
                    ) : null}
                    <div className="location-card__body">
                      {l.title ? (
                        <h3 className="location-card__title">
                          {l.mapLink ? (
                            <a className="location-card__link" href={l.mapLink} target="_blank" rel="noopener">
                              {l.title}
                              {NEW_WINDOW}
                            </a>
                          ) : (
                            l.title
                          )}
                        </h3>
                      ) : null}
                      {l.address ? (
                        <p className="location-card__address">
                          {l.address.split('\n').map((line, j) => (
                            <Fragment key={j}>
                              {j > 0 ? <br /> : null}
                              {line}
                            </Fragment>
                          ))}
                        </p>
                      ) : null}
                      {l.hours ? <p className="location-card__hours">{l.hours}</p> : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </animate-on-scroll>
      </div>
    </div>
  );
}
