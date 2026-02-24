# Advanced Theming Guide

Complete guide to the advanced theme system in CMS Block Editor with extensive customization options.

## Table of Contents

1. [Overview](#overview)
2. [Theme Structure](#theme-structure)
3. [Creating Custom Themes](#creating-custom-themes)
4. [Theme Builder API](#theme-builder-api)
5. [Theme Customizer Component](#theme-customizer-component)
6. [Advanced Customization](#advanced-customization)
7. [Import/Export Themes](#importexport-themes)
8. [Best Practices](#best-practices)

---

## Overview

The advanced theme system provides:

- **90+ theme properties** across 10 categories
- **Theme Builder API** for programmatic theme creation
- **Visual Theme Customizer** component
- **Import/Export** functionality
- **Color palette generation** from brand colors
- **CSS variable system** for runtime customization
- **Type-safe** theme definitions

### Theme Categories

1. **Colors** (50+ color properties)
2. **Typography** (20+ typography properties)
3. **Spacing** (8 spacing values)
4. **Border Radius** (8 radius values)
5. **Shadows** (8 shadow values)
6. **Transitions** (4 transition speeds)
7. **Breakpoints** (6 responsive breakpoints)
8. **Z-Index** (7 layer values)
9. **Animations** (11 animation presets)
10. **Gradients** (10 gradient presets)

---

## Theme Structure

### Complete Theme Interface

```typescript
interface Theme {
  name: string;
  mode: 'light' | 'dark';
  colors: ThemeColors;          // 50+ colors
  typography: ThemeTypography;  // 20+ properties
  spacing: ThemeSpacing;        // 8 values
  borderRadius: ThemeBorderRadius; // 8 values
  shadows: ThemeShadows;        // 8 values
  transitions: ThemeTransitions; // 4 speeds
  breakpoints: ThemeBreakpoints; // 6 breakpoints
  zIndex: ThemeZIndex;          // 7 layers
  animations: ThemeAnimations;  // 11 animations
  gradients: ThemeGradients;    // 10 gradients
  custom?: ThemeCustom;         // Custom properties
}
```

### Color Properties

```typescript
interface ThemeColors {
  // Primary (5 shades)
  primary: string;
  primaryHover: string;
  primaryLight: string;
  primaryDark: string;
  primaryContrast: string;
  
  // Secondary (5 shades)
  secondary: string;
  secondaryHover: string;
  secondaryLight: string;
  secondaryDark: string;
  secondaryContrast: string;
  
  // Accent (4 shades)
  accent: string;
  accentHover: string;
  accentLight: string;
  accentDark: string;
  
  // Neutral (9 shades)
  background: string;
  backgroundAlt: string;
  surface: string;
  surfaceHover: string;
  surfaceActive: string;
  border: string;
  borderHover: string;
  divider: string;
  overlay: string;
  
  // Text (5 shades)
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textDisabled: string;
  textInverse: string;
  
  // Status (12 colors)
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
  
  // Editor (8 colors)
  editorBackground: string;
  editorText: string;
  editorPlaceholder: string;
  editorCursor: string;
  toolbarBackground: string;
  toolbarText: string;
  toolbarBorder: string;
  toolbarIconHover: string;
  
  // Selection (6 colors)
  selection: string;
  selectionText: string;
  highlight: string;
  highlightText: string;
  focus: string;
  focusRing: string;
  
  // Code (8 colors)
  codeBackground: string;
  codeText: string;
  codeComment: string;
  codeKeyword: string;
  codeString: string;
  codeNumber: string;
  codeFunction: string;
  codeOperator: string;
}
```

---

## Creating Custom Themes

### Method 1: Extend Base Theme

```typescript
import { createTheme, lightTheme } from 'cms-block-editor';

const myTheme = createTheme(lightTheme, {
  colors: {
    primary: '#ff6b6b',
    primaryHover: '#ee5a52',
    primaryLight: '#ffe0e0',
    primaryDark: '#c92a2a',
  },
});

<ThemeProvider defaultTheme={myTheme}>
  <CMSBlockEditor />
</ThemeProvider>
```

### Method 2: Generate from Brand Color

```typescript
import { generateThemeFromBrand, lightTheme, createTheme } from 'cms-block-editor';

const brandTheme = generateThemeFromBrand('#ff6b6b', 'my-brand', 'light');
const completeTheme = createTheme(lightTheme, brandTheme);

<ThemeProvider defaultTheme={completeTheme}>
  <CMSBlockEditor />
</ThemeProvider>
```

### Method 3: Complete Custom Theme

```typescript
import { Theme } from 'cms-block-editor';

const customTheme: Theme = {
  name: 'custom',
  mode: 'light',
  colors: {
    // Define all 50+ colors
    primary: '#your-color',
    // ... rest of colors
  },
  typography: {
    // Define all typography
    fontFamily: 'Your Font',
    // ... rest of typography
  },
  // ... rest of theme properties
};
```

---

## Theme Builder API

### createTheme()

Merge theme overrides with a base theme:

```typescript
import { createTheme, lightTheme } from 'cms-block-editor';

const theme = createTheme(lightTheme, {
  colors: {
    primary: '#custom-color',
  },
  typography: {
    fontFamily: 'Custom Font',
  },
  spacing: {
    md: '1.5rem',
  },
});
```

### generateColorVariations()

Generate color shades from a base color:

```typescript
import { generateColorVariations } from 'cms-block-editor';

const colors = generateColorVariations('#667eea');
// Returns: { base, light, lighter, dark, darker, contrast }

console.log(colors.light);    // Lighter shade
console.log(colors.dark);     // Darker shade
console.log(colors.contrast); // Contrasting text color
```

### generatePalette()

Generate a complete color palette:

```typescript
import { generatePalette } from 'cms-block-editor';

const palette = generatePalette('#667eea');
// Returns: { primary, secondary, accent }

console.log(palette.primary.base);
console.log(palette.secondary.base);
console.log(palette.accent.base);
```

### createGradient()

Create CSS gradients:

```typescript
import { createGradient } from 'cms-block-editor';

const gradient = createGradient('#667eea', '#764ba2', 135);
// Returns: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
```

### validateTheme()

Validate theme structure:

```typescript
import { validateTheme } from 'cms-block-editor';

const validation = validateTheme(myTheme);

if (!validation.valid) {
  console.error('Theme errors:', validation.errors);
}
```

### themeToCSSVariables()

Convert theme to CSS variables:

```typescript
import { themeToCSSVariables } from 'cms-block-editor';

const variables = themeToCSSVariables(myTheme, 'my-prefix');
// Returns: { '--my-prefix-color-primary': '#667eea', ... }

// Apply to document
Object.entries(variables).forEach(([key, value]) => {
  document.documentElement.style.setProperty(key, value);
});
```

---

## Theme Customizer Component

### Basic Usage

```typescript
import { ThemeCustomizer } from 'cms-block-editor';
import { useState } from 'react';

function App() {
  const [showCustomizer, setShowCustomizer] = useState(false);

  return (
    <ThemeProvider>
      <button onClick={() => setShowCustomizer(true)}>
        Customize Theme
      </button>
      
      {showCustomizer && (
        <ThemeCustomizer onClose={() => setShowCustomizer(false)} />
      )}
      
      <CMSBlockEditor />
    </ThemeProvider>
  );
}
```

### Features

The Theme Customizer provides:

1. **Colors Tab**
   - Primary colors (4 shades)
   - Secondary colors (2 shades)
   - Background colors (3 shades)
   - Text colors (2 shades)
   - Visual color picker
   - Hex input

2. **Typography Tab**
   - Font families (3 types)
   - Font sizes (9 sizes)
   - Font weights (6 weights)
   - Line heights (5 values)
   - Letter spacing (4 values)

3. **Spacing Tab**
   - Spacing scale (8 values)
   - Border radius (8 values)
   - Visual preview

4. **Advanced Tab**
   - Import/Export themes
   - Theme name editing
   - Live preview
   - Reset functionality

---

## Advanced Customization

### Custom Properties

Add custom properties to themes:

```typescript
const theme = createTheme(lightTheme, {
  custom: {
    headerHeight: '64px',
    sidebarWidth: '280px',
    maxContentWidth: '1200px',
    customColor: '#special',
  },
});

// Access custom properties
const headerHeight = theme.custom?.headerHeight;
```

### Responsive Theming

Use breakpoints for responsive design:

```typescript
const theme = createTheme(lightTheme, {
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px',
  },
});

// Use in CSS
@media (min-width: var(--cms-breakpoint-md)) {
  /* Styles for medium screens and up */
}
```

### Animation Customization

Customize animations:

```typescript
const theme = createTheme(lightTheme, {
  animations: {
    fadeIn: 'fadeIn 0.5s ease-in-out',
    slideUp: 'slideUp 0.4s ease-out',
    custom: 'myAnimation 1s infinite',
  },
  transitions: {
    fast: '100ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '400ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
});
```

### Gradient Customization

Create custom gradients:

```typescript
const theme = createTheme(lightTheme, {
  gradients: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    custom: 'radial-gradient(circle, #ff6b6b 0%, #feca57 100%)',
    mesh: 'conic-gradient(from 180deg, #667eea, #764ba2, #667eea)',
  },
});

// Use in components
<div style={{ background: theme.gradients.custom }}>
  Gradient Background
</div>
```

---

## Import/Export Themes

### Export Theme

```typescript
import { exportTheme } from 'cms-block-editor';

// Export as JSON string
const json = exportTheme(myTheme);

// Download as file
const blob = new Blob([json], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'my-theme.json';
a.click();
```

### Import Theme

```typescript
import { importTheme } from 'cms-block-editor';

// From JSON string
const theme = importTheme(jsonString);

// From file
const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const json = e.target?.result as string;
    const theme = importTheme(json);
    setTheme(theme);
  };
  reader.readAsText(file);
};
```

### Share Themes

```typescript
// Export theme to share
const themeJSON = exportTheme(myTheme);

// Share via API
await fetch('/api/themes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: themeJSON,
});

// Load shared theme
const response = await fetch('/api/themes/theme-id');
const json = await response.text();
const sharedTheme = importTheme(json);
```

---

## Best Practices

### 1. Use Semantic Colors

```typescript
// Good
colors: {
  primary: '#667eea',
  success: '#10b981',
  error: '#ef4444',
}

// Avoid
colors: {
  blue: '#667eea',
  green: '#10b981',
  red: '#ef4444',
}
```

### 2. Maintain Contrast Ratios

```typescript
import { generateColorVariations } from 'cms-block-editor';

const colors = generateColorVariations('#667eea');
// Automatically generates contrasting text color
console.log(colors.contrast); // '#ffffff' or '#000000'
```

### 3. Use Theme Builder

```typescript
// Good - Use theme builder
const theme = createTheme(lightTheme, {
  colors: { primary: '#custom' },
});

// Avoid - Manual deep merge
const theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: '#custom',
  },
};
```

### 4. Validate Themes

```typescript
import { validateTheme } from 'cms-block-editor';

const validation = validateTheme(myTheme);
if (!validation.valid) {
  console.error('Invalid theme:', validation.errors);
}
```

### 5. Use CSS Variables

```css
/* Good - Use CSS variables */
.my-component {
  color: var(--cms-color-text-primary);
  background: var(--cms-color-surface);
}

/* Avoid - Hardcoded colors */
.my-component {
  color: #1f2937;
  background: #f9fafb;
}
```

### 6. Test Both Modes

```typescript
// Test light mode
<ThemeProvider defaultTheme={myTheme} defaultMode="light">
  <App />
</ThemeProvider>

// Test dark mode
<ThemeProvider defaultTheme={myTheme} defaultMode="dark">
  <App />
</ThemeProvider>
```

### 7. Document Custom Themes

```typescript
/**
 * Brand Theme
 * 
 * Primary: #ff6b6b (Brand Red)
 * Secondary: #4ecdc4 (Brand Teal)
 * 
 * Usage: Marketing pages, landing pages
 */
const brandTheme = createTheme(lightTheme, {
  name: 'brand',
  colors: {
    primary: '#ff6b6b',
    secondary: '#4ecdc4',
  },
});
```

---

## Examples

### Example 1: Brand Theme

```typescript
import { createTheme, lightTheme, generatePalette } from 'cms-block-editor';

const palette = generatePalette('#ff6b6b');

const brandTheme = createTheme(lightTheme, {
  name: 'brand',
  colors: {
    primary: palette.primary.base,
    primaryHover: palette.primary.dark,
    primaryLight: palette.primary.light,
    secondary: palette.secondary.base,
    accent: palette.accent.base,
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    fontFamilyHeading: 'Montserrat, sans-serif',
  },
});
```

### Example 2: High Contrast Theme

```typescript
const highContrastTheme = createTheme(lightTheme, {
  name: 'high-contrast',
  colors: {
    primary: '#000000',
    background: '#ffffff',
    textPrimary: '#000000',
    border: '#000000',
  },
  borderRadius: {
    none: '0',
    sm: '0',
    md: '0',
    lg: '0',
  },
});
```

### Example 3: Dynamic Theme

```typescript
function DynamicThemeApp() {
  const [brandColor, setBrandColor] = useState('#667eea');

  const theme = useMemo(() => {
    const palette = generatePalette(brandColor);
    return createTheme(lightTheme, {
      colors: {
        primary: palette.primary.base,
        primaryHover: palette.primary.dark,
      },
    });
  }, [brandColor]);

  return (
    <ThemeProvider defaultTheme={theme}>
      <input
        type="color"
        value={brandColor}
        onChange={(e) => setBrandColor(e.target.value)}
      />
      <CMSBlockEditor />
    </ThemeProvider>
  );
}
```

---

## API Reference

### Functions

- `createTheme(baseTheme, override)` - Create custom theme
- `generateColorVariations(color)` - Generate color shades
- `generatePalette(color)` - Generate color palette
- `createGradient(color1, color2, angle)` - Create gradient
- `validateTheme(theme)` - Validate theme structure
- `exportTheme(theme)` - Export as JSON
- `importTheme(json)` - Import from JSON
- `themeToCSSVariables(theme, prefix)` - Convert to CSS vars
- `generateThemeFromBrand(color, name, mode)` - Generate from brand

### Components

- `ThemeProvider` - Theme context provider
- `ThemeSwitcher` - Theme selection UI
- `ThemeCustomizer` - Visual theme editor

### Hooks

- `useTheme()` - Access theme context

---

## Support

- [GitHub Issues](https://github.com/yourusername/cms-block-editor/issues)
- [Theme Guide](./THEME-GUIDE.md)
- [Documentation](../README.md)

---

**Happy Theming!** 🎨
