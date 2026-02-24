import React, { useState } from 'react';
import { useTheme } from './ThemeProvider';
import { presetThemes, PresetThemeName } from './presets';

interface ThemeSwitcherProps {
  className?: string;
  showModeToggle?: boolean;
  showPresets?: boolean;
}

export function ThemeSwitcher({ 
  className = '', 
  showModeToggle = true,
  showPresets = true 
}: ThemeSwitcherProps) {
  const { theme, mode, setTheme, setMode, toggleMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themeNames: PresetThemeName[] = Object.keys(presetThemes) as PresetThemeName[];

  return (
    <div className={`cms-theme-switcher ${className}`}>
      {showModeToggle && (
        <button
          onClick={toggleMode}
          className="cms-theme-mode-toggle"
          title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
        >
          {mode === 'light' ? '🌙' : '☀️'}
        </button>
      )}

      {showPresets && (
        <div className="cms-theme-selector">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="cms-theme-selector-button"
          >
            🎨 {theme.name}
          </button>

          {isOpen && (
            <>
              <div 
                className="cms-theme-selector-overlay" 
                onClick={() => setIsOpen(false)}
              />
              <div className="cms-theme-selector-dropdown">
                <div className="cms-theme-selector-header">
                  <h3>Choose Theme</h3>
                  <button onClick={() => setIsOpen(false)}>×</button>
                </div>
                
                <div className="cms-theme-selector-grid">
                  {themeNames.map((themeName) => {
                    const presetTheme = presetThemes[themeName];
                    return (
                      <button
                        key={themeName}
                        onClick={() => {
                          setTheme(themeName);
                          setIsOpen(false);
                        }}
                        className={`cms-theme-option ${theme.name === themeName ? 'active' : ''}`}
                      >
                        <div 
                          className="cms-theme-preview"
                          style={{
                            background: presetTheme.colors.primary,
                            borderColor: presetTheme.colors.border,
                          }}
                        >
                          <div 
                            className="cms-theme-preview-accent"
                            style={{ background: presetTheme.colors.secondary }}
                          />
                        </div>
                        <span className="cms-theme-name">{themeName}</span>
                        {theme.name === themeName && <span className="cms-theme-check">✓</span>}
                      </button>
                    );
                  })}
                </div>

                <div className="cms-theme-selector-modes">
                  <label>
                    <input
                      type="radio"
                      name="mode"
                      value="light"
                      checked={mode === 'light'}
                      onChange={() => setMode('light')}
                    />
                    Light
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="mode"
                      value="dark"
                      checked={mode === 'dark'}
                      onChange={() => setMode('dark')}
                    />
                    Dark
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="mode"
                      value="auto"
                      checked={mode === 'auto'}
                      onChange={() => setMode('auto')}
                    />
                    Auto
                  </label>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
