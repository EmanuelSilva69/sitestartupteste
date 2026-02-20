/**
 * FLUID TYPOGRAPHY UTILITY
 * Provides React inline styles for fluid typography using CSS custom properties
 * Maps to --text-fluid-* variables defined in globals.css
 */

import { CSSProperties } from 'react';

export const fluidText = {
  xs: { fontSize: 'var(--text-fluid-xs)' } as CSSProperties,
  sm: { fontSize: 'var(--text-fluid-sm)' } as CSSProperties,
  base: { fontSize: 'var(--text-fluid-base)' } as CSSProperties,
  lg: { fontSize: 'var(--text-fluid-lg)' } as CSSProperties,
  xl: { fontSize: 'var(--text-fluid-xl)' } as CSSProperties,
  '2xl': { fontSize: 'var(--text-fluid-2xl)' } as CSSProperties,
  '3xl': { fontSize: 'var(--text-fluid-3xl)' } as CSSProperties,
};

/**
 * Utility to merge fluid text with additional styles
 */
export function withFluidText(
  size: keyof typeof fluidText,
  additionalStyles?: CSSProperties
): CSSProperties {
  return { ...fluidText[size], ...additionalStyles };
}
