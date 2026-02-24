import { Theme } from './types';

export const lightTheme: Theme = {
  name: 'light',
  mode: 'light',
  colors: {
    // Primary colors
    primary: '#667eea',
    primaryHover: '#5568d3',
    primaryLight: '#e0e7ff',
    primaryDark: '#4c51bf',
    primaryContrast: '#ffffff',
    
    // Secondary colors
    secondary: '#764ba2',
    secondaryHover: '#6a3f8f',
    secondaryLight: '#f3e8ff',
    secondaryDark: '#5b2c7d',
    secondaryContrast: '#ffffff',
    
    // Accent colors
    accent: '#f59e0b',
    accentHover: '#d97706',
    accentLight: '#fef3c7',
    accentDark: '#b45309',
    
    // Neutral colors
    background: '#ffffff',
    backgroundAlt: '#fafafa',
    surface: '#f9fafb',
    surfaceHover: '#f3f4f6',
    surfaceActive: '#e5e7eb',
    border: '#e5e7eb',
    borderHover: '#d1d5db',
    divider: '#d1d5db',
    overlay: 'rgba(0, 0, 0, 0.5)',
    
    // Text colors
    textPrimary: '#1f2937',
    textSecondary: '#6b7280',
    textTertiary: '#9ca3af',
    textDisabled: '#d1d5db',
    textInverse: '#ffffff',
    
    // Status colors
    success: '#10b981',
    successLight: '#d1fae5',
    successDark: '#065f46',
    warning: '#f59e0b',
    warningLight: '#fef3c7',
    warningDark: '#b45309',
    error: '#ef4444',
    errorLight: '#fee2e2',
    errorDark: '#991b1b',
    info: '#3b82f6',
    infoLight: '#dbeafe',
    infoDark: '#1e40af',
    
    // Editor specific
    editorBackground: '#ffffff',
    editorText: '#1f2937',
    editorPlaceholder: '#9ca3af',
    editorCursor: '#667eea',
    toolbarBackground: '#f9fafb',
    toolbarText: '#374151',
    toolbarBorder: '#e5e7eb',
    toolbarIconHover: '#667eea',
    
    // Selection and highlights
    selection: '#dbeafe',
    selectionText: '#1f2937',
    highlight: '#fef3c7',
    highlightText: '#1f2937',
    focus: '#667eea',
    focusRing: 'rgba(102, 126, 234, 0.5)',
    
    // Code editor colors
    codeBackground: '#f3f4f6',
    codeText: '#1f2937',
    codeComment: '#6b7280',
    codeKeyword: '#8b5cf6',
    codeString: '#10b981',
    codeNumber: '#f59e0b',
    codeFunction: '#3b82f6',
    codeOperator: '#ef4444',
  },
  typography: {
    // Font families
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontFamilyHeading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontFamilyMono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
    
    // Font sizes
    fontSizeXxs: '0.625rem',  // 10px
    fontSizeXs: '0.75rem',    // 12px
    fontSizeSm: '0.875rem',   // 14px
    fontSizeMd: '1rem',       // 16px
    fontSizeLg: '1.125rem',   // 18px
    fontSizeXl: '1.25rem',    // 20px
    fontSizeXxl: '1.5rem',    // 24px
    fontSize3xl: '1.875rem',  // 30px
    fontSize4xl: '2.25rem',   // 36px
    
    // Font weights
    fontWeightLight: 300,
    fontWeightNormal: 400,
    fontWeightMedium: 500,
    fontWeightSemibold: 600,
    fontWeightBold: 700,
    fontWeightExtrabold: 800,
    
    // Line heights
    lineHeightTight: 1.25,
    lineHeightSnug: 1.375,
    lineHeightNormal: 1.5,
    lineHeightRelaxed: 1.625,
    lineHeightLoose: 2,
    
    // Letter spacing
    letterSpacingTight: '-0.025em',
    letterSpacingNormal: '0',
    letterSpacingWide: '0.025em',
    letterSpacingWider: '0.05em',
  },
  spacing: {
    xxs: '0.125rem',  // 2px
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    xxl: '3rem',      // 48px
    xxxl: '4rem',     // 64px
  },
  borderRadius: {
    none: '0',
    xs: '0.125rem',   // 2px
    sm: '0.25rem',    // 4px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    xxl: '1.5rem',    // 24px
    full: '9999px',
  },
  shadows: {
    none: 'none',
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    xxl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    outline: '0 0 0 3px rgba(102, 126, 234, 0.5)',
  },
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
    verySlow: '700ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px',
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
  animations: {
    fadeIn: 'fadeIn 0.3s ease-in-out',
    fadeOut: 'fadeOut 0.3s ease-in-out',
    slideUp: 'slideUp 0.3s ease-out',
    slideDown: 'slideDown 0.3s ease-out',
    slideLeft: 'slideLeft 0.3s ease-out',
    slideRight: 'slideRight 0.3s ease-out',
    scaleUp: 'scaleUp 0.2s ease-out',
    scaleDown: 'scaleDown 0.2s ease-out',
    spin: 'spin 1s linear infinite',
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    bounce: 'bounce 1s infinite',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    secondary: 'linear-gradient(135deg, #764ba2 0%, #f093fb 100%)',
    accent: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    sunset: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
    ocean: 'linear-gradient(135deg, #0891b2 0%, #3b82f6 100%)',
    forest: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    fire: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
    ice: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
    purple: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
    rainbow: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
  },
};
