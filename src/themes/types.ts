export interface ThemeColors {
  // Primary colors
  primary: string;
  primaryHover: string;
  primaryLight: string;
  primaryDark: string;
  primaryContrast: string; // Text color on primary background
  
  // Secondary colors
  secondary: string;
  secondaryHover: string;
  secondaryLight: string;
  secondaryDark: string;
  secondaryContrast: string;
  
  // Accent colors
  accent: string;
  accentHover: string;
  accentLight: string;
  accentDark: string;
  
  // Neutral colors
  background: string;
  backgroundAlt: string; // Alternative background
  surface: string;
  surfaceHover: string;
  surfaceActive: string;
  border: string;
  borderHover: string;
  divider: string;
  overlay: string; // Modal overlay
  
  // Text colors
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textDisabled: string;
  textInverse: string; // Text on dark backgrounds
  
  // Status colors
  success: string;
  successLight: string;
  successDark: string;
  warning: string;
  warningLight: string;
  warningDark: string;
  error: string;
  errorLight: string;
  errorDark: string;
  info: string;
  infoLight: string;
  infoDark: string;
  
  // Editor specific
  editorBackground: string;
  editorText: string;
  editorPlaceholder: string;
  editorCursor: string;
  toolbarBackground: string;
  toolbarText: string;
  toolbarBorder: string;
  toolbarIconHover: string;
  
  // Selection and highlights
  selection: string;
  selectionText: string;
  highlight: string;
  highlightText: string;
  focus: string;
  focusRing: string;
  
  // Code editor colors
  codeBackground: string;
  codeText: string;
  codeComment: string;
  codeKeyword: string;
  codeString: string;
  codeNumber: string;
  codeFunction: string;
  codeOperator: string;
}

export interface ThemeTypography {
  // Font families
  fontFamily: string;
  fontFamilyHeading: string;
  fontFamilyMono: string;
  
  // Font sizes
  fontSizeXxs: string;
  fontSizeXs: string;
  fontSizeSm: string;
  fontSizeMd: string;
  fontSizeLg: string;
  fontSizeXl: string;
  fontSizeXxl: string;
  fontSize3xl: string;
  fontSize4xl: string;
  
  // Font weights
  fontWeightLight: number;
  fontWeightNormal: number;
  fontWeightMedium: number;
  fontWeightSemibold: number;
  fontWeightBold: number;
  fontWeightExtrabold: number;
  
  // Line heights
  lineHeightTight: number;
  lineHeightSnug: number;
  lineHeightNormal: number;
  lineHeightRelaxed: number;
  lineHeightLoose: number;
  
  // Letter spacing
  letterSpacingTight: string;
  letterSpacingNormal: string;
  letterSpacingWide: string;
  letterSpacingWider: string;
}

export interface ThemeSpacing {
  xxs: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  xxxl: string;
}

export interface ThemeBorderRadius {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  full: string;
}

export interface ThemeShadows {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  inner: string;
  outline: string;
}

export interface ThemeTransitions {
  fast: string;
  normal: string;
  slow: string;
  verySlow: string;
}

export interface ThemeBreakpoints {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

export interface ThemeZIndex {
  dropdown: number;
  sticky: number;
  fixed: number;
  modalBackdrop: number;
  modal: number;
  popover: number;
  tooltip: number;
}

export interface ThemeAnimations {
  fadeIn: string;
  fadeOut: string;
  slideUp: string;
  slideDown: string;
  slideLeft: string;
  slideRight: string;
  scaleUp: string;
  scaleDown: string;
  spin: string;
  pulse: string;
  bounce: string;
}

export interface ThemeGradients {
  primary: string;
  secondary: string;
  accent: string;
  sunset: string;
  ocean: string;
  forest: string;
  fire: string;
  ice: string;
  purple: string;
  rainbow: string;
}

export interface ThemeCustom {
  [key: string]: any;
}

export interface Theme {
  name: string;
  mode: 'light' | 'dark';
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  shadows: ThemeShadows;
  transitions: ThemeTransitions;
  breakpoints: ThemeBreakpoints;
  zIndex: ThemeZIndex;
  animations: ThemeAnimations;
  gradients: ThemeGradients;
  custom?: ThemeCustom;
}

export type ThemeMode = 'light' | 'dark' | 'auto';

export interface ThemeOverride {
  colors?: Partial<ThemeColors>;
  typography?: Partial<ThemeTypography>;
  spacing?: Partial<ThemeSpacing>;
  borderRadius?: Partial<ThemeBorderRadius>;
  shadows?: Partial<ThemeShadows>;
  transitions?: Partial<ThemeTransitions>;
  breakpoints?: Partial<ThemeBreakpoints>;
  zIndex?: Partial<ThemeZIndex>;
  animations?: Partial<ThemeAnimations>;
  gradients?: Partial<ThemeGradients>;
  custom?: ThemeCustom;
}

export interface ThemeConfig {
  theme: Theme;
  override?: ThemeOverride;
  cssVariablePrefix?: string;
  enableAnimations?: boolean;
  enableTransitions?: boolean;
  enableGradients?: boolean;
}
