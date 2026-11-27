/** Call-to-action card (theme: sections/cta-card.liquid): a wide card with a title and a line and one or two buttons. */
import type { PageContext } from '@/components/PageRenderer';
import { FaqContact, rootProps, type CtaCardProps, type PageScreenOptions } from '@/sections/_page-shared';
import type { SectionCommon } from '@/sections/shared';

export default function CtaCard({
  id,
  heading,
  text,
  buttonLabel,
  buttonLink,
  secondLabel,
  secondLink,
  style = 'tinted',
  ...common
}: CtaCardProps & SectionCommon & PageScreenOptions & { id: string; context?: PageContext }) {
  if (!heading && !text && !buttonLabel && !secondLabel) return null;
  return (
    <div id={`shopify-section-${id}`} className="shopify-section">
      <div {...rootProps('cta-card', common, { top: 48, bottom: 96 })}>
        <div className="cta-card__inner">
          <FaqContact {...{ heading, text, buttonLabel, buttonLink, secondLabel, secondLink, style }} className="cta-card__card" />
        </div>
      </div>
    </div>
  );
}
