/**
 * Locations map (theme: sections/locations-map.liquid + blocks/_map-pin.liquid): eyebrow + heading, filter
 * buttons (one per location type) and a dark world map with one pin per place.
 * <location-map> (theme JS) shows the filter bar (hidden in the markup) when 2+ types have pins, filters the
 * pins and fills the hidden status line. Pin positions are % of the map IMAGE (the stage keeps its shape).
 */
import { screenClasses, screenVars, type ScreenOptions } from '@/components/ContactShared';
import type { PageContext } from '@/components/PageRenderer';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

export interface MapPin {
  name: string;
  typeLabel?: string; // small text under the name ("Flagship")
  types?: string[]; // location types it belongs to (names from `filterTypes`)
  x: number; // % across the image
  y: number; // % down the image
}

export interface LocationsMapProps extends SectionCommon, ScreenOptions {
  eyebrow?: string;
  heading?: string; // HTML: <em> = accent word
  showFilters?: boolean;
  filterAll?: string;
  filterTypes?: string[];
  image?: { src: string; width: number; height: number; alt?: string };
  ratio?: number; // box shape on desktop (width / height)
  ratioMobile?: number; // box shape on phones
  focusX?: number; // 0–100
  focusY?: number; // 0–100
  animation?: 'fade-up' | 'none';
  pins: MapPin[];
}

const handleize = (s: string) =>
  s
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export default function LocationsMap({
  id,
  context,
  eyebrow,
  heading,
  showFilters = true,
  filterAll = 'All locations',
  filterTypes = [],
  image = { src: '/cdn/shop/t/8/assets/world-map-night.webp', width: 1536, height: 1024 },
  ratio = 2.695,
  ratioMobile = 1.1,
  focusX = 50,
  focusY = 32,
  animation = 'fade-up',
  pins,
  fillScreen,
  scaleScreen,
  textBoost,
  ...common
}: LocationsMapProps & { id: string; context?: PageContext }) {
  const first = (context?.index ?? 0) === 0;
  const anim = first ? 'none' : animation;
  const animAttr = (name: string) => (anim !== 'none' ? { 'data-animate': name } : {});
  const shown = (pins ?? []).filter((p) => p.name);
  const imageRatio = Math.round((image.width / image.height) * 1000) / 1000;
  const types = filterTypes.map((t) => t.trim()).filter(Boolean);

  return (
    <div id={`section-${id}`} className="shopify-section">
      <div
        className={`locations-map full-width section-width--${common.width ?? 'widest'} color-${common.colorScheme ?? 'scheme-2'}${screenClasses({ fillScreen, scaleScreen })}`}
        style={sectionStyle(
          { paddingTop: common.paddingTop ?? 64, paddingBottom: common.paddingBottom ?? 96 },
          screenVars({ scaleScreen, textBoost }),
        )}
      >
        <animate-on-scroll className="locations-map__inner">
          <location-map>
            <div className="locations-map__header">
              {eyebrow || heading ? (
                <div className="locations-map__titles" {...animAttr('slide-left')}>
                  {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
                  {heading ? <h2 className="h1 locations-map__heading" dangerouslySetInnerHTML={{ __html: heading }} /> : null}
                </div>
              ) : null}
              {showFilters && shown.length > 1 ? (
                <>
                  {/* Hidden until the script sees 2+ types with pins; no JS = every pin shows */}
                  <div
                    className="locations-map__filters"
                    role="group"
                    aria-label="Filter locations"
                    data-map-filters=""
                    hidden
                    {...animAttr('fade-up')}
                  >
                    <button type="button" className="locations-map__filter" data-filter="all" aria-pressed="true">
                      {filterAll}
                    </button>
                    {types.map((t) => (
                      <button type="button" className="locations-map__filter" data-filter={handleize(t)} aria-pressed="false" hidden key={t}>
                        {t}
                      </button>
                    ))}
                  </div>
                  <p
                    className="visually-hidden"
                    role="status"
                    data-map-status=""
                    data-one="[count] location shows"
                    data-other="[count] locations show"
                  ></p>
                </>
              ) : null}
            </div>

            <div
              className="locations-map__map"
              style={
                {
                  '--map-ratio': String(ratio),
                  '--map-ratio-mobile': String(ratioMobile),
                  '--image-ratio': String(imageRatio),
                  '--focus-x': String(focusX / 100),
                  '--focus-y': String(focusY / 100),
                } as React.CSSProperties
              }
              {...animAttr('fade-up')}
            >
              <div className="locations-map__stage">
                <img
                  className="locations-map__image"
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  alt={image.alt ?? ''}
                  loading={first ? 'eager' : 'lazy'}
                  {...(first ? { fetchPriority: 'high' as const } : {})}
                />
                <div className="locations-map__pins">
                  {shown.map((p, i) => (
                    <div
                      className="map-pin"
                      data-pin-type={(p.types ?? []).map((t) => `${handleize(t)} `).join('')}
                      style={{ '--pin-x': `${p.x}%`, '--pin-y': `${p.y}%` } as React.CSSProperties}
                      key={i}
                    >
                      {/* The reveal sits on the inner element: the outer one is placed with transform */}
                      <div className="map-pin__inner" {...animAttr('zoom-in')}>
                        <span className="map-pin__dot" aria-hidden="true"></span>
                        <p className="map-pin__label">
                          <span className="map-pin__name">{p.name}</span>
                          {p.typeLabel ? <span className="map-pin__type">{p.typeLabel}</span> : null}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </location-map>
        </animate-on-scroll>
      </div>
    </div>
  );
}
