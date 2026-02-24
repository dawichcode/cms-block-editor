import { Theme } from './types';
import { lightTheme } from './lightTheme';
import { darkTheme } from './darkTheme';

// Ocean theme - Blue and teal
export const oceanTheme: Theme = {
  ...lightTheme,
  name: 'ocean',
  colors: {
    ...lightTheme.colors,
    primary: '#0891b2',
    primaryHover: '#0e7490',
    primaryLight: '#cffafe',
    primaryDark: '#155e75',
    secondary: '#06b6d4',
    secondaryHover: '#0891b2',
    focus: '#0891b2',
  },
};

// Forest theme - Green and earthy
export const forestTheme: Theme = {
  ...lightTheme,
  name: 'forest',
  colors: {
    ...lightTheme.colors,
    primary: '#059669',
    primaryHover: '#047857',
    primaryLight: '#d1fae5',
    primaryDark: '#065f46',
    secondary: '#10b981',
    secondaryHover: '#059669',
    focus: '#059669',
  },
};

// Sunset theme - Orange and warm
export const sunsetTheme: Theme = {
  ...lightTheme,
  name: 'sunset',
  colors: {
    ...lightTheme.colors,
    primary: '#f97316',
    primaryHover: '#ea580c',
    primaryLight: '#ffedd5',
    primaryDark: '#c2410c',
    secondary: '#fb923c',
    secondaryHover: '#f97316',
    focus: '#f97316',
  },
};

// Rose theme - Pink and elegant
export const roseTheme: Theme = {
  ...lightTheme,
  name: 'rose',
  colors: {
    ...lightTheme.colors,
    primary: '#e11d48',
    primaryHover: '#be123c',
    primaryLight: '#ffe4e6',
    primaryDark: '#9f1239',
    secondary: '#f43f5e',
    secondaryHover: '#e11d48',
    focus: '#e11d48',
  },
};

// Midnight theme - Dark blue
export const midnightTheme: Theme = {
  ...darkTheme,
  name: 'midnight',
  colors: {
    ...darkTheme.colors,
    background: '#0f172a',
    surface: '#1e293b',
    border: '#334155',
    divider: '#475569',
    primary: '#3b82f6',
    primaryHover: '#2563eb',
    primaryLight: '#1e3a8a',
    primaryDark: '#1d4ed8',
    toolbarBackground: '#0f172a',
  },
};

// Dracula theme - Purple dark
export const draculaTheme: Theme = {
  ...darkTheme,
  name: 'dracula',
  colors: {
    ...darkTheme.colors,
    background: '#282a36',
    surface: '#44475a',
    border: '#6272a4',
    divider: '#6272a4',
    primary: '#bd93f9',
    primaryHover: '#a78bfa',
    primaryLight: '#44475a',
    primaryDark: '#9580ff',
    secondary: '#ff79c6',
    secondaryHover: '#ff6ac1',
    editorBackground: '#282a36',
    toolbarBackground: '#21222c',
    textPrimary: '#f8f8f2',
    textSecondary: '#6272a4',
  },
};

// Monokai theme - Classic code editor
export const monokaiTheme: Theme = {
  ...darkTheme,
  name: 'monokai',
  colors: {
    ...darkTheme.colors,
    background: '#272822',
    surface: '#3e3d32',
    border: '#49483e',
    divider: '#75715e',
    primary: '#a6e22e',
    primaryHover: '#8fd12a',
    primaryLight: '#3e3d32',
    primaryDark: '#7fb922',
    secondary: '#f92672',
    secondaryHover: '#e01e5a',
    editorBackground: '#272822',
    toolbarBackground: '#1e1f1c',
    textPrimary: '#f8f8f2',
    textSecondary: '#75715e',
  },
};

// Minimal theme - Clean and simple
export const minimalTheme: Theme = {
  ...lightTheme,
  name: 'minimal',
  colors: {
    ...lightTheme.colors,
    primary: '#000000',
    primaryHover: '#1f2937',
    primaryLight: '#f3f4f6',
    primaryDark: '#000000',
    secondary: '#4b5563',
    secondaryHover: '#374151',
    border: '#e5e7eb',
    focus: '#000000',
  },
  borderRadius: {
    none: '0',
    xs: '0',
    sm: '0',
    md: '0',
    lg: '0',
    xl: '0',
    xxl: '0',
    full: '0',
  },
};

export const presetThemes = {
  light: lightTheme,
  dark: darkTheme,
  ocean: oceanTheme,
  forest: forestTheme,
  sunset: sunsetTheme,
  rose: roseTheme,
  midnight: midnightTheme,
  dracula: draculaTheme,
  monokai: monokaiTheme,
  minimal: minimalTheme,
};

export type PresetThemeName = keyof typeof presetThemes;
