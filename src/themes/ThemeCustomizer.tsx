import React, { useState } from 'react';
import { useTheme } from './ThemeProvider';
import { Theme, ThemeOverride } from './types';
import { createTheme, exportTheme, importTheme } from './themeBuilder';

interface ThemeCustomizerProps {
  onClose?: () => void;
}

export function ThemeCustomizer({ onClose }: ThemeCustomizerProps) {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'spacing' | 'advanced'>('colors');
  const [customTheme, setCustomTheme] = useState<Theme>(theme);

  const updateColor = (key: keyof Theme['colors'], value: string) => {
    const updated = createTheme(customTheme, {
      colors: { [key]: value },
    });
    setCustomTheme(updated);
  };

  const updateTypography = (key: keyof Theme['typography'], value: string | number) => {
    const updated = createTheme(customTheme, {
      typography: { [key]: value },
    });
    setCustomTheme(updated);
  };

  const updateSpacing = (key: keyof Theme['spacing'], value: string) => {
    const updated = createTheme(customTheme, {
      spacing: { [key]: value },
    });
    setCustomTheme(updated);
  };

  const applyTheme = () => {
    setTheme(customTheme);
    onClose?.();
  };

  const resetTheme = () => {
    setCustomTheme(theme);
  };

  const handleExport = () => {
    const json = exportTheme(customTheme);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${customTheme.name}-theme.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = e.target?.result as string;
        const imported = importTheme(json);
        setCustomTheme(imported);
      } catch (error) {
        alert(`Failed to import theme: ${error}`);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="cms-theme-customizer">
      <div className="cms-theme-customizer-overlay" onClick={onClose} />
      <div className="cms-theme-customizer-panel">
        <div className="cms-theme-customizer-header">
          <h2>Theme Customizer</h2>
          <button onClick={onClose} className="cms-close-btn">×</button>
        </div>

        <div className="cms-theme-customizer-tabs">
          <button
            className={activeTab === 'colors' ? 'active' : ''}
            onClick={() => setActiveTab('colors')}
          >
            Colors
          </button>
          <button
            className={activeTab === 'typography' ? 'active' : ''}
            onClick={() => setActiveTab('typography')}
          >
            Typography
          </button>
          <button
            className={activeTab === 'spacing' ? 'active' : ''}
            onClick={() => setActiveTab('spacing')}
          >
            Spacing
          </button>
          <button
            className={activeTab === 'advanced' ? 'active' : ''}
            onClick={() => setActiveTab('advanced')}
          >
            Advanced
          </button>
        </div>

        <div className="cms-theme-customizer-content">
          {activeTab === 'colors' && (
            <div className="cms-customizer-section">
              <h3>Primary Colors</h3>
              <div className="cms-color-grid">
                <ColorInput
                  label="Primary"
                  value={customTheme.colors.primary}
                  onChange={(value) => updateColor('primary', value)}
                />
                <ColorInput
                  label="Primary Hover"
                  value={customTheme.colors.primaryHover}
                  onChange={(value) => updateColor('primaryHover', value)}
                />
                <ColorInput
                  label="Primary Light"
                  value={customTheme.colors.primaryLight}
                  onChange={(value) => updateColor('primaryLight', value)}
                />
                <ColorInput
                  label="Primary Dark"
                  value={customTheme.colors.primaryDark}
                  onChange={(value) => updateColor('primaryDark', value)}
                />
              </div>

              <h3>Secondary Colors</h3>
              <div className="cms-color-grid">
                <ColorInput
                  label="Secondary"
                  value={customTheme.colors.secondary}
                  onChange={(value) => updateColor('secondary', value)}
                />
                <ColorInput
                  label="Secondary Hover"
                  value={customTheme.colors.secondaryHover}
                  onChange={(value) => updateColor('secondaryHover', value)}
                />
              </div>

              <h3>Background Colors</h3>
              <div className="cms-color-grid">
                <ColorInput
                  label="Background"
                  value={customTheme.colors.background}
                  onChange={(value) => updateColor('background', value)}
                />
                <ColorInput
                  label="Surface"
                  value={customTheme.colors.surface}
                  onChange={(value) => updateColor('surface', value)}
                />
                <ColorInput
                  label="Border"
                  value={customTheme.colors.border}
                  onChange={(value) => updateColor('border', value)}
                />
              </div>

              <h3>Text Colors</h3>
              <div className="cms-color-grid">
                <ColorInput
                  label="Text Primary"
                  value={customTheme.colors.textPrimary}
                  onChange={(value) => updateColor('textPrimary', value)}
                />
                <ColorInput
                  label="Text Secondary"
                  value={customTheme.colors.textSecondary}
                  onChange={(value) => updateColor('textSecondary', value)}
                />
              </div>
            </div>
          )}

          {activeTab === 'typography' && (
            <div className="cms-customizer-section">
              <h3>Font Families</h3>
              <TextInput
                label="Font Family"
                value={customTheme.typography.fontFamily}
                onChange={(value) => updateTypography('fontFamily', value)}
              />
              <TextInput
                label="Heading Font"
                value={customTheme.typography.fontFamilyHeading}
                onChange={(value) => updateTypography('fontFamilyHeading', value)}
              />
              <TextInput
                label="Monospace Font"
                value={customTheme.typography.fontFamilyMono}
                onChange={(value) => updateTypography('fontFamilyMono', value)}
              />

              <h3>Font Sizes</h3>
              <div className="cms-input-grid">
                <TextInput
                  label="Small"
                  value={customTheme.typography.fontSizeSm}
                  onChange={(value) => updateTypography('fontSizeSm', value)}
                />
                <TextInput
                  label="Medium"
                  value={customTheme.typography.fontSizeMd}
                  onChange={(value) => updateTypography('fontSizeMd', value)}
                />
                <TextInput
                  label="Large"
                  value={customTheme.typography.fontSizeLg}
                  onChange={(value) => updateTypography('fontSizeLg', value)}
                />
              </div>
            </div>
          )}

          {activeTab === 'spacing' && (
            <div className="cms-customizer-section">
              <h3>Spacing Scale</h3>
              <div className="cms-input-grid">
                {Object.entries(customTheme.spacing).map(([key, value]) => (
                  <TextInput
                    key={key}
                    label={key.toUpperCase()}
                    value={value}
                    onChange={(newValue) => updateSpacing(key as keyof Theme['spacing'], newValue)}
                  />
                ))}
              </div>

              <h3>Border Radius</h3>
              <div className="cms-input-grid">
                {Object.entries(customTheme.borderRadius).map(([key, value]) => (
                  <TextInput
                    key={key}
                    label={key.toUpperCase()}
                    value={value}
                    onChange={(newValue) => setCustomTheme(createTheme(customTheme, {
                      borderRadius: { [key]: newValue },
                    }))}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'advanced' && (
            <div className="cms-customizer-section">
              <h3>Import/Export</h3>
              <div className="cms-import-export">
                <button onClick={handleExport} className="cms-btn-secondary">
                  Export Theme
                </button>
                <label className="cms-btn-secondary">
                  Import Theme
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>

              <h3>Theme Name</h3>
              <TextInput
                label="Name"
                value={customTheme.name}
                onChange={(value) => setCustomTheme({ ...customTheme, name: value })}
              />

              <h3>Preview</h3>
              <div className="cms-theme-preview-box">
                <div style={{ background: customTheme.colors.primary, padding: '1rem', borderRadius: customTheme.borderRadius.md }}>
                  <p style={{ color: customTheme.colors.primaryContrast, margin: 0 }}>
                    Primary Color Preview
                  </p>
                </div>
                <div style={{ background: customTheme.colors.surface, padding: '1rem', borderRadius: customTheme.borderRadius.md, marginTop: '0.5rem' }}>
                  <p style={{ color: customTheme.colors.textPrimary, margin: 0 }}>
                    Surface with Text
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="cms-theme-customizer-footer">
          <button onClick={resetTheme} className="cms-btn-secondary">
            Reset
          </button>
          <div>
            <button onClick={onClose} className="cms-btn-secondary">
              Cancel
            </button>
            <button onClick={applyTheme} className="cms-btn-primary">
              Apply Theme
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <div className="cms-color-input">
      <label>{label}</label>
      <div className="cms-color-input-wrapper">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
        />
      </div>
    </div>
  );
}

function TextInput({ label, value, onChange }: { label: string; value: string | number; onChange: (value: string) => void }) {
  return (
    <div className="cms-text-input">
      <label>{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
