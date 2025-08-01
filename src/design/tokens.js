// src/design/tokens.js

/** 
 * Design tokens: light and dark themes based on your logo colors.
 */

export const light = {
  colors: {
    background: '#F2EBE2',
    card: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#2F6F6B',
    secondary: '#58A199',
    accent: '#E9C46A',
    text: '#1F3335',
    muted: '#8FA6B0',
    border: '#DDE3E8',
    highlight: '#282B44',
    error: '#E76F51',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    heading: { fontSize: 24, fontWeight: '600' },
    subheading: { fontSize: 18, fontWeight: '500' },
    body: { fontSize: 16, fontWeight: '400' },
    caption: { fontSize: 12, fontWeight: '400' },
  },
};

export const dark = {
  colors: {
    background: '#0F1F24',
    card: '#1F2E35',
    surface: '#1F2E35',
    primary: '#58A199',
    secondary: '#2F6F6B',
    accent: '#E9C46A',
    text: '#E8EEF1',
    muted: '#6F8A9B',
    border: '#2E3F4A',
    highlight: '#282B44',
    error: '#E76F51',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    heading: { fontSize: 24, fontWeight: '600' },
    subheading: { fontSize: 18, fontWeight: '500' },
    body: { fontSize: 16, fontWeight: '400' },
    caption: { fontSize: 12, fontWeight: '400' },
  },
};

/**
 * Optional helper if you want to pick programmatically
 */
export function getTheme(mode = 'dark') {
  return mode === 'light' ? light : dark;
}
