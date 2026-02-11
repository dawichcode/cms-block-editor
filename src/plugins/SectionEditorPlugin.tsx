import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useState, useCallback, useRef, useEffect } from "react";
import { 
  $getSelection, 
  $isRangeSelection, 
  $getNodeByKey,
  SELECTION_CHANGE_COMMAND,
  COMMAND_PRIORITY_LOW
} from "lexical";
import { $isSectionNode, SectionNode } from "../blocks/SectionNode";
import { MdSettings, MdClose } from "react-icons/md";
import { 
  FaAlignLeft, 
  FaAlignCenter, 
  FaAlignRight, 
  FaAlignJustify 
} from "react-icons/fa";

const PRESET_COLORS = [
  '#ffffff', '#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da',
  '#adb5bd', '#6c757d', '#495057', '#343a40', '#212529',
  '#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b',
  '#fa709a', '#fee140', '#30cfd0', '#a8edea', '#fed6e3',
  '#ff6b6b', '#ee5a6f', '#c44569', '#f38181', '#fa8072',
  '#feca57', '#ff9ff3', '#54a0ff', '#48dbfb', '#1dd1a1',
];

export default function SectionEditorPlugin() {
  const [editor] = useLexicalComposerContext();
  const [selectedSection, setSelectedSection] = useState<{
    key: string;
    node: SectionNode;
  } | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [editorPosition, setEditorPosition] = useState({ top: 0, left: 0 });
  const editorRef = useRef<HTMLDivElement>(null);

  // Track selected section
  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        editor.getEditorState().read(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const nodes = selection.getNodes();
            
            // Find if we're inside a section
            for (const node of nodes) {
              let parent = node.getParent();
              while (parent) {
                if ($isSectionNode(parent)) {
                  setSelectedSection({
                    key: parent.getKey(),
                    node: parent
                  });
                  return;
                }
                parent = parent.getParent();
              }
            }
          }
          setSelectedSection(null);
        });
        return false;
      },
      COMMAND_PRIORITY_LOW
    );
  }, [editor]);

  // Close editor when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editorRef.current && !editorRef.current.contains(event.target as Node)) {
        setShowEditor(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleEditor = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (!showEditor) {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      setEditorPosition({
        top: rect.bottom + 8,
        left: rect.left
      });
    }
    setShowEditor(!showEditor);
  }, [showEditor]);

  const updateSection = useCallback((updater: (node: SectionNode) => void) => {
    if (!selectedSection) return;

    editor.update(() => {
      const node = $getNodeByKey(selectedSection.key);
      if ($isSectionNode(node)) {
        updater(node);
      }
    });
  }, [editor, selectedSection]);

  const setBackgroundColor = useCallback((color: string) => {
    updateSection((node) => node.setBackgroundColor(color));
  }, [updateSection]);

  const setBackgroundImage = useCallback((image: string) => {
    updateSection((node) => node.setBackgroundImage(image));
  }, [updateSection]);

  const setBackgroundSize = useCallback((size: string) => {
    updateSection((node) => node.setBackgroundSize(size));
  }, [updateSection]);

  const setBackgroundPosition = useCallback((position: string) => {
    updateSection((node) => node.setBackgroundPosition(position));
  }, [updateSection]);

  const setBackgroundRepeat = useCallback((repeat: string) => {
    updateSection((node) => node.setBackgroundRepeat(repeat));
  }, [updateSection]);

  const setGradientOverlay = useCallback((gradient: string) => {
    updateSection((node) => node.setGradientOverlay(gradient));
  }, [updateSection]);

  const setOpacity = useCallback((opacity: number) => {
    updateSection((node) => node.setOpacity(opacity));
  }, [updateSection]);

  const removeBackgroundImage = useCallback(() => {
    updateSection((node) => {
      node.setBackgroundImage(undefined);
      node.setGradientOverlay(undefined);
    });
  }, [updateSection]);

  const setTextAlign = useCallback((align: string) => {
    updateSection((node) => node.setTextAlign(align));
  }, [updateSection]);

  const setLayoutType = useCallback((layout: 'block' | 'flex' | 'grid') => {
    updateSection((node) => node.setLayoutType(layout));
  }, [updateSection]);

  const setFlexDirection = useCallback((direction: any) => {
    updateSection((node) => node.setFlexDirection(direction));
  }, [updateSection]);

  const setFlexWrap = useCallback((wrap: string) => {
    updateSection((node) => node.setFlexWrap(wrap));
  }, [updateSection]);

  const setAlignItems = useCallback((align: any) => {
    updateSection((node) => node.setAlignItems(align));
  }, [updateSection]);

  const setJustifyContent = useCallback((justify: any) => {
    updateSection((node) => node.setJustifyContent(justify));
  }, [updateSection]);

  const setGap = useCallback((gap: string) => {
    updateSection((node) => node.setGap(gap));
  }, [updateSection]);

  const setPadding = useCallback((padding: string) => {
    updateSection((node) => node.setPadding(padding));
  }, [updateSection]);

  const setMargin = useCallback((margin: string) => {
    updateSection((node) => node.setMargin(margin));
  }, [updateSection]);

  const setGridColumns = useCallback((columns: string) => {
    updateSection((node) => node.setGridTemplateColumns(columns));
  }, [updateSection]);

  const setGridRows = useCallback((rows: string) => {
    updateSection((node) => node.setGridTemplateRows(rows));
  }, [updateSection]);

  if (!selectedSection) {
    return null;
  }

  const node = selectedSection.node;
  const currentBgColor = node.getBackgroundColor() || '#ffffff';
  const currentBgImage = node.getBackgroundImage() || '';
  const currentBgSize = node.getBackgroundSize() || 'cover';
  const currentBgPosition = node.getBackgroundPosition() || 'center';
  const currentBgRepeat = node.getBackgroundRepeat() || 'no-repeat';
  const currentGradient = node.getGradientOverlay() || '';
  const currentOpacity = node.getOpacity() !== undefined ? node.getOpacity() : 1;
  const currentTextAlign = node.getTextAlign() || 'left';
  const currentLayout = node.getLayoutType() || 'block';
  const currentFlexDirection = node.getFlexDirection() || 'row';
  const currentFlexWrap = node.getFlexWrap() || 'nowrap';
  const currentAlignItems = node.getAlignItems() || 'stretch';
  const currentJustifyContent = node.getJustifyContent() || 'flex-start';
  const currentGap = node.getGap() || '0px';
  const currentPadding = node.getPadding() || '40px';
  const currentMargin = node.getMargin() || '0px';
  const currentGridColumns = node.getGridTemplateColumns() || 'repeat(3, 1fr)';
  const currentGridRows = node.getGridTemplateRows() || 'auto';

  return (
    <div className="cms-section-editor-plugin" ref={editorRef}>
      <button
        className="cms-toolbar-button cms-section-edit-button"
        onClick={toggleEditor}
        title="Edit Section"
        type="button"
      >
        <MdSettings size={18} />
        <span className="cms-section-indicator">Section</span>
      </button>

      {showEditor && (
        <div 
          className="cms-section-editor-menu"
          style={{
            top: `${editorPosition.top}px`,
            left: `${editorPosition.left}px`
          }}
        >
          <div className="cms-section-editor-header">
            <span>Section Settings</span>
            <button
              className="cms-close-button"
              onClick={() => setShowEditor(false)}
              type="button"
            >
              <MdClose size={16} />
            </button>
          </div>

          <div className="cms-section-editor-content">
            
            {/* Background Color */}
            <div className="cms-section-editor-group">
              <label>Background Color</label>
              <div className="cms-color-grid">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    className={`cms-color-swatch ${currentBgColor === color ? 'active' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setBackgroundColor(color)}
                    title={color}
                    type="button"
                  />
                ))}
              </div>
              <input
                type="color"
                value={currentBgColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="cms-color-input"
              />
            </div>

            {/* Background Image */}
            <div className="cms-section-editor-group">
              <label>Background Image</label>
              <input
                type="text"
                value={currentBgImage}
                onChange={(e) => setBackgroundImage(e.target.value ? `url(${e.target.value})` : '')}
                placeholder="Enter image URL"
                className="cms-text-input"
              />
              {currentBgImage && (
                <>
                  <div className="cms-bg-controls">
                    <div className="cms-bg-control-item">
                      <label>Size</label>
                      <select
                        value={currentBgSize}
                        onChange={(e) => setBackgroundSize(e.target.value)}
                        className="cms-select-small"
                      >
                        <option value="cover">Cover</option>
                        <option value="contain">Contain</option>
                        <option value="auto">Auto</option>
                        <option value="100% 100%">Stretch</option>
                      </select>
                    </div>
                    <div className="cms-bg-control-item">
                      <label>Position</label>
                      <select
                        value={currentBgPosition}
                        onChange={(e) => setBackgroundPosition(e.target.value)}
                        className="cms-select-small"
                      >
                        <option value="center">Center</option>
                        <option value="top">Top</option>
                        <option value="bottom">Bottom</option>
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                        <option value="top left">Top Left</option>
                        <option value="top right">Top Right</option>
                        <option value="bottom left">Bottom Left</option>
                        <option value="bottom right">Bottom Right</option>
                      </select>
                    </div>
                    <div className="cms-bg-control-item">
                      <label>Repeat</label>
                      <select
                        value={currentBgRepeat}
                        onChange={(e) => setBackgroundRepeat(e.target.value)}
                        className="cms-select-small"
                      >
                        <option value="no-repeat">No Repeat</option>
                        <option value="repeat">Repeat</option>
                        <option value="repeat-x">Repeat X</option>
                        <option value="repeat-y">Repeat Y</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={removeBackgroundImage}
                    className="cms-remove-button"
                    type="button"
                  >
                    Remove Background Image
                  </button>
                </>
              )}
            </div>

            {/* Gradient Overlay */}
            {currentBgImage && (
              <div className="cms-section-editor-group">
                <label>Gradient Overlay</label>
                <div className="cms-gradient-presets">
                  <button
                    onClick={() => setGradientOverlay('')}
                    className={`cms-gradient-preset ${!currentGradient ? 'active' : ''}`}
                    type="button"
                  >
                    None
                  </button>
                  <button
                    onClick={() => setGradientOverlay('linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7))')}
                    className="cms-gradient-preset"
                    style={{ background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7))' }}
                    title="Dark Gradient"
                    type="button"
                  />
                  <button
                    onClick={() => setGradientOverlay('linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))')}
                    className="cms-gradient-preset"
                    style={{ background: 'rgba(0,0,0,0.5)' }}
                    title="Dark Overlay"
                    type="button"
                  />
                  <button
                    onClick={() => setGradientOverlay('linear-gradient(rgba(102,126,234,0.8), rgba(118,75,162,0.8))')}
                    className="cms-gradient-preset"
                    style={{ background: 'linear-gradient(135deg, rgba(102,126,234,0.8), rgba(118,75,162,0.8))' }}
                    title="Purple Gradient"
                    type="button"
                  />
                  <button
                    onClick={() => setGradientOverlay('linear-gradient(rgba(250,112,154,0.8), rgba(254,225,64,0.8))')}
                    className="cms-gradient-preset"
                    style={{ background: 'linear-gradient(135deg, rgba(250,112,154,0.8), rgba(254,225,64,0.8))' }}
                    title="Sunset Gradient"
                    type="button"
                  />
                  <button
                    onClick={() => setGradientOverlay('linear-gradient(rgba(67,233,123,0.8), rgba(56,249,215,0.8))')}
                    className="cms-gradient-preset"
                    style={{ background: 'linear-gradient(135deg, rgba(67,233,123,0.8), rgba(56,249,215,0.8))' }}
                    title="Green Gradient"
                    type="button"
                  />
                </div>
                <input
                  type="text"
                  value={currentGradient}
                  onChange={(e) => setGradientOverlay(e.target.value)}
                  placeholder="Custom gradient (CSS)"
                  className="cms-text-input"
                />
              </div>
            )}

            {/* Opacity */}
            <div className="cms-section-editor-group">
              <label>Opacity: {Math.round((currentOpacity || 1) * 100)}%</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={currentOpacity || 1}
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                className="cms-range-input"
              />
              <div className="cms-preset-buttons">
                <button onClick={() => setOpacity(0.25)} type="button">25%</button>
                <button onClick={() => setOpacity(0.5)} type="button">50%</button>
                <button onClick={() => setOpacity(0.75)} type="button">75%</button>
                <button onClick={() => setOpacity(1)} type="button">100%</button>
              </div>
            </div>

            {/* Text Alignment */}
            <div className="cms-section-editor-group">
              <label>Text Alignment</label>
              <div className="cms-button-group">
                <button
                  className={`cms-icon-button ${currentTextAlign === 'left' ? 'active' : ''}`}
                  onClick={() => setTextAlign('left')}
                  title="Align Left"
                  type="button"
                >
                  <FaAlignLeft />
                </button>
                <button
                  className={`cms-icon-button ${currentTextAlign === 'center' ? 'active' : ''}`}
                  onClick={() => setTextAlign('center')}
                  title="Align Center"
                  type="button"
                >
                  <FaAlignCenter />
                </button>
                <button
                  className={`cms-icon-button ${currentTextAlign === 'right' ? 'active' : ''}`}
                  onClick={() => setTextAlign('right')}
                  title="Align Right"
                  type="button"
                >
                  <FaAlignRight />
                </button>
                <button
                  className={`cms-icon-button ${currentTextAlign === 'justify' ? 'active' : ''}`}
                  onClick={() => setTextAlign('justify')}
                  title="Justify"
                  type="button"
                >
                  <FaAlignJustify />
                </button>
              </div>
            </div>

            {/* Layout Type */}
            <div className="cms-section-editor-group">
              <label>Layout Type</label>
              <div className="cms-button-group">
                <button
                  className={`cms-layout-button ${currentLayout === 'block' ? 'active' : ''}`}
                  onClick={() => setLayoutType('block')}
                  type="button"
                >
                  Block
                </button>
                <button
                  className={`cms-layout-button ${currentLayout === 'flex' ? 'active' : ''}`}
                  onClick={() => setLayoutType('flex')}
                  type="button"
                >
                  Flex
                </button>
                <button
                  className={`cms-layout-button ${currentLayout === 'grid' ? 'active' : ''}`}
                  onClick={() => setLayoutType('grid')}
                  type="button"
                >
                  Grid
                </button>
              </div>
            </div>

            {/* Flex Controls */}
            {currentLayout === 'flex' && (
              <>
                <div className="cms-section-editor-group">
                  <label>Flex Direction</label>
                  <select
                    value={currentFlexDirection}
                    onChange={(e) => setFlexDirection(e.target.value)}
                    className="cms-select"
                  >
                    <option value="row">Row</option>
                    <option value="column">Column</option>
                    <option value="row-reverse">Row Reverse</option>
                    <option value="column-reverse">Column Reverse</option>
                  </select>
                </div>

                <div className="cms-section-editor-group">
                  <label>Flex Wrap</label>
                  <select
                    value={currentFlexWrap}
                    onChange={(e) => setFlexWrap(e.target.value)}
                    className="cms-select"
                  >
                    <option value="nowrap">No Wrap</option>
                    <option value="wrap">Wrap</option>
                    <option value="wrap-reverse">Wrap Reverse</option>
                  </select>
                </div>

                <div className="cms-section-editor-group">
                  <label>Align Items</label>
                  <select
                    value={currentAlignItems}
                    onChange={(e) => setAlignItems(e.target.value)}
                    className="cms-select"
                  >
                    <option value="flex-start">Start</option>
                    <option value="center">Center</option>
                    <option value="flex-end">End</option>
                    <option value="stretch">Stretch</option>
                  </select>
                </div>

                <div className="cms-section-editor-group">
                  <label>Justify Content</label>
                  <select
                    value={currentJustifyContent}
                    onChange={(e) => setJustifyContent(e.target.value)}
                    className="cms-select"
                  >
                    <option value="flex-start">Start</option>
                    <option value="center">Center</option>
                    <option value="flex-end">End</option>
                    <option value="space-between">Space Between</option>
                    <option value="space-around">Space Around</option>
                    <option value="space-evenly">Space Evenly</option>
                  </select>
                </div>
              </>
            )}

            {/* Grid Controls */}
            {currentLayout === 'grid' && (
              <>
                <div className="cms-section-editor-group">
                  <label>Grid Columns</label>
                  <input
                    type="text"
                    value={currentGridColumns}
                    onChange={(e) => setGridColumns(e.target.value)}
                    placeholder="repeat(3, 1fr)"
                    className="cms-text-input"
                  />
                  <div className="cms-preset-buttons">
                    <button onClick={() => setGridColumns('1fr')} type="button">1 Col</button>
                    <button onClick={() => setGridColumns('repeat(2, 1fr)')} type="button">2 Cols</button>
                    <button onClick={() => setGridColumns('repeat(3, 1fr)')} type="button">3 Cols</button>
                    <button onClick={() => setGridColumns('repeat(4, 1fr)')} type="button">4 Cols</button>
                  </div>
                </div>

                <div className="cms-section-editor-group">
                  <label>Grid Rows</label>
                  <input
                    type="text"
                    value={currentGridRows}
                    onChange={(e) => setGridRows(e.target.value)}
                    placeholder="auto"
                    className="cms-text-input"
                  />
                </div>
              </>
            )}

            {/* Gap */}
            {(currentLayout === 'flex' || currentLayout === 'grid') && (
              <div className="cms-section-editor-group">
                <label>Gap: {currentGap}</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={parseInt(currentGap) || 0}
                  onChange={(e) => setGap(`${e.target.value}px`)}
                  className="cms-range-input"
                />
                <div className="cms-preset-buttons">
                  <button onClick={() => setGap('0px')} type="button">0</button>
                  <button onClick={() => setGap('8px')} type="button">8</button>
                  <button onClick={() => setGap('16px')} type="button">16</button>
                  <button onClick={() => setGap('24px')} type="button">24</button>
                  <button onClick={() => setGap('32px')} type="button">32</button>
                </div>
              </div>
            )}

            {/* Padding */}
            <div className="cms-section-editor-group">
              <label>Padding</label>
              <input
                type="text"
                value={currentPadding}
                onChange={(e) => setPadding(e.target.value)}
                placeholder="40px"
                className="cms-text-input"
              />
              <div className="cms-preset-buttons">
                <button onClick={() => setPadding('0px')} type="button">0</button>
                <button onClick={() => setPadding('20px')} type="button">20</button>
                <button onClick={() => setPadding('40px')} type="button">40</button>
                <button onClick={() => setPadding('60px')} type="button">60</button>
                <button onClick={() => setPadding('80px')} type="button">80</button>
              </div>
            </div>

            {/* Margin */}
            <div className="cms-section-editor-group">
              <label>Margin</label>
              <input
                type="text"
                value={currentMargin}
                onChange={(e) => setMargin(e.target.value)}
                placeholder="0px"
                className="cms-text-input"
              />
              <div className="cms-preset-buttons">
                <button onClick={() => setMargin('0px')} type="button">0</button>
                <button onClick={() => setMargin('20px 0')} type="button">20 V</button>
                <button onClick={() => setMargin('40px 0')} type="button">40 V</button>
                <button onClick={() => setMargin('0 auto')} type="button">Center</button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
