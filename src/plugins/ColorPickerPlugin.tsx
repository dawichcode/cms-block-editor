import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useState, useCallback, useEffect, useRef } from "react";
import { $getSelection, $isRangeSelection, $isTextNode } from "lexical";
import { $patchStyleText } from "@lexical/selection";
import { MdFormatColorText, MdFormatColorFill } from "react-icons/md";

const PRESET_COLORS = [
  '#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#efefef', '#f3f3f3', '#ffffff',
  '#980000', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#4a86e8', '#0000ff', '#9900ff', '#ff00ff',
  '#e6b8af', '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#c9daf8', '#cfe2f3', '#d9d2e9', '#ead1dc',
  '#dd7e6b', '#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a2c4c9', '#a4c2f4', '#9fc5e8', '#b4a7d6', '#d5a6bd',
  '#cc4125', '#e06666', '#f6b26b', '#ffd966', '#93c47d', '#76a5af', '#6d9eeb', '#6fa8dc', '#8e7cc3', '#c27ba0',
  '#a61c00', '#cc0000', '#e69138', '#f1c232', '#6aa84f', '#45818e', '#3c78d8', '#3d85c6', '#674ea7', '#a64d79',
  '#85200c', '#990000', '#b45f06', '#bf9000', '#38761d', '#134f5c', '#1155cc', '#0b5394', '#351c75', '#741b47',
  '#5b0f00', '#660000', '#783f04', '#7f6000', '#274e13', '#0c343d', '#1c4587', '#073763', '#20124d', '#4c1130',
];

export default function ColorPickerPlugin() {
  const [editor] = useLexicalComposerContext();
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const [currentTextColor, setCurrentTextColor] = useState('#000000');
  const [currentBgColor, setCurrentBgColor] = useState('transparent');
  const [textColorPosition, setTextColorPosition] = useState({ top: 0, left: 0 });
  const [bgColorPosition, setBgColorPosition] = useState({ top: 0, left: 0 });
  const textColorRef = useRef<HTMLDivElement>(null);
  const bgColorRef = useRef<HTMLDivElement>(null);

  // Update current colors based on selection
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
              const colorMatch = style.match(/color:\s*([^;]+)/);
              const bgMatch = style.match(/background-color:\s*([^;]+)/);
              
              if (colorMatch) {
                setCurrentTextColor(colorMatch[1].trim());
              }
              if (bgMatch) {
                setCurrentBgColor(bgMatch[1].trim());
              }
            }
          }
        }
      });
    });
  }, [editor]);

  // Close pickers when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (textColorRef.current && !textColorRef.current.contains(event.target as Node)) {
        setShowTextColorPicker(false);
      }
      if (bgColorRef.current && !bgColorRef.current.contains(event.target as Node)) {
        setShowBgColorPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const applyTextColor = useCallback((color: string) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, { color });
      }
    });
    setCurrentTextColor(color);
  }, [editor]);

  const applyBackgroundColor = useCallback((color: string) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, { 'background-color': color });
      }
    });
    setCurrentBgColor(color);
  }, [editor]);

  const toggleTextColorPicker = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (!showTextColorPicker) {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      setTextColorPosition({
        top: rect.bottom + 8,
        left: rect.left
      });
    }
    setShowTextColorPicker(!showTextColorPicker);
    setShowBgColorPicker(false);
  }, [showTextColorPicker]);

  const toggleBgColorPicker = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (!showBgColorPicker) {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      setBgColorPosition({
        top: rect.bottom + 8,
        left: rect.left
      });
    }
    setShowBgColorPicker(!showBgColorPicker);
    setShowTextColorPicker(false);
  }, [showBgColorPicker]);

  const removeTextColor = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, { color: null });
      }
    });
    setCurrentTextColor('#000000');
    setShowTextColorPicker(false);
  }, [editor]);

  const removeBgColor = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, { 'background-color': null });
      }
    });
    setCurrentBgColor('transparent');
    setShowBgColorPicker(false);
  }, [editor]);

  return (
    <>
      {/* Text Color */}
      <div className="cms-color-picker-plugin" ref={textColorRef}>
        <button
          className="cms-toolbar-button"
          onClick={toggleTextColorPicker}
          title="Text Color"
          type="button"
        >
          <div className="cms-color-button-wrapper">
            <MdFormatColorText size={18} />
            <div 
              className="cms-color-indicator" 
              style={{ backgroundColor: currentTextColor }}
            />
          </div>
        </button>

        {showTextColorPicker && (
          <div 
            className="cms-color-picker-menu"
            style={{
              top: `${textColorPosition.top}px`,
              left: `${textColorPosition.left}px`
            }}
          >
            <div className="cms-color-picker-header">
              <span>Text Color</span>
              <button 
                className="cms-color-remove-btn"
                onClick={removeTextColor}
                type="button"
              >
                Remove
              </button>
            </div>
            <div className="cms-color-grid">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  className={`cms-color-swatch ${currentTextColor === color ? 'active' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => applyTextColor(color)}
                  title={color}
                  type="button"
                />
              ))}
            </div>
            <div className="cms-color-custom">
              <label>
                Custom:
                <input
                  type="color"
                  value={currentTextColor}
                  onChange={(e) => applyTextColor(e.target.value)}
                  className="cms-color-input"
                />
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Background Color */}
      <div className="cms-color-picker-plugin" ref={bgColorRef}>
        <button
          className="cms-toolbar-button"
          onClick={toggleBgColorPicker}
          title="Background Color"
          type="button"
        >
          <div className="cms-color-button-wrapper">
            <MdFormatColorFill size={18} />
            <div 
              className="cms-color-indicator" 
              style={{ backgroundColor: currentBgColor === 'transparent' ? '#ffffff' : currentBgColor }}
            />
          </div>
        </button>

        {showBgColorPicker && (
          <div 
            className="cms-color-picker-menu"
            style={{
              top: `${bgColorPosition.top}px`,
              left: `${bgColorPosition.left}px`
            }}
          >
            <div className="cms-color-picker-header">
              <span>Background Color</span>
              <button 
                className="cms-color-remove-btn"
                onClick={removeBgColor}
                type="button"
              >
                Remove
              </button>
            </div>
            <div className="cms-color-grid">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  className={`cms-color-swatch ${currentBgColor === color ? 'active' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => applyBackgroundColor(color)}
                  title={color}
                  type="button"
                />
              ))}
            </div>
            <div className="cms-color-custom">
              <label>
                Custom:
                <input
                  type="color"
                  value={currentBgColor === 'transparent' ? '#ffffff' : currentBgColor}
                  onChange={(e) => applyBackgroundColor(e.target.value)}
                  className="cms-color-input"
                />
              </label>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
