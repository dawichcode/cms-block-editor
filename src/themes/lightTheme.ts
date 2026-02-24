import { Theme } from './types';

export const lightTheme: Theme = {
  name: 'light',
  colors: {
    // Primary colors
    primary: '#667eea',
    primaryHover: '#5568d3',
    primaryLight: '#e0e7ff',
    primaryDark: '#4c51bf',
    
    // Secondary colors
    secondary: '#764ba2',
    secondaryHover: '#6a3f8f',
    
    // Neutral colors
    background: '#ffffff',
    surface: '#f9fafb',
    border: '#e5e7eb',
    divider: '#d1d5db',
    
    // Text colors
    textPrimary: '#1f2937',
    textSecondary: '#6b7280',
    textDisabled: '#9ca3af',
    
    // Status colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    
    // Editor specific
    editorBackground: '#ffffff',
    editorText: '#1f2937',
    editorPlaceholder: '#9ca3af',
    toolbarBackground: '#f9fafb',
    toolbarText: '#374151',
    toolbarBorder: '#e5e7eb',
    
    // Selection and highlights
    selection: '#dbeafe',
    highlight: '#fef3c7',
    focus: '#667eea',
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontFamilyMono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
    
    // Font sizes
    fontSizeXs: '0.75rem',    // 12px
    fontSizeSm: '0.875rem',   // 14px
    fontSizeMd: '1rem',       // 16px
    fontSizeLg: '1.125rem',   // 18px
    fontSizeXl: '1.25rem',    // 20px
    
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
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    xxl: '3rem',     // 48px
  },
  borderRadius: {
    none: '0',
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    full: '9999px',
  },
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
};
