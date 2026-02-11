import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useState, useCallback, useEffect, useRef } from "react";
import { $getSelection, $isRangeSelection, $isTextNode } from "lexical";
import { $patchStyleText } from "@lexical/selection";
import { MdSettings } from "react-icons/md";
import { TbBoxPadding, TbBoxMargin } from "react-icons/tb";

const SPACING_PRESETS = [0, 4, 8, 12, 16, 20, 24, 32, 40, 48];

export default function SpacingPlugin() {
  const [editor] = useLexicalComposerContext();
  const [showSpacingMenu, setShowSpacingMenu] = useState(false);
  const [spacingPosition, setSpacingPosition] = useState({ top: 0, left: 0 });
  const spacingRef = useRef<HTMLDivElement>(null);

  // Current values
  const [display, setDisplay] = useState<'inline' | 'inline-block' | 'block'>('inline');
  const [paddingTop, setPaddingTop] = useState(0);
  const [paddingRight, setPaddingRight] = useState(0);
  const [paddingBottom, setPaddingBottom] = useState(0);
  const [paddingLeft, setPaddingLeft] = useState(0);
  const [marginTop, setMarginTop] = useState(0);
  const [marginRight, setMarginRight] = useState(0);
  const [marginBottom, setMarginBottom] = useState(0);
  const [marginLeft, setMarginLeft] = useState(0);

  // Update current values based on selection
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const nodes = selection.getNodes();
          if (nodes.length > 0) {
            const node = nodes[0];
            if ($isTextNode(node)) {
              const style = node.getStyle();
              
              // Parse display
              const displayMatch = style.match(/display:\s*([^;]+)/);
              if (displayMatch) {
                setDisplay(displayMatch[1].trim() as any);
              }

              // Parse padding
              const paddingTopMatch = style.match(/padding-top:\s*(\d+)px/);
              const paddingRightMatch = style.match(/padding-right:\s*(\d+)px/);
              const paddingBottomMatch = style.match(/padding-bottom:\s*(\d+)px/);
              const paddingLeftMatch = style.match(/padding-left:\s*(\d+)px/);
              
              if (paddingTopMatch) setPaddingTop(parseInt(paddingTopMatch[1]));
              if (paddingRightMatch) setPaddingRight(parseInt(paddingRightMatch[1]));
              if (paddingBottomMatch) setPaddingBottom(parseInt(paddingBottomMatch[1]));
              if (paddingLeftMatch) setPaddingLeft(parseInt(paddingLeftMatch[1]));

              // Parse margin
              const marginTopMatch = style.match(/margin-top:\s*(\d+)px/);
              const marginRightMatch = style.match(/margin-right:\s*(\d+)px/);
              const marginBottomMatch = style.match(/margin-bottom:\s*(\d+)px/);
              const marginLeftMatch = style.match(/margin-left:\s*(\d+)px/);
              
              if (marginTopMatch) setMarginTop(parseInt(marginTopMatch[1]));
              if (marginRightMatch) setMarginRight(parseInt(marginRightMatch[1]));
              if (marginBottomMatch) setMarginBottom(parseInt(marginBottomMatch[1]));
              if (marginLeftMatch) setMarginLeft(parseInt(marginLeftMatch[1]));
            }
          }
        }
      });
    });
  }, [editor]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (spacingRef.current && !spacingRef.current.contains(event.target as Node)) {
        setShowSpacingMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const applyStyles = useCallback((styles: Record<string, string | null>) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, styles);
      }
    });
  }, [editor]);

  const handleDisplayChange = useCallback((newDisplay: 'inline' | 'inline-block' | 'block') => {
    applyStyles({ display: newDisplay });
    setDisplay(newDisplay);
  }, [applyStyles]);

  const handlePaddingChange = useCallback((side: 'top' | 'right' | 'bottom' | 'left', value: number) => {
    const styleKey = `padding-${side}`;
    applyStyles({ [styleKey]: `${value}px` });
    
    if (side === 'top') setPaddingTop(value);
    else if (side === 'right') setPaddingRight(value);
    else if (side === 'bottom') setPaddingBottom(value);
    else if (side === 'left') setPaddingLeft(value);
  }, [applyStyles]);

  const handleMarginChange = useCallback((side: 'top' | 'right' | 'bottom' | 'left', value: number) => {
    const styleKey = `margin-${side}`;
    applyStyles({ [styleKey]: `${value}px` });
    
    if (side === 'top') setMarginTop(value);
    else if (side === 'right') setMarginRight(value);
    else if (side === 'bottom') setMarginBottom(value);
    else if (side === 'left') setMarginLeft(value);
  }, [applyStyles]);

  const handlePaddingAll = useCallback((value: number) => {
    applyStyles({
      'padding-top': `${value}px`,
      'padding-right': `${value}px`,
      'padding-bottom': `${value}px`,
      'padding-left': `${value}px`,
    });
    setPaddingTop(value);
    setPaddingRight(value);
    setPaddingBottom(value);
    setPaddingLeft(value);
  }, [applyStyles]);

  const handleMarginAll = useCallback((value: number) => {
    applyStyles({
      'margin-top': `${value}px`,
      'margin-right': `${value}px`,
      'margin-bottom': `${value}px`,
      'margin-left': `${value}px`,
    });
    setMarginTop(value);
    setMarginRight(value);
    setMarginBottom(value);
    setMarginLeft(value);
  }, [applyStyles]);

  const resetSpacing = useCallback(() => {
    applyStyles({
      display: null,
      'padding-top': null,
      'padding-right': null,
      'padding-bottom': null,
      'padding-left': null,
      'margin-top': null,
      'margin-right': null,
      'margin-bottom': null,
      'margin-left': null,
    });
    setDisplay('inline');
    setPaddingTop(0);
    setPaddingRight(0);
    setPaddingBottom(0);
    setPaddingLeft(0);
    setMarginTop(0);
    setMarginRight(0);
    setMarginBottom(0);
    setMarginLeft(0);
  }, [applyStyles]);

  const toggleSpacingMenu = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (!showSpacingMenu) {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      setSpacingPosition({
        top: rect.bottom + 8,
        left: rect.left
      });
    }
    setShowSpacingMenu(!showSpacingMenu);
  }, [showSpacingMenu]);

  return (
    <div className="cms-spacing-plugin" ref={spacingRef}>
      <button
        className="cms-toolbar-button"
        onClick={toggleSpacingMenu}
        title="Spacing & Display"
        type="button"
      >
        <MdSettings size={18} />
      </button>

      {showSpacingMenu && (
        <div 
          className="cms-spacing-menu"
          style={{
            top: `${spacingPosition.top}px`,
            left: `${spacingPosition.left}px`
          }}
        >
          <div className="cms-spacing-header">
            <span>Spacing & Display</span>
            <button 
              className="cms-spacing-reset-btn"
              onClick={resetSpacing}
              type="button"
            >
              Reset
            </button>
          </div>

          {/* Display Mode */}
          <div className="cms-spacing-section">
            <div className="cms-spacing-label">Display Mode</div>
            <div className="cms-spacing-display-buttons">
              <button
                className={`cms-spacing-display-btn ${display === 'inline' ? 'active' : ''}`}
                onClick={() => handleDisplayChange('inline')}
                type="button"
              >
                Inline
              </button>
              <button
                className={`cms-spacing-display-btn ${display === 'inline-block' ? 'active' : ''}`}
                onClick={() => handleDisplayChange('inline-block')}
                type="button"
              >
                Inline Block
              </button>
              <button
                className={`cms-spacing-display-btn ${display === 'block' ? 'active' : ''}`}
                onClick={() => handleDisplayChange('block')}
                type="button"
              >
                Block
              </button>
            </div>
          </div>

          {/* Padding */}
          <div className="cms-spacing-section">
            <div className="cms-spacing-label">
              <TbBoxPadding size={16} />
              <span>Padding (px)</span>
            </div>
            
            <div className="cms-spacing-quick-buttons">
              {SPACING_PRESETS.map((value) => (
                <button
                  key={`padding-${value}`}
                  className="cms-spacing-quick-btn"
                  onClick={() => handlePaddingAll(value)}
                  type="button"
                >
                  {value}
                </button>
              ))}
            </div>

            <div className="cms-spacing-controls">
              <div className="cms-spacing-control">
                <label>Top</label>
                <input
                  type="number"
                  min="0"
                  max="200"
                  value={paddingTop}
                  onChange={(e) => handlePaddingChange('top', parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="cms-spacing-control">
                <label>Right</label>
                <input
                  type="number"
                  min="0"
                  max="200"
                  value={paddingRight}
                  onChange={(e) => handlePaddingChange('right', parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="cms-spacing-control">
                <label>Bottom</label>
                <input
                  type="number"
                  min="0"
                  max="200"
                  value={paddingBottom}
                  onChange={(e) => handlePaddingChange('bottom', parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="cms-spacing-control">
                <label>Left</label>
                <input
                  type="number"
                  min="0"
                  max="200"
                  value={paddingLeft}
                  onChange={(e) => handlePaddingChange('left', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
          </div>

          {/* Margin */}
          <div className="cms-spacing-section">
            <div className="cms-spacing-label">
              <TbBoxMargin size={16} />
              <span>Margin (px)</span>
            </div>
            
            <div className="cms-spacing-quick-buttons">
              {SPACING_PRESETS.map((value) => (
                <button
                  key={`margin-${value}`}
                  className="cms-spacing-quick-btn"
                  onClick={() => handleMarginAll(value)}
                  type="button"
                >
                  {value}
                </button>
              ))}
            </div>

            <div className="cms-spacing-controls">
              <div className="cms-spacing-control">
                <label>Top</label>
                <input
                  type="number"
                  min="0"
                  max="200"
                  value={marginTop}
                  onChange={(e) => handleMarginChange('top', parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="cms-spacing-control">
                <label>Right</label>
                <input
                  type="number"
                  min="0"
                  max="200"
                  value={marginRight}
                  onChange={(e) => handleMarginChange('right', parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="cms-spacing-control">
                <label>Bottom</label>
                <input
                  type="number"
                  min="0"
                  max="200"
                  value={marginBottom}
                  onChange={(e) => handleMarginChange('bottom', parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="cms-spacing-control">
                <label>Left</label>
                <input
                  type="number"
                  min="0"
                  max="200"
                  value={marginLeft}
                  onChange={(e) => handleMarginChange('left', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
