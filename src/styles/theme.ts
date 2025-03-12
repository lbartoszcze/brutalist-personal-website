// Theme configuration for the website

export const colors = {
  mindaro: {
    DEFAULT: '#cff27e',
    100: '#314307',
    200: '#62860d',
    300: '#92c814',
    400: '#b6ec3a',
    500: '#cff27e',
    600: '#d9f597',
    700: '#e2f7b1',
    800: '#ecfacb',
    900: '#f5fce5'
  },
  arylideYellow: {
    DEFAULT: '#f2dd6e',
    100: '#413706',
    200: '#816e0b',
    300: '#c2a511',
    400: '#edcd2d',
    500: '#f2dd6e',
    600: '#f5e38b',
    700: '#f7eaa8',
    800: '#faf1c5',
    900: '#fcf8e2'
  },
  hunyadiYellow: {
    DEFAULT: '#e5b25d',
    100: '#372609',
    200: '#6f4b12',
    300: '#a6711b',
    400: '#dc9625',
    500: '#e5b25d',
    600: '#eac07d',
    700: '#efd09e',
    800: '#f4e0be',
    900: '#faefdf'
  },
  copper: {
    DEFAULT: '#b87d4b',
    100: '#25190f',
    200: '#4a331e',
    300: '#704c2c',
    400: '#95653b',
    500: '#b87d4b',
    600: '#c69870',
    700: '#d4b294',
    800: '#e3ccb8',
    900: '#f1e5db'
  },
  vanDyke: {
    DEFAULT: '#523a34',
    100: '#100c0a',
    200: '#201715',
    300: '#31231f',
    400: '#412e29',
    500: '#523a34',
    600: '#7f5a51',
    700: '#a77f75',
    800: '#c4aaa3',
    900: '#e2d4d1'
  }
};

export const fonts = {
  heading: '"Playfair Display", serif',
  body: '"Inter", sans-serif',
  mono: '"JetBrains Mono", monospace',
  display: '"Montserrat", sans-serif',
};

export const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '3.75rem',
  '7xl': '4.5rem',
  '8xl': '6rem',
  '9xl': '8rem',
};

export const fontWeights = {
  hairline: 100,
  thin: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};

export const lineHeights = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
};

export const letterSpacings = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
};

export const space = {
  px: '1px',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const animations = {
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
  duration: {
    fastest: '100ms',
    faster: '200ms',
    fast: '300ms',
    normal: '400ms',
    slow: '500ms',
    slower: '600ms',
    slowest: '700ms',
  },
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
};

const theme = {
  colors,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  space,
  breakpoints,
  animations,
  shadows,
};

export default theme; 