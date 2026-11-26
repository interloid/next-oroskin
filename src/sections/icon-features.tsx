/**
 * Icon features: a row of round icon badges with a title and a short text (theme: sections/icon-features.liquid).
 * PATTERN FILE for all sections: markup copied from src/sections/generated/*, content from typed props.
 */
import Icon from '@/components/Icon';
import type { PageContext } from '@/components/PageRenderer';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

export interface IconFeaturesProps extends SectionCommon {
  heading?: string;
  showHeading?: boolean;
  style?: 'plain' | 'card';
  columnsDesktop?: number;
  columnsPhone?: 1 | 2;
  iconColor?: string;
  features: {
    icon: string; // icon name from public/assets/icon-<name>.svg: truck, shield-check, return, headset, leaf, ...
    title: string;
    text?: string; // HTML
    link?: string;
  }[];
}

export default function IconFeatures({
  id,
  heading = 'Our promises',
  showHeading = false,
  style = 'plain',
  columnsDesktop = 4,
  columnsPhone = 2,
  iconColor,
  features,
  ...common
}: IconFeaturesProps & { id: string; context?: PageContext }) {
  if (!features?.length) return null;
  return (
    <div id={`section-${id}`} className="shopify-section">
      <div
        className={`icon-features icon-features--${style} full-width section-width--${common.width ?? 'widest'} color-${common.colorScheme ?? 'scheme-1'}`}
        style={sectionStyle(common, {
          '--columns-desktop': String(columnsDesktop),
          '--columns-mobile': String(columnsPhone),
          ...(iconColor ? { '--icon-feature-color': iconColor } : {}),
        })}
      >
        <animate-on-scroll className="icon-features__inner">
          <h2 className={`icon-features__heading${showHeading ? '' : ' visually-hidden'}`}>{heading}</h2>
          <div
            className="icon-features__grid"
            data-columns-phone={columnsPhone}
            data-columns-tablet={Math.min(3, columnsDesktop)}
            data-columns-tablet-wide={Math.min(4, columnsDesktop)}
            data-columns-desktop={columnsDesktop}
          >
            {features.map((f, i) => (
              <div className="icon-feature" data-animate="slide-bottom" key={i}>
                <span className="icon-feature__badge">
                  <Icon name={f.icon} />
                </span>
                <h3 className="icon-feature__title">{f.link ? <a href={f.link}>{f.title}</a> : f.title}</h3>
                {f.text ? <div className="icon-feature__text rte" dangerouslySetInnerHTML={{ __html: f.text }} /> : null}
              </div>
            ))}
          </div>
        </animate-on-scroll>
      </div>
    </div>
  );
}
