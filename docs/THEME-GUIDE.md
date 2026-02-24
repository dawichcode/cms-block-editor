# Theme System Guide

Complete guide to using and customizing themes in CMS Block Editor.

## Overview

The CMS Block Editor includes a powerful theme system with:

- **10 Preset Themes**: Light, Dark, Ocean, Forest, Sunset, Rose, Midnight, Dracula, Monokai, Minimal
- **Dark Mode Support**: Automatic dark mode detection
- **Custom Themes**: Create your own themes
- **CSS Variables**: Easy customization
- **Theme Switcher**: Built-in UI component
- **Persistent Storage**: Themes saved to localStorage

## Quick Start

### Basic Usage

```typescript
import { CMSBlockEditor, ThemeProvider } from 'cms-block-editor';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <CMSBlockEditor />
    </ThemeProvider>
  );
}
```

### With Theme Switcher

```typescript
import { CMSBlockEditor, ThemeProvider, ThemeSwitcher } from 'cms-block-editor';

function App() {
  return (
    <ThemeProvider defaultTheme="ocean" defaultMode="auto">
      <div>
        <ThemeSwitcher />
        <CMSBlockEditor />
      </div>
    </ThemeProvider>
  );
}
```

## Preset Themes

### Light Themes

**Light** (Default)
- Primary: Purple (#667eea)
- Clean and professional
- Best for: General use

**Ocean**
- Primary: Cyan (#0891b2)
- Cool and calming
- Best for: Tech, water-related content

**Forest**
- Primary: Green (#059669)
- Natural and fresh
- Best for: Environmental, health content

**Sunset**
- Primary: Orange (#f97316)
- Warm and energetic
- Best for: Creative, lifestyle content

**Rose**
- Primary: Pink (#e11d48)
- Elegant and modern
- Best for: Fashion, beauty content

**Minimal**
- Primary: Black (#000000)
- Clean and simple
- Best for: Minimalist designs

### Dark Themes

**Dark**
- Primary: Indigo (#818cf8)
- Modern dark theme
- Best for: General use, reduced eye strain

**Midnight**
- Primary: Blue (#3b82f6)
- Deep blue dark theme
- Best for: Professional dark mode

**Dracula**
- Primary: Purple (#bd93f9)
- Popular code editor theme
- Best for: Developers

**Monokai**
- Primary: Green (#a6e22e)
- Classic code editor theme
- Best for: Developers, coders

## Using Themes

### Setting a Theme

```typescript
import { ThemeProvider } from 'cms-block-editor';

// Using preset theme name
<ThemeProvider defaultTheme="ocean">
  <App />
</ThemeProvider>

// Using theme object
import { oceanTheme } from 'cms-block-editor';

<ThemeProvider defaultTheme={oceanTheme}>
  <App />
</ThemeProvider>
```

### Changing Themes Programmatically

```typescript
import { useTheme } from 'cms-block-editor';

function MyComponent() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme('dark')}>
      Switch to Dark Theme
    </button>
  );
}
```

### Theme Modes

The theme system supports three modes:

**Light Mode**
```typescript
<ThemeProvider defaultMode="light">
  <App />
</ThemeProvider>
```

**Dark Mode**
```typescript
<ThemeProvider defaultMode="dark">
  <App />
</ThemeProvider>
```

**Auto Mode** (follows system preference)
```typescript
<ThemeProvider defaultMode="auto">
  <App />
</ThemeProvider>
```

### Toggle Mode

```typescript
import { useTheme } from 'cms-block-editor';

function ThemeToggle() {
  const { mode, toggleMode } = useTheme();

  return (
    <button onClick={toggleMode}>
      {mode === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
```

## Creating Custom Themes

### Basic Custom Theme

```typescript
import { Theme, ThemeProvider } from 'cms-block-editor';
import { lightTheme } from 'cms-block-editor';

const myTheme: Theme = {
  ...lightTheme,
  name: 'my-theme',
  colors: {
    ...lightTheme.colors,
    primary: '#ff6b6b',
    primaryHover: '#ee5a52',
    primaryLight: '#ffe0e0',
    primaryDark: '#c92a2a',
  },
};

<ThemeProvider defaultTheme={myTheme}>
  <App />
</ThemeProvider>
```

### Complete Custom Theme

```typescript
import { Theme } from 'cms-block-editor';

const customTheme: Theme = {
  name: 'custom',
  colors: {
    // Primary colors
    primary: '#your-color',
    primaryHover: '#your-color',
    primaryLight: '#your-color',
    primaryDark: '#your-color',
    
    // Secondary colors
    secondary: '#your-color',
    secondaryHover: '#your-color',
    
    // Neutral colors
    background: '#your-color',
    surface: '#your-color',
    border: '#your-color',
    divider: '#your-color',
    
    // Text colors
    textPrimary: '#your-color',
    textSecondary: '#your-color',
    textDisabled: '#your-color',
    
    // Status colors
    success: '#your-color',
    warning: '#your-color',
    error: '#your-color',
    info: '#your-color',
    
    // Editor specific
    editorBackground: '#your-color',
    editorText: '#your-color',
    editorPlaceholder: '#your-color',
    toolbarBackground: '#your-color',
    toolbarText: '#your-color',
    toolbarBorder: '#your-color',
    
    // Selection and highlights
    selection: '#your-color',
    highlight: '#your-color',
    focus: '#your-color',
  },
  typography: {
    fontFamily: 'Your Font, sans-serif',
    fontFamilyMono: 'Your Mono Font, monospace',
    fontSizeXs: '0.75rem',
    fontSizeSm: '0.875rem',
    fontSizeMd: '1rem',
    fontSizeLg: '1.125rem',
    fontSizeXl: '1.25rem',
    fontWeightNormal: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
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
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
};
```

## CSS Variables

All theme values are exposed as CSS variables:

### Colors

```css
var(--cms-color-primary)
var(--cms-color-primary-hover)
var(--cms-color-background)
var(--cms-color-text-primary)
/* ... and more */
```

### Typography

```css
var(--cms-typography-font-family)
var(--cms-typography-font-size-md)
var(--cms-typography-font-weight-bold)
var(--cms-typography-line-height-normal)
```

### Spacing

```css
var(--cms-spacing-xs)
var(--cms-spacing-sm)
var(--cms-spacing-md)
var(--cms-spacing-lg)
```

### Border Radius

```css
var(--cms-radius-sm)
var(--cms-radius-md)
var(--cms-radius-lg)
```

### Shadows

```css
var(--cms-shadow-sm)
var(--cms-shadow-md)
var(--cms-shadow-lg)
```

## Custom Styling

### Override Specific Components

```css
/* Custom toolbar styling */
.cms-toolbar {
  background: var(--cms-color-primary);
  color: white;
}

/* Custom button styling */
.cms-btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: var(--cms-radius-full);
}

/* Custom editor styling */
.cms-editor-content {
  font-family: 'Georgia', serif;
  font-size: 18px;
  line-height: 1.8;
}
```

### Using Theme Variables

```css
.my-custom-component {
  background: var(--cms-color-surface);
  color: var(--cms-color-text-primary);
  border: 1px solid var(--cms-color-border);
  border-radius: var(--cms-radius-md);
  padding: var(--cms-spacing-md);
  box-shadow: var(--cms-shadow-md);
}
```

## Theme Switcher Component

### Basic Usage

```typescript
import { ThemeSwitcher } from 'cms-block-editor';

<ThemeSwitcher />
```

### Custom Configuration

```typescript
<ThemeSwitcher 
  showModeToggle={true}
  showPresets={true}
  className="my-theme-switcher"
/>
```

### Custom Theme Switcher

```typescript
import { useTheme, presetThemes } from 'cms-block-editor';

function CustomThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <select 
      value={theme.name} 
      onChange={(e) => setTheme(e.target.value)}
    >
      {Object.keys(presetThemes).map((name) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
}
```

## Advanced Usage

### Dynamic Theme Loading

```typescript
import { useState, useEffect } from 'react';
import { ThemeProvider, Theme } from 'cms-block-editor';

function App() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    // Load theme from API
    fetch('/api/theme')
      .then(res => res.json())
      .then(data => setTheme(data));
  }, []);

  if (!theme) return <div>Loading...</div>;

  return (
    <ThemeProvider defaultTheme={theme}>
      <CMSBlockEditor />
    </ThemeProvider>
  );
}
```

### Theme Persistence

```typescript
// Themes are automatically saved to localStorage
<ThemeProvider 
  defaultTheme="ocean"
  storageKey="my-app-theme"
>
  <App />
</ThemeProvider>

// Disable persistence by not providing storageKey
<ThemeProvider 
  defaultTheme="ocean"
  storageKey={undefined}
>
  <App />
</ThemeProvider>
```

### Conditional Theming

```typescript
import { useTheme } from 'cms-block-editor';

function MyComponent() {
  const { theme, mode } = useTheme();

  return (
    <div>
      {mode === 'dark' ? (
        <DarkModeContent />
      ) : (
        <LightModeContent />
      )}
    </div>
  );
}
```

### Theme-Aware Components

```typescript
import { useTheme } from 'cms-block-editor';

function ThemedButton() {
  const { theme } = useTheme();

  return (
    <button
      style={{
        background: theme.colors.primary,
        color: 'white',
        borderRadius: theme.borderRadius.md,
        padding: `${theme.spacing.sm} ${theme.spacing.md}`,
      }}
    >
      Themed Button
    </button>
  );
}
```

## Best Practices

### 1. Use Theme Variables

Always use CSS variables instead of hardcoded colors:

```css
/* Good */
.my-component {
  color: var(--cms-color-text-primary);
  background: var(--cms-color-surface);
}

/* Avoid */
.my-component {
  color: #1f2937;
  background: #f9fafb;
}
```

### 2. Respect User Preferences

Use auto mode to respect system preferences:

```typescript
<ThemeProvider defaultMode="auto">
  <App />
</ThemeProvider>
```

### 3. Test Both Modes

Always test your custom themes in both light and dark modes:

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

### 4. Maintain Contrast

Ensure sufficient contrast for accessibility:

```typescript
const myTheme: Theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    // Good contrast
    textPrimary: '#1f2937',
    background: '#ffffff',
  },
};
```

### 5. Use Semantic Colors

Use semantic color names for clarity:

```css
/* Good */
.error-message {
  color: var(--cms-color-error);
}

/* Avoid */
.error-message {
  color: var(--cms-color-primary);
}
```

## Examples

### Example 1: Brand Theme

```typescript
import { Theme, lightTheme } from 'cms-block-editor';

const brandTheme: Theme = {
  ...lightTheme,
  name: 'brand',
  colors: {
    ...lightTheme.colors,
    primary: '#ff6b6b',
    primaryHover: '#ee5a52',
    secondary: '#4ecdc4',
    secondaryHover: '#45b7af',
  },
  typography: {
    ...lightTheme.typography,
    fontFamily: 'Poppins, sans-serif',
  },
};

<ThemeProvider defaultTheme={brandTheme}>
  <CMSBlockEditor />
</ThemeProvider>
```

### Example 2: High Contrast Theme

```typescript
const highContrastTheme: Theme = {
  ...lightTheme,
  name: 'high-contrast',
  colors: {
    ...lightTheme.colors,
    primary: '#000000',
    background: '#ffffff',
    textPrimary: '#000000',
    border: '#000000',
  },
};
```

### Example 3: Theme Switcher in Toolbar

```typescript
import { CMSBlockEditor, ThemeProvider, ThemeSwitcher } from 'cms-block-editor';

function App() {
  return (
    <ThemeProvider>
      <div className="editor-container">
        <div className="editor-header">
          <h1>My Editor</h1>
          <ThemeSwitcher />
        </div>
        <CMSBlockEditor />
      </div>
    </ThemeProvider>
  );
}
```

## Troubleshooting

### Theme Not Applying

**Problem**: Theme changes don't take effect
- **Solution**: Ensure ThemeProvider wraps your components
- **Solution**: Check that CSS is imported: `import 'cms-block-editor/dist/index.css'`

### CSS Variables Not Working

**Problem**: CSS variables show default values
- **Solution**: Make sure themes.css is loaded
- **Solution**: Check browser DevTools for CSS variable values

### Theme Persists After Refresh

**Problem**: Theme doesn't persist
- **Solution**: Provide a storageKey prop to ThemeProvider
- **Solution**: Check localStorage permissions

### Custom Theme Not Loading

**Problem**: Custom theme doesn't apply
- **Solution**: Verify theme object structure matches Theme type
- **Solution**: Check console for TypeScript errors

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

## Performance

- CSS variables are highly performant
- Theme switching is instant
- No runtime CSS generation
- Minimal bundle size impact

## Accessibility

- All themes maintain WCAG AA contrast ratios
- Focus indicators are clearly visible
- Color is not the only means of conveying information
- Themes work with screen readers

## Future Enhancements

Planned features:

- [ ] Theme builder UI
- [ ] Import/export themes
- [ ] Theme marketplace
- [ ] Gradient support
- [ ] Animation customization
- [ ] More preset themes
- [ ] Theme preview mode
- [ ] A11y contrast checker

## Related Guides

- [Styling Guide](./STYLING-GUIDE.md)
- [Customization Guide](./CUSTOMIZATION-GUIDE.md)
- [Responsive Guide](./RESPONSIVE-GUIDE.md)

---

**Happy Theming!** 🎨
