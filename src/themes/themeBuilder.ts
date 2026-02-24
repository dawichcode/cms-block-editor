import { Theme, ThemeOverride } from './types';

/**
 * Deep merge two objects
 */
function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const result = { ...target };
  
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {}, source[key] as any);
    } else if (source[key] !== undefined) {
      result[key] = source[key] as any;
    }
  }
  
  return result;
}

/**
 * Create a custom theme by extending a base theme
 */
export function createTheme(baseTheme: Theme, override: ThemeOverride): Theme {
  return deepMerge(baseTheme, override as Partial<Theme>);
}

/**
 * Generate color variations from a base color
 */
export function generateColorVariations(baseColor: string): {
  base: string;
  light: string;
  lighter: string;
  dark: string;
  darker: string;
  contrast: string;
} {
  // This is a simplified version - in production, use a color manipulation library
  return {
    base: baseColor,
    light: adjustBrightness(baseColor, 20),
    lighter: adjustBrightness(baseColor, 40),
    dark: adjustBrightness(baseColor, -20),
    darker: adjustBrightness(baseColor, -40),
    contrast: getContrastColor(baseColor),
  };
}

/**
 * Adjust color brightness
 */
function adjustBrightness(color: string, percent: number): string {
  // Convert hex to RGB
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Adjust brightness
  const adjust = (value: number) => {
    const adjusted = value + (value * percent / 100);
    return Math.max(0, Math.min(255, Math.round(adjusted)));
  };
  
  const newR = adjust(r);
  const newG = adjust(g);
  const newB = adjust(b);
  
  // Convert back to hex
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

/**
 * Get contrasting color (black or white) for a given color
 */
function getContrastColor(color: string): string {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

/**
 * Create a gradient from two colors
 */
export function createGradient(
  color1: string,
  color2: string,
  angle: number = 135
): string {
  return `linear-gradient(${angle}deg, ${color1} 0%, ${color2} 100%)`;
}

/**
 * Generate a complete color palette from a primary color
 */
export function generatePalette(primaryColor: string): {
  primary: ReturnType<typeof generateColorVariations>;
  secondary: ReturnType<typeof generateColorVariations>;
  accent: ReturnType<typeof generateColorVariations>;
} {
  const primary = generateColorVariations(primaryColor);
  
  // Generate complementary colors
  const secondaryColor = rotateHue(primaryColor, 180);
  const accentColor = rotateHue(primaryColor, 60);
  
  return {
    primary,
    secondary: generateColorVariations(secondaryColor),
    accent: generateColorVariations(accentColor),
  };
}

/**
 * Rotate hue of a color
 */
function rotateHue(color: string, degrees: number): string {
  // Simplified version - in production, use a proper color library
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Convert to HSL, rotate hue, convert back
  // This is a placeholder - implement proper HSL conversion
  return color; // Return original for now
}

/**
 * Validate theme structure
 */
export function validateTheme(theme: Theme): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!theme.name) {
    errors.push('Theme name is required');
  }
  
  if (!theme.colors) {
    errors.push('Theme colors are required');
  }
  
  if (!theme.typography) {
    errors.push('Theme typography is required');
  }
  
  // Validate color format
  const colorKeys = Object.keys(theme.colors || {});
  for (const key of colorKeys) {
    const color = (theme.colors as any)[key];
    if (typeof color === 'string' && !isValidColor(color)) {
      errors.push(`Invalid color format for ${key}: ${color}`);
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Check if a string is a valid color
 */
function isValidColor(color: string): boolean {
  // Check hex colors
  if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)) {
    return true;
  }
  
  // Check rgb/rgba
  if (/^rgba?\(/.test(color)) {
    return true;
  }
  
  // Check hsl/hsla
  if (/^hsla?\(/.test(color)) {
    return true;
  }
  
  // Check CSS color names
  const cssColors = ['transparent', 'currentColor', 'inherit'];
  if (cssColors.includes(color)) {
    return true;
  }
  
  return false;
}

/**
 * Export theme as JSON
 */
export function exportTheme(theme: Theme): string {
  return JSON.stringify(theme, null, 2);
}

/**
 * Import theme from JSON
 */
export function importTheme(json: string): Theme {
  try {
    const theme = JSON.parse(json);
    const validation = validateTheme(theme);
    
    if (!validation.valid) {
      throw new Error(`Invalid theme: ${validation.errors.join(', ')}`);
    }
    
    return theme;
  } catch (error) {
    throw new Error(`Failed to import theme: ${error}`);
  }
}

/**
 * Convert theme to CSS variables
 */
export function themeToCSSVariables(theme: Theme, prefix: string = 'cms'): Record<string, string> {
  const variables: Record<string, string> = {};
  
  // Convert colors
  Object.entries(theme.colors).forEach(([key, value]) => {
    variables[`--${prefix}-color-${camelToKebab(key)}`] = value;
  });
  
  // Convert typography
  Object.entries(theme.typography).forEach(([key, value]) => {
    variables[`--${prefix}-typography-${camelToKebab(key)}`] = String(value);
  });
  
  // Convert spacing
  Object.entries(theme.spacing).forEach(([key, value]) => {
    variables[`--${prefix}-spacing-${key}`] = value;
  });
  
  // Convert border radius
  Object.entries(theme.borderRadius).forEach(([key, value]) => {
    variables[`--${prefix}-radius-${key}`] = value;
  });
  
  // Convert shadows
  Object.entries(theme.shadows).forEach(([key, value]) => {
    variables[`--${prefix}-shadow-${key}`] = value;
  });
  
  // Convert transitions
  Object.entries(theme.transitions).forEach(([key, value]) => {
    variables[`--${prefix}-transition-${key}`] = value;
  });
  
  // Convert z-index
  Object.entries(theme.zIndex).forEach(([key, value]) => {
    variables[`--${prefix}-z-${key}`] = String(value);
  });
  
  // Convert gradients
  Object.entries(theme.gradients).forEach(([key, value]) => {
    variables[`--${prefix}-gradient-${key}`] = value;
  });
  
  return variables;
}

/**
 * Convert camelCase to kebab-case
 */
function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Generate theme from brand colors
 */
export function generateThemeFromBrand(
  brandColor: string,
  themeName: string,
  mode: 'light' | 'dark' = 'light'
): Partial<Theme> {
  const palette = generatePalette(brandColor);
  
  return {
    name: themeName,
    mode,
    colors: {
      primary: palette.primary.base,
      primaryHover: palette.primary.dark,
      primaryLight: palette.primary.light,
      primaryDark: palette.primary.darker,
      primaryContrast: palette.primary.contrast,
      
      secondary: palette.secondary.base,
      secondaryHover: palette.secondary.dark,
      secondaryLight: palette.secondary.light,
      secondaryDark: palette.secondary.darker,
      secondaryContrast: palette.secondary.contrast,
      
      accent: palette.accent.base,
      accentHover: palette.accent.dark,
      accentLight: palette.accent.light,
      accentDark: palette.accent.darker,
      
      // Other colors will be filled by the base theme
    } as any,
  };
}
