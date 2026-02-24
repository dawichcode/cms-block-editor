import { Theme } from './types';

export const darkTheme: Theme = {
  name: 'dark',
  colors: {
    // Primary colors
    primary: '#818cf8',
    primaryHover: '#6366f1',
    primaryLight: '#312e81',
    primaryDark: '#4f46e5',
    
    // Secondary colors
    secondary: '#a78bfa',
    secondaryHover: '#8b5cf6',
    
    // Neutral colors
    background: '#111827',
    surface: '#1f2937',
    border: '#374151',
    divider: '#4b5563',
    
    // Text colors
    textPrimary: '#f9fafb',
    textSecondary: '#d1d5db',
    textDisabled: '#6b7280',
    
    // Status colors
    success: '#34d399',
    warning: '#fbbf24',
    error: '#f87171',
    info: '#60a5fa',
    
    // Editor specific
    editorBackground: '#1f2937',
    editorText: '#f9fafb',
    editorPlaceholder: '#6b7280',
    toolbarBackground: '#111827',
    toolbarText: '#e5e7eb',
    toolbarBorder: '#374151',
    
    // Selection and highlights
    selection: '#1e3a8a',
    highlight: '#78350f',
    focus: '#818cf8',
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontFamilyMono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
    
    // Font sizes
    fontSizeXs: '0.75rem',
    fontSizeSm: '0.875rem',
    fontSizeMd: '1rem',
    fontSizeLg: '1.125rem',
    fontSizeXl: '1.25rem',
    
    // Font weights
    fontWeightNormal: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    
    // Line heights
    lineHeightTight: 1.25,
    lineHeightNormal: 1.5,
    lineHeightRelaxed: 1.75,
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    full: '9999px',
  },
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
  },
};
