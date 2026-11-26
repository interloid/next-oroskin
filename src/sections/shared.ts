/** Settings every section shares (theme: Spacing / Colors / Section width groups). */
export interface SectionCommon {
  colorScheme?: 'scheme-1' | 'scheme-2' | 'scheme-3' | 'scheme-4' | 'scheme-5'; // cream, white, red, gold, dark
  width?: 'narrow' | 'standard' | 'wide' | 'widest' | 'full';
  paddingTop?: number; // px
  paddingBottom?: number; // px
}

/** The section's padding variables plus any section-specific CSS variables. */
export function sectionStyle(common: SectionCommon, vars: Record<string, string> = {}): React.CSSProperties {
  return {
    '--section-padding-top': `${common.paddingTop ?? 80}px`,
    '--section-padding-bottom': `${common.paddingBottom ?? 80}px`,
    ...vars,
  } as React.CSSProperties;
}
