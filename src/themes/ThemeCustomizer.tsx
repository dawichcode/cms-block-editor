import React, { useState } from 'react';
import { useTheme } from './ThemeProvider';
import { Theme, ThemeOverride } from './types';
import { 
  createTheme, 
  exportTheme, 
  importTheme, 
  generatePalette,
  validateTheme 
} from './themeBuilder';

interface ThemeCustomizerProps {
  onClose?: () => void;
}

type TabType = 'colors' | 'typography' | 'spacing' | 'effects' | 'advanced' | 'preview';

export function ThemeCustomizer({ onClose }: ThemeCustomizerProps) {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>('colors');
  const [customTheme, setCustomTheme] = useState<Theme>(theme);
  const [searchQuery, setSearchQuery] = useState('');
  const [showColorPicker, setShowColorPicker] = useState<string | null>(null);
  const [history, setHistory] = useState<Theme[]>([theme]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const updateTheme = (override: ThemeOverride) => {
    const updated = createTheme(customTheme, override);
    setCustomTheme(updated);
    
    // Add to history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(updated);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCustomTheme(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCustomTheme(history[historyIndex + 1]);
    }
  };

  const applyTheme = () => {
    setTheme(customTheme);
    onClose?.();
  };

  const resetTheme = () => {
    setCustomTheme(theme);
    setHistory([theme]);
    setHistoryIndex(0);
  };

  return (
    <div className="cms-theme-customizer-advanced">
      <ThemeCustomizerContent
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        customTheme={customTheme}
        updateTheme={updateTheme}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showColorPicker={showColorPicker}
        setShowColorPicker={setShowColorPicker}
        onClose={onClose}
        applyTheme={applyTheme}
        resetTheme={resetTheme}
        undo={undo}
        redo={redo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
      />
    </div>
  );
}


interface ThemeCustomizerContentProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  customTheme: Theme;
  updateTheme: (override: ThemeOverride) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showColorPicker: string | null;
  setShowColorPicker: (key: string | null) => void;
  onClose?: () => void;
  applyTheme: () => void;
  resetTheme: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

function ThemeCustomizerContent(props: ThemeCustomizerContentProps) {
  const {
    activeTab,
    setActiveTab,
    customTheme,
    updateTheme,
    searchQuery,
    setSearchQuery,
    showColorPicker,
    setShowColorPicker,
    onClose,
    applyTheme,
    resetTheme,
    undo,
    redo,
    canUndo,
    canRedo,
  } = props;

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
        updateTheme(imported as any);
      } catch (error) {
        alert(`Failed to import theme: ${error}`);
      }
    };
    reader.readAsText(file);
  };

  const generateFromBrand = (brandColor: string) => {
    const palette = generatePalette(brandColor);
    updateTheme({
      colors: {
        primary: palette.primary.base,
        primaryHover: palette.primary.dark,
        primaryLight: palette.primary.light,
        primaryDark: palette.primary.darker,
        secondary: palette.secondary.base,
        secondaryHover: palette.secondary.dark,
        accent: palette.accent.base,
      },
    });
  };

  return (
    <>
      <div className="cms-theme-customizer-overlay" onClick={onClose} />
      <div className="cms-theme-customizer-panel-advanced">
        {/* Header */}
        <div className="cms-theme-customizer-header-advanced">
          <div className="cms-header-left">
            <h2>🎨 Theme Studio</h2>
            <span className="cms-theme-name-badge">{customTheme.name}</span>
          </div>
          <div className="cms-header-actions">
            <button 
              onClick={undo} 
              disabled={!canUndo}
              className="cms-icon-btn"
              title="Undo (Cmd+Z)"
            >
              ↶
            </button>
            <button 
              onClick={redo} 
              disabled={!canRedo}
              className="cms-icon-btn"
              title="Redo (Cmd+Shift+Z)"
            >
              ↷
            </button>
            <button onClick={handleExport} className="cms-icon-btn" title="Export">
              ⬇
            </button>
            <label className="cms-icon-btn" title="Import">
              ⬆
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                style={{ display: 'none' }}
              />
            </label>
            <button onClick={onClose} className="cms-close-btn-advanced">×</button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="cms-search-bar">
          <input
            type="text"
            placeholder="Search properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="cms-search-input"
          />
        </div>

        {/* Tabs */}
        <div className="cms-theme-tabs-advanced">
          <TabButton active={activeTab === 'colors'} onClick={() => setActiveTab('colors')} icon="🎨">
            Colors
          </TabButton>
          <TabButton active={activeTab === 'typography'} onClick={() => setActiveTab('typography')} icon="Aa">
            Typography
          </TabButton>
          <TabButton active={activeTab === 'spacing'} onClick={() => setActiveTab('spacing')} icon="📏">
            Spacing
          </TabButton>
          <TabButton active={activeTab === 'effects'} onClick={() => setActiveTab('effects')} icon="✨">
            Effects
          </TabButton>
          <TabButton active={activeTab === 'advanced'} onClick={() => setActiveTab('advanced')} icon="⚙️">
            Advanced
          </TabButton>
          <TabButton active={activeTab === 'preview'} onClick={() => setActiveTab('preview')} icon="👁️">
            Preview
          </TabButton>
        </div>

        {/* Content */}
        <div className="cms-theme-content-advanced">
          {activeTab === 'colors' && (
            <ColorsTab 
              theme={customTheme} 
              updateTheme={updateTheme}
              searchQuery={searchQuery}
              showColorPicker={showColorPicker}
              setShowColorPicker={setShowColorPicker}
              generateFromBrand={generateFromBrand}
            />
          )}
          {activeTab === 'typography' && (
            <TypographyTab theme={customTheme} updateTheme={updateTheme} searchQuery={searchQuery} />
          )}
          {activeTab === 'spacing' && (
            <SpacingTab theme={customTheme} updateTheme={updateTheme} searchQuery={searchQuery} />
          )}
          {activeTab === 'effects' && (
            <EffectsTab theme={customTheme} updateTheme={updateTheme} searchQuery={searchQuery} />
          )}
          {activeTab === 'advanced' && (
            <AdvancedTab theme={customTheme} updateTheme={updateTheme} />
          )}
          {activeTab === 'preview' && (
            <PreviewTab theme={customTheme} />
          )}
        </div>

        {/* Footer */}
        <div className="cms-theme-footer-advanced">
          <button onClick={resetTheme} className="cms-btn-secondary">
            Reset All
          </button>
          <div className="cms-footer-actions">
            <button onClick={onClose} className="cms-btn-secondary">
              Cancel
            </button>
            <button onClick={applyTheme} className="cms-btn-primary">
              Apply Theme
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function TabButton({ active, onClick, icon, children }: { active: boolean; onClick: () => void; icon: string; children: React.ReactNode }) {
  return (
    <button
      className={`cms-tab-btn-advanced ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      <span className="cms-tab-icon">{icon}</span>
      <span className="cms-tab-label">{children}</span>
    </button>
  );
}


// Colors Tab
function ColorsTab({ 
  theme, 
  updateTheme, 
  searchQuery,
  showColorPicker,
  setShowColorPicker,
  generateFromBrand 
}: { 
  theme: Theme; 
  updateTheme: (override: ThemeOverride) => void;
  searchQuery: string;
  showColorPicker: string | null;
  setShowColorPicker: (key: string | null) => void;
  generateFromBrand: (color: string) => void;
}) {
  const [brandColor, setBrandColor] = useState('#667eea');

  const colorGroups = [
    { title: 'Primary', keys: ['primary', 'primaryHover', 'primaryLight', 'primaryDark', 'primaryContrast'] },
    { title: 'Secondary', keys: ['secondary', 'secondaryHover', 'secondaryLight', 'secondaryDark', 'secondaryContrast'] },
    { title: 'Accent', keys: ['accent', 'accentHover', 'accentLight', 'accentDark'] },
    { title: 'Background', keys: ['background', 'backgroundAlt', 'surface', 'surfaceHover', 'surfaceActive'] },
    { title: 'Border', keys: ['border', 'borderHover', 'divider', 'overlay'] },
    { title: 'Text', keys: ['textPrimary', 'textSecondary', 'textTertiary', 'textDisabled', 'textInverse'] },
    { title: 'Status', keys: ['success', 'successLight', 'successDark', 'warning', 'warningLight', 'warningDark', 'error', 'errorLight', 'errorDark', 'info', 'infoLight', 'infoDark'] },
    { title: 'Editor', keys: ['editorBackground', 'editorText', 'editorPlaceholder', 'editorCursor', 'toolbarBackground', 'toolbarText', 'toolbarBorder', 'toolbarIconHover'] },
    { title: 'Selection', keys: ['selection', 'selectionText', 'highlight', 'highlightText', 'focus', 'focusRing'] },
    { title: 'Code', keys: ['codeBackground', 'codeText', 'codeComment', 'codeKeyword', 'codeString', 'codeNumber', 'codeFunction', 'codeOperator'] },
  ];

  const filteredGroups = colorGroups.map(group => ({
    ...group,
    keys: group.keys.filter(key => 
      key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(group => group.keys.length > 0);

  return (
    <div className="cms-colors-tab">
      {/* Brand Color Generator */}
      <div className="cms-brand-generator">
        <h3>🎨 Generate from Brand Color</h3>
        <div className="cms-brand-input-group">
          <input
            type="color"
            value={brandColor}
            onChange={(e) => setBrandColor(e.target.value)}
            className="cms-brand-color-picker"
          />
          <input
            type="text"
            value={brandColor}
            onChange={(e) => setBrandColor(e.target.value)}
            className="cms-brand-color-input"
            placeholder="#667eea"
          />
          <button 
            onClick={() => generateFromBrand(brandColor)}
            className="cms-btn-primary"
          >
            Generate Palette
          </button>
        </div>
      </div>

      {/* Color Groups */}
      {filteredGroups.map((group) => (
        <div key={group.title} className="cms-color-group">
          <h3>{group.title}</h3>
          <div className="cms-color-grid-advanced">
            {group.keys.map((key) => (
              <AdvancedColorInput
                key={key}
                label={formatLabel(key)}
                value={(theme.colors as any)[key]}
                onChange={(value) => updateTheme({ colors: { [key]: value } })}
                showPicker={showColorPicker === key}
                onTogglePicker={() => setShowColorPicker(showColorPicker === key ? null : key)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Typography Tab
function TypographyTab({ theme, updateTheme, searchQuery }: { theme: Theme; updateTheme: (override: ThemeOverride) => void; searchQuery: string }) {
  const typographyGroups = [
    { title: 'Font Families', keys: ['fontFamily', 'fontFamilyHeading', 'fontFamilyMono'] },
    { title: 'Font Sizes', keys: ['fontSizeXxs', 'fontSizeXs', 'fontSizeSm', 'fontSizeMd', 'fontSizeLg', 'fontSizeXl', 'fontSizeXxl', 'fontSize3xl', 'fontSize4xl'] },
    { title: 'Font Weights', keys: ['fontWeightLight', 'fontWeightNormal', 'fontWeightMedium', 'fontWeightSemibold', 'fontWeightBold', 'fontWeightExtrabold'] },
    { title: 'Line Heights', keys: ['lineHeightTight', 'lineHeightSnug', 'lineHeightNormal', 'lineHeightRelaxed', 'lineHeightLoose'] },
    { title: 'Letter Spacing', keys: ['letterSpacingTight', 'letterSpacingNormal', 'letterSpacingWide', 'letterSpacingWider'] },
  ];

  const filteredGroups = searchQuery 
    ? typographyGroups.map(group => ({
        ...group,
        keys: group.keys.filter(key => 
          key.toLowerCase().includes(searchQuery.toLowerCase()) ||
          group.title.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter(group => group.keys.length > 0)
    : typographyGroups;

  return (
    <div className="cms-typography-tab">
      {filteredGroups.map((group) => (
        <div key={group.title} className="cms-property-group">
          <h3>{group.title}</h3>
          <div className="cms-property-grid">
            {group.keys.map((key) => (
              <PropertyInput
                key={key}
                label={formatLabel(key)}
                value={(theme.typography as any)[key]}
                onChange={(value) => updateTheme({ typography: { [key]: value } })}
                type={group.title === 'Font Weights' ? 'number' : 'text'}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Spacing Tab
function SpacingTab({ theme, updateTheme, searchQuery }: { theme: Theme; updateTheme: (override: ThemeOverride) => void; searchQuery: string }) {
  return (
    <div className="cms-spacing-tab">
      <div className="cms-property-group">
        <h3>Spacing Scale</h3>
        <div className="cms-spacing-visual">
          {Object.entries(theme.spacing).map(([key, value]) => (
            <div key={key} className="cms-spacing-item">
              <div className="cms-spacing-label">{key.toUpperCase()}</div>
              <div className="cms-spacing-bar" style={{ width: value }}>
                <span>{value}</span>
              </div>
              <input
                type="text"
                value={value}
                onChange={(e) => updateTheme({ spacing: { [key]: e.target.value } })}
                className="cms-spacing-input"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="cms-property-group">
        <h3>Border Radius</h3>
        <div className="cms-radius-grid">
          {Object.entries(theme.borderRadius).map(([key, value]) => (
            <div key={key} className="cms-radius-item">
              <div className="cms-radius-preview" style={{ borderRadius: value }} />
              <PropertyInput
                label={key.toUpperCase()}
                value={value}
                onChange={(newValue) => updateTheme({ borderRadius: { [key]: newValue } })}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Effects Tab
function EffectsTab({ theme, updateTheme, searchQuery }: { theme: Theme; updateTheme: (override: ThemeOverride) => void; searchQuery: string }) {
  return (
    <div className="cms-effects-tab">
      <div className="cms-property-group">
        <h3>Shadows</h3>
        <div className="cms-shadow-grid">
          {Object.entries(theme.shadows).map(([key, value]) => (
            <div key={key} className="cms-shadow-item">
              <div className="cms-shadow-preview" style={{ boxShadow: value }} />
              <PropertyInput
                label={key.toUpperCase()}
                value={value}
                onChange={(newValue) => updateTheme({ shadows: { [key]: newValue } })}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="cms-property-group">
        <h3>Transitions</h3>
        <div className="cms-property-grid">
          {Object.entries(theme.transitions).map(([key, value]) => (
            <PropertyInput
              key={key}
              label={formatLabel(key)}
              value={value}
              onChange={(newValue) => updateTheme({ transitions: { [key]: newValue } })}
            />
          ))}
        </div>
      </div>

      <div className="cms-property-group">
        <h3>Gradients</h3>
        <div className="cms-gradient-grid">
          {Object.entries(theme.gradients).map(([key, value]) => (
            <div key={key} className="cms-gradient-item">
              <div className="cms-gradient-preview" style={{ background: value }} />
              <PropertyInput
                label={formatLabel(key)}
                value={value}
                onChange={(newValue) => updateTheme({ gradients: { [key]: newValue } })}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Advanced Tab
function AdvancedTab({ theme, updateTheme }: { theme: Theme; updateTheme: (override: ThemeOverride) => void }) {
  const validation = validateTheme(theme);

  return (
    <div className="cms-advanced-tab">
      <div className="cms-property-group">
        <h3>Theme Information</h3>
        <PropertyInput
          label="Theme Name"
          value={theme.name}
          onChange={(value) => updateTheme({ name: value } as any)}
        />
        <div className="cms-theme-mode">
          <label>Mode</label>
          <select 
            value={theme.mode}
            onChange={(e) => updateTheme({ mode: e.target.value as 'light' | 'dark' } as any)}
            className="cms-select"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>

      <div className="cms-property-group">
        <h3>Validation</h3>
        <div className={`cms-validation ${validation.valid ? 'valid' : 'invalid'}`}>
          {validation.valid ? (
            <div className="cms-validation-success">
              ✓ Theme is valid
            </div>
          ) : (
            <div className="cms-validation-errors">
              <strong>Errors:</strong>
              <ul>
                {validation.errors.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="cms-property-group">
        <h3>Breakpoints</h3>
        <div className="cms-property-grid">
          {Object.entries(theme.breakpoints).map(([key, value]) => (
            <PropertyInput
              key={key}
              label={key.toUpperCase()}
              value={value}
              onChange={(newValue) => updateTheme({ breakpoints: { [key]: newValue } })}
            />
          ))}
        </div>
      </div>

      <div className="cms-property-group">
        <h3>Z-Index Layers</h3>
        <div className="cms-property-grid">
          {Object.entries(theme.zIndex).map(([key, value]) => (
            <PropertyInput
              key={key}
              label={formatLabel(key)}
              value={String(value)}
              onChange={(newValue) => updateTheme({ zIndex: { [key]: Number(newValue) } })}
              type="number"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Preview Tab
function PreviewTab({ theme }: { theme: Theme }) {
  return (
    <div className="cms-preview-tab" style={{
      background: theme.colors.background,
      color: theme.colors.textPrimary,
      fontFamily: theme.typography.fontFamily,
    }}>
      <div className="cms-preview-section">
        <h2 style={{ color: theme.colors.textPrimary }}>Theme Preview</h2>
        
        <div className="cms-preview-colors">
          <div className="cms-preview-color-box" style={{ background: theme.colors.primary, color: theme.colors.primaryContrast }}>
            Primary
          </div>
          <div className="cms-preview-color-box" style={{ background: theme.colors.secondary, color: theme.colors.secondaryContrast }}>
            Secondary
          </div>
          <div className="cms-preview-color-box" style={{ background: theme.colors.accent }}>
            Accent
          </div>
        </div>

        <div className="cms-preview-card" style={{
          background: theme.colors.surface,
          borderRadius: theme.borderRadius.lg,
          boxShadow: theme.shadows.md,
          padding: theme.spacing.lg,
        }}>
          <h3 style={{ color: theme.colors.textPrimary }}>Card Component</h3>
          <p style={{ color: theme.colors.textSecondary }}>
            This is how your theme looks in a card component with surface background and shadow.
          </p>
          <button style={{
            background: theme.colors.primary,
            color: theme.colors.primaryContrast,
            padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
            borderRadius: theme.borderRadius.md,
            border: 'none',
            cursor: 'pointer',
          }}>
            Primary Button
          </button>
        </div>

        <div className="cms-preview-typography">
          <h1 style={{ fontSize: theme.typography.fontSize4xl }}>Heading 1</h1>
          <h2 style={{ fontSize: theme.typography.fontSize3xl }}>Heading 2</h2>
          <h3 style={{ fontSize: theme.typography.fontSizeXxl }}>Heading 3</h3>
          <p style={{ fontSize: theme.typography.fontSizeMd, lineHeight: theme.typography.lineHeightNormal }}>
            Body text with normal line height and medium font size.
          </p>
        </div>
      </div>
    </div>
  );
}


// Advanced Color Input with Picker
function AdvancedColorInput({ 
  label, 
  value, 
  onChange,
  showPicker,
  onTogglePicker 
}: { 
  label: string; 
  value: string; 
  onChange: (value: string) => void;
  showPicker: boolean;
  onTogglePicker: () => void;
}) {
  return (
    <div className="cms-advanced-color-input">
      <label>{label}</label>
      <div className="cms-color-input-wrapper-advanced">
        <div 
          className="cms-color-swatch"
          style={{ background: value }}
          onClick={onTogglePicker}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="cms-color-text-input"
          placeholder="#000000"
        />
        {showPicker && (
          <div className="cms-color-picker-popover">
            <input
              type="color"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="cms-color-picker-native"
            />
            <div className="cms-color-presets">
              {['#667eea', '#764ba2', '#f59e0b', '#10b981', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899'].map((preset) => (
                <div
                  key={preset}
                  className="cms-color-preset"
                  style={{ background: preset }}
                  onClick={() => onChange(preset)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Property Input
function PropertyInput({ 
  label, 
  value, 
  onChange,
  type = 'text' 
}: { 
  label: string; 
  value: string | number; 
  onChange: (value: string) => void;
  type?: 'text' | 'number';
}) {
  return (
    <div className="cms-property-input">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="cms-property-input-field"
      />
    </div>
  );
}

// Utility function
function formatLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}
