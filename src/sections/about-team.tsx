/**
 * About team (theme: sections/about-team.liquid + blocks/_team-member.liquid): side outline word, header with
 * hand-drawn arrows, then team cards (photo, outline role word, name, role, quote and social links behind a
 * card button: <about-team-list>, theme JS).
 */
import Icon from '@/components/Icon';
import { aboutScreenVars, type AboutImage, type AboutScreenOptions } from '@/components/AboutShared';
import type { PageContext } from '@/components/PageRenderer';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

export interface AboutTeamMember {
  id: string; // used for the quote / social ids
  name?: string;
  role?: string;
  roleWord?: string; // big outline word behind the card ("Founder")
  image?: AboutImage; // shown cropped square (800 × 800)
  quote?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
}

export interface AboutTeamProps extends SectionCommon, AboutScreenOptions {
  sideWord?: string;
  showArrows?: boolean;
  eyebrow?: string;
  heading?: string; // HTML: <em> = accent, <strong> = brush underline
  text?: string; // HTML
  animation?: 'fade-up' | 'none';
  members: AboutTeamMember[];
}

const NETWORKS = [
  ['instagram', 'Instagram'],
  ['facebook', 'Facebook'],
  ['linkedin', 'LinkedIn'],
] as const;

export default function AboutTeam({
  id,
  context,
  sideWord,
  showArrows = true,
  eyebrow,
  heading,
  text,
  animation = 'fade-up',
  members,
  ...common
}: AboutTeamProps & { id: string; context?: PageContext }) {
  const cards = (members ?? []).filter((m) => m.image || m.name || m.role || m.quote);
  if (!cards.length) return null;
  const anim = (context?.index ?? 0) === 0 ? 'none' : animation;
  const scale = common.scaleScreen ?? true;
  const sizes = scale
    ? '(min-width: 1200px) 21vw, (min-width: 750px) min(46vw, 384px), 45vw'
    : '(min-width: 1200px) min(21vw, 393px), (min-width: 750px) min(46vw, 384px), 45vw';
  const loading = (context?.index ?? 0) === 0 ? 'eager' : 'lazy';

  return (
    <div id={`section-${id}`} className="shopify-section">
      <div
        className={`about-team full-width section-width--${common.width ?? 'widest'} color-${common.colorScheme ?? 'scheme-2'}${scale ? ' section--screen-scale' : ''}`}
        style={sectionStyle(
          { paddingTop: 120, paddingBottom: 120, ...common },
          { ...aboutScreenVars(common), '--brush-underline': "url('/cdn/shop/t/8/assets/brush-underline.svg')" },
        )}
      >
        <animate-on-scroll>
          {sideWord ? (
            <div className="about-team__side" data-animate={anim !== 'none' ? 'slide-left' : undefined} aria-hidden="true">
              <div className="about-team__side-word" data-word={sideWord}></div>
            </div>
          ) : null}
          <div className="about-team__inner">
            <header className="about-team__header">
              {showArrows ? (
                <>
                  <span className="about-team__arrow about-team__arrow--left" aria-hidden="true">
                    <Icon file="deco-arrow-left.svg" />
                  </span>
                  <span className="about-team__arrow about-team__arrow--right" aria-hidden="true">
                    <Icon file="deco-arrow-right.svg" />
                  </span>
                </>
              ) : null}
              {eyebrow ? <p className="eyebrow eyebrow--center">{eyebrow}</p> : null}
              {heading ? (
                <h2 className="about-team__heading" dangerouslySetInnerHTML={{ __html: heading }} />
              ) : (
                <h2 className="visually-hidden">Our team</h2>
              )}
              {text ? <div className="about-team__text" dangerouslySetInnerHTML={{ __html: text }} /> : null}
            </header>
            <about-team-list className="about-team__list">
              {cards.map((m) => {
                const quoteId = `TeamQuote-${m.id}`;
                const socialId = `TeamSocial-${m.id}`;
                const links = NETWORKS.filter(([key]) => m[key]);
                const controls = [m.quote ? quoteId : '', links.length ? socialId : ''].filter(Boolean).join(' ');
                const toggleLabel = m.quote
                  ? m.name
                    ? `Show the quote of ${m.name}`
                    : 'Show the quote'
                  : m.name
                    ? `Show the social links of ${m.name}`
                    : 'Show the social links';
                const wordEm = Math.max(1, Math.round((m.roleWord ?? '').length * 0.74 * 100) / 100);
                return (
                  <article
                    className="team-member"
                    data-animate={anim !== 'none' ? anim : undefined}
                    style={m.roleWord ? ({ '--word-em': String(wordEm) } as React.CSSProperties) : undefined}
                    key={m.id}
                  >
                    {m.roleWord ? (
                      <div className="team-member__word" data-word={m.roleWord} aria-hidden="true">
                        <span className="team-member__word-echo" data-word={m.roleWord}></span>
                      </div>
                    ) : null}
                    <div className="team-member__media">
                      {m.image ? (
                        <div className="image image--cover">
                          <img
                            src={m.image.src}
                            alt={m.image.alt || m.name || ''}
                            width={800}
                            height={800}
                            loading={loading}
                            sizes={sizes}
                            fetchPriority="auto"
                          />
                        </div>
                      ) : null}
                      {m.name || m.role ? (
                        <div className="team-member__overlay" aria-hidden="true">
                          {m.name ? <p className="team-member__overlay-name">{m.name}</p> : null}
                          {m.role ? <p className="team-member__overlay-role">{m.role}</p> : null}
                        </div>
                      ) : null}
                      {links.length ? (
                        <ul className="team-member__social" id={socialId} role="list">
                          {links.map(([key, label]) => (
                            <li key={key}>
                              <a className="team-member__social-link" href={m[key]} target="_blank" rel="noopener">
                                <Icon name={key} />
                                <span className="visually-hidden">
                                  {m.name ? `${m.name} on ${label}` : label} (opens in a new window)
                                </span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                    <div className="team-member__below">
                      <div className="team-member__caption">
                        {m.name ? <h3 className="team-member__name">{m.name}</h3> : null}
                        {m.role ? <p className="team-member__role">{m.role}</p> : null}
                      </div>
                      {controls ? (
                        <button
                          type="button"
                          className="team-member__toggle"
                          aria-expanded="false"
                          aria-controls={controls}
                          data-member-toggle=""
                          hidden
                        >
                          <span className="visually-hidden">{toggleLabel}</span>
                        </button>
                      ) : null}
                      {m.quote ? (
                        <blockquote className="team-member__quote" id={quoteId}>
                          <p>“{m.quote}”</p>
                        </blockquote>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </about-team-list>
          </div>
        </animate-on-scroll>
      </div>
    </div>
  );
}
