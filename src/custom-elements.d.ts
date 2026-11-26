// The theme's web components (<product-card>, <sticky-header>, ...) are plain custom elements.
import 'react';
declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [tag: `${string}-${string}`]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, unknown>;
    }
  }
}
