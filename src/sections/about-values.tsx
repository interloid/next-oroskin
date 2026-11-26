/**
 * About values (theme: sections/about-values.liquid + blocks/_value-card.liquid): "Our core Values" cards with a
 * round icon, a pale CSS-counter number, title and text; the first card can be featured (wide, with a photo).
 */
import Icon from '@/components/Icon';
import { aboutScreenVars, FontFace, type AboutImage, type AboutScreenOptions } from '@/components/AboutShared';
import type { PageContext } from '@/components/PageRenderer';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

export interface AboutValue {
  icon?: string; // public/assets/icon-<name>.svg: diamond, lashes, heart-bold, graduation, globe, sparkle, shield, users, 'none'
  title?: string;
  text?: string; // HTML
  image?: AboutImage;
}

export interface AboutValuesProps extends SectionCommon, AboutScreenOptions {
  eyebrow?: string;
  heading?: string; // HTML: <em> = accent word
  featureFirst?: boolean;
  animation?: 'fade-up' | 'none';
  values: AboutValue[];
}

export default function AboutValues({
  id,
  context,
  eyebrow,
  heading,
  featureFirst = true,
  animation = 'fade-up',
  values,
  ...common
}: AboutValuesProps & { id: string; context?: PageContext }) {
  const cards = (values ?? []).filter((v) => v.title || v.text || v.image);
  if (!cards.length) return null;
  const anim = (context?.index ?? 0) === 0 ? 'none' : animation;
  const scale = common.scaleScreen ?? true;
  const sizes =
    common.width === 'narrow'
      ? '(min-width: 1200px) min(30vw, 340px), (min-width: 750px) 42vw, 36vw'
      : '(min-width: 1200px) 30vw, (min-width: 750px) 42vw, 36vw';
  const loading = (context?.index ?? 0) === 0 ? 'eager' : 'lazy';

  return (
    <div id={`section-${id}`} className="shopify-section">
      <FontFace fonts={['newsreader_n2', 'newsreader_n6']} />
      <div
        className={`about-values full-width section-width--${common.width ?? 'widest'} color-${common.colorScheme ?? 'scheme-2'}${scale ? ' section--screen-scale' : ''}`}
        style={sectionStyle({ paddingTop: 120, paddingBottom: 120, ...common }, aboutScreenVars(common))}
      >
        <div className="about-values__inner">
          <header className="about-values__header">
            {eyebrow ? <p className="eyebrow eyebrow--center">{eyebrow}</p> : null}
            {heading ? (
              <h2 className="about-values__heading" dangerouslySetInnerHTML={{ __html: heading }} />
            ) : (
              <h2 className="visually-hidden">Our values</h2>
            )}
          </header>
          <animate-on-scroll className={`about-values__list${featureFirst ? ' about-values__list--feature' : ''}`}>
            {cards.map((v, i) => {
              const icon = v.icon ?? 'diamond';
              return (
                <article
                  className={`value-card${v.image ? ' value-card--media' : ''}`}
                  data-animate={anim !== 'none' ? anim : undefined}
                  key={i}
                >
                  <div className="value-card__body">
                    <div className="value-card__top">
                      {icon !== 'none' ? (
                        <span className="value-card__icon" aria-hidden="true">
                          <Icon name={icon} />
                        </span>
                      ) : null}
                      <span className="value-card__number" aria-hidden="true"></span>
                    </div>
                    {v.title ? <h3 className="value-card__title">{v.title}</h3> : null}
                    {v.text ? <div className="value-card__text" dangerouslySetInnerHTML={{ __html: v.text }} /> : null}
                  </div>
                  {v.image ? (
                    <div className="value-card__media">
                      <div className="image image--cover">
                        <img
                          src={v.image.src}
                          alt=""
                          width={v.image.width}
                          height={v.image.height}
                          loading={loading}
                          sizes={sizes}
                          fetchPriority="auto"
                        />
                      </div>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </animate-on-scroll>
        </div>
      </div>
    </div>
  );
}
