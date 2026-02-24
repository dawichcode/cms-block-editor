import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Theme, ThemeMode } from './types';
import { lightTheme } from './lightTheme';
import { darkTheme } from './darkTheme';
import { presetThemes, PresetThemeName } from './presets';

interface ThemeContextValue {
  theme: Theme;
  mode: ThemeMode;
  setTheme: (theme: Theme | PresetThemeName) => void;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme | PresetThemeName;
  defaultMode?: ThemeMode;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  defaultMode = 'light',
  storageKey = 'cms-editor-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof defaultTheme === 'string') {
      return presetThemes[defaultTheme] || lightTheme;
    }
    return defaultTheme;
  });

  const [mode, setModeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined' && storageKey) {
      const stored = localStorage.getItem(`${storageKey}-mode`);
      if (stored === 'light' || stored === 'dark' || stored === 'auto') {
        return stored;
      }
    }
    return defaultMode;
  });

  // Handle auto mode
  useEffect(() => {
    if (mode === 'auto' && typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
        const newTheme = e.matches ? darkTheme : lightTheme;
        setThemeState(newTheme);
        applyTheme(newTheme);
      };

      handleChange(mediaQuery);
      mediaQuery.addEventListener('change', handleChange);
      
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [mode]);

  // Apply theme to CSS variables
  const applyTheme = (themeToApply: Theme) => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    
    // Apply colors
    Object.entries(themeToApply.colors).forEach(([key, value]) => {
      root.style.setProperty(`--cms-color-${camelToKebab(key)}`, value);
    });

    // Apply typography
    Object.entries(themeToApply.typography).forEach(([key, value]) => {
      root.style.setProperty(`--cms-typography-${camelToKebab(key)}`, String(value));
    });

    // Apply spacing
    Object.entries(themeToApply.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--cms-spacing-${key}`, value);
    });

    // Apply border radius
    Object.entries(themeToApply.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--cms-radius-${key}`, value);
    });

    // Apply shadows
    Object.entries(themeToApply.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--cms-shadow-${key}`, value);
    });
  };

  useEffect(() => {
    if (mode !== 'auto') {
      applyTheme(theme);
    }
  }, [theme, mode]);

  // Save to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && storageKey) {
      localStorage.setItem(`${storageKey}-mode`, mode);
      localStorage.setItem(`${storageKey}-name`, theme.name);
    }
  }, [mode, theme.name, storageKey]);

  const setTheme = (newTheme: Theme | PresetThemeName) => {
    const themeToSet = typeof newTheme === 'string' 
      ? presetThemes[newTheme] || lightTheme
      : newTheme;
    
    setThemeState(themeToSet);
    applyTheme(themeToSet);
  };

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    
    if (newMode === 'light') {
      const lightVariant = theme.name === 'dark' ? lightTheme : theme;
      setThemeState(lightVariant);
      applyTheme(lightVariant);
    } else if (newMode === 'dark') {
      const darkVariant = theme.name === 'light' ? darkTheme : theme;
      setThemeState(darkVariant);
      applyTheme(darkVariant);
    }
  };

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, mode, setTheme, setMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Helper function to convert camelCase to kebab-case
function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}
