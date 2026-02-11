import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { 
  $getSelection, 
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  $createParagraphNode
} from "lexical";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import { 
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND
} from "@lexical/list";
import { $createCodeNode, $isCodeNode } from "@lexical/code";
import { ImageNode } from "../blocks/ImageNode";
import { $createColumnsNode, $createColumnNode, LayoutType } from "../blocks/ColumnsNode";
import ColorPickerPlugin from "./ColorPickerPlugin";
import SpacingPlugin from "./SpacingPlugin";
import ExportImportPlugin from "./ExportImportPlugin";
import SectionCreatorPlugin from "./SectionCreatorPlugin";
import TablePlugin from "./TablePlugin";
import { useState, useCallback, useEffect } from "react";
import { 
  MdUndo, 
  MdRedo, 
  MdFormatBold, 
  MdFormatItalic, 
  MdFormatUnderlined,
  MdFormatStrikethrough,
  MdCode,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdFormatAlignJustify,
  MdFormatQuote,
  MdLink,
  MdImage,
  MdViewColumn
} from "react-icons/md";
import { 
  BiParagraph,
  BiCodeBlock
} from "react-icons/bi";
import { 
  LuHeading1,
  LuHeading2,
  LuHeading3
} from "react-icons/lu";

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [blockType, setBlockType] = useState('paragraph');
  const [showLayoutMenu, setShowLayoutMenu] = useState(false);
  const [layoutMenuPosition, setLayoutMenuPosition] = useState({ top: 0, left: 0 });

  // Update toolbar state based on selection
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          setIsBold(selection.hasFormat('bold'));
          setIsItalic(selection.hasFormat('italic'));
          setIsUnderline(selection.hasFormat('underline'));
          setIsStrikethrough(selection.hasFormat('strikethrough'));
          setIsCode(selection.hasFormat('code'));
        }
      });
    });
  }, [editor]);

  const handleImageUpload = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = false;
    
    input.onchange = (e: any) => {
      const file = e.target?.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const url = event.target?.result as string;
          const alt = file.name.replace(/\.[^/.]+$/, "");
          
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              const imageNode = new ImageNode(url, alt);
              selection.insertNodes([imageNode]);
            }
          });
        };
        reader.readAsDataURL(file);
      }
    };
    
    input.click();
  }, [editor]);

  const formatHeading = useCallback((level: 'h1' | 'h2' | 'h3') => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(level));
      }
    });
    setBlockType(level);
  }, [editor]);

  const formatParagraph = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
    setBlockType('paragraph');
  }, [editor]);

  const formatQuote = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createQuoteNode());
      }
    });
    setBlockType('quote');
  }, [editor]);

  const formatCode = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createCodeNode());
      }
    });
    setBlockType('code');
  }, [editor]);

  const formatBold = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
  }, [editor]);

  const formatItalic = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
  }, [editor]);

  const formatUnderline = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
  }, [editor]);

  const formatStrikethrough = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
  }, [editor]);

  const formatInlineCode = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
  }, [editor]);

  const formatBulletList = useCallback(() => {
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  }, [editor]);

  const formatNumberedList = useCallback(() => {
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
  }, [editor]);

  const formatAlignLeft = useCallback(() => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
  }, [editor]);

  const formatAlignCenter = useCallback(() => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
  }, [editor]);

  const formatAlignRight = useCallback(() => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
  }, [editor]);

  const formatAlignJustify = useCallback(() => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
  }, [editor]);

  const insertLink = useCallback(() => {
    if ((window as any).__insertLink) {
      (window as any).__insertLink();
    }
  }, []);

  const insertLayout = useCallback((layoutType: LayoutType) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const columnsNode = $createColumnsNode(layoutType);
        
        // Determine number of columns based on layout type
        let columnCount = 2;
        if (layoutType === '3-column') columnCount = 3;
        else if (layoutType === '4-column') columnCount = 4;
        else if (layoutType === 'grid-2x2') columnCount = 4;
        else if (layoutType === 'grid-3x3') columnCount = 9;

        // Create columns with paragraph nodes
        for (let i = 0; i < columnCount; i++) {
          const columnNode = $createColumnNode();
          const paragraphNode = $createParagraphNode();
          columnNode.append(paragraphNode);
          columnsNode.append(columnNode);
        }

        selection.insertNodes([columnsNode]);
      }
    });
    setShowLayoutMenu(false);
  }, [editor]);

  const toggleLayoutMenu = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (!showLayoutMenu) {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      setLayoutMenuPosition({
        top: rect.bottom + 8,
        left: rect.left
      });
    }
    setShowLayoutMenu(!showLayoutMenu);
  }, [showLayoutMenu]);

  const handleUndo = useCallback(() => {
    editor.dispatchCommand(UNDO_COMMAND, undefined);
  }, [editor]);

  const handleRedo = useCallback(() => {
    editor.dispatchCommand(REDO_COMMAND, undefined);
  }, [editor]);

  return (
    <div className="cms-toolbar">
      {/* Undo/Redo */}
      <button 
        className="cms-toolbar-button"
        onClick={handleUndo}
        title="Undo (Cmd+Z)"
        type="button"
      >
        <MdUndo size={18} />
      </button>
      <button 
        className="cms-toolbar-button"
        onClick={handleRedo}
        title="Redo (Cmd+Shift+Z)"
        type="button"
      >
        <MdRedo size={18} />
      </button>

      <div className="cms-toolbar-divider" />

      {/* Block Type */}
      <button 
        className={`cms-toolbar-button ${blockType === 'paragraph' ? 'active' : ''}`}
        onClick={formatParagraph}
        title="Paragraph"
        type="button"
      >
        <BiParagraph size={18} />
      </button>
      <button 
        className={`cms-toolbar-button ${blockType === 'h1' ? 'active' : ''}`}
        onClick={() => formatHeading('h1')}
        title="Heading 1"
        type="button"
      >
        <LuHeading1 size={18} />
      </button>
      <button 
        className={`cms-toolbar-button ${blockType === 'h2' ? 'active' : ''}`}
        onClick={() => formatHeading('h2')}
        title="Heading 2"
        type="button"
      >
        <LuHeading2 size={18} />
      </button>
      <button 
        className={`cms-toolbar-button ${blockType === 'h3' ? 'active' : ''}`}
        onClick={() => formatHeading('h3')}
        title="Heading 3"
        type="button"
      >
        <LuHeading3 size={18} />
      </button>

      <div className="cms-toolbar-divider" />

      {/* Text Formatting */}
      <button 
        className={`cms-toolbar-button ${isBold ? 'active' : ''}`}
        onClick={formatBold}
        title="Bold (Cmd+B)"
        type="button"
      >
        <MdFormatBold size={18} />
      </button>
      <button 
        className={`cms-toolbar-button ${isItalic ? 'active' : ''}`}
        onClick={formatItalic}
        title="Italic (Cmd+I)"
        type="button"
      >
        <MdFormatItalic size={18} />
      </button>
      <button 
        className={`cms-toolbar-button ${isUnderline ? 'active' : ''}`}
        onClick={formatUnderline}
        title="Underline (Cmd+U)"
        type="button"
      >
        <MdFormatUnderlined size={18} />
      </button>
      <button 
        className={`cms-toolbar-button ${isStrikethrough ? 'active' : ''}`}
        onClick={formatStrikethrough}
        title="Strikethrough"
        type="button"
      >
        <MdFormatStrikethrough size={18} />
      </button>
      <button 
        className={`cms-toolbar-button ${isCode ? 'active' : ''}`}
        onClick={formatInlineCode}
        title="Inline Code"
        type="button"
      >
        <MdCode size={18} />
      </button>

      {/* Color Pickers */}
      <ColorPickerPlugin />

      {/* Spacing Controls */}
      <SpacingPlugin />

      <div className="cms-toolbar-divider" />

      {/* Lists */}
      <button 
        className="cms-toolbar-button"
        onClick={formatBulletList}
        title="Bullet List"
        type="button"
      >
        <MdFormatListBulleted size={18} />
      </button>
      <button 
        className="cms-toolbar-button"
        onClick={formatNumberedList}
        title="Numbered List"
        type="button"
      >
        <MdFormatListNumbered size={18} />
      </button>

      <div className="cms-toolbar-divider" />

      {/* Alignment */}
      <button 
        className="cms-toolbar-button"
        onClick={formatAlignLeft}
        title="Align Left"
        type="button"
      >
        <MdFormatAlignLeft size={18} />
      </button>
      <button 
        className="cms-toolbar-button"
        onClick={formatAlignCenter}
        title="Align Center"
        type="button"
      >
        <MdFormatAlignCenter size={18} />
      </button>
      <button 
        className="cms-toolbar-button"
        onClick={formatAlignRight}
        title="Align Right"
        type="button"
      >
        <MdFormatAlignRight size={18} />
      </button>
      <button 
        className="cms-toolbar-button"
        onClick={formatAlignJustify}
        title="Justify"
        type="button"
      >
        <MdFormatAlignJustify size={18} />
      </button>

      <div className="cms-toolbar-divider" />

      {/* Special Blocks */}
      <button 
        className={`cms-toolbar-button ${blockType === 'quote' ? 'active' : ''}`}
        onClick={formatQuote}
        title="Quote"
        type="button"
      >
        <MdFormatQuote size={18} />
      </button>
      <button 
        className={`cms-toolbar-button ${blockType === 'code' ? 'active' : ''}`}
        onClick={formatCode}
        title="Code Block"
        type="button"
      >
        <BiCodeBlock size={18} />
      </button>

      <div className="cms-toolbar-divider" />

      {/* Insert */}
      <button 
        className="cms-toolbar-button"
        onClick={insertLink}
        title="Insert Link"
        type="button"
      >
        <MdLink size={18} />
      </button>
      <button 
        className="cms-toolbar-button"
        onClick={handleImageUpload}
        title="Upload Image"
        type="button"
      >
        <MdImage size={18} />
      </button>

      <div className="cms-toolbar-divider" />

      {/* Export/Import */}
      <ExportImportPlugin />

      {/* Section Creator */}
      <SectionCreatorPlugin />

      {/* Table */}
      <TablePlugin />

      <div className="cms-toolbar-divider" />

      {/* Layout */}
      <div className="cms-layout-plugin">
        <button
          className="cms-toolbar-button"
          onClick={toggleLayoutMenu}
          title="Insert Layout"
          type="button"
        >
          <MdViewColumn size={18} />
        </button>

        {showLayoutMenu && (
          <div 
            className="cms-layout-menu"
            style={{
              top: `${layoutMenuPosition.top}px`,
              left: `${layoutMenuPosition.left}px`
            }}
          >
            <div className="cms-layout-menu-title">Choose Layout</div>
            
            <div className="cms-layout-menu-section">
              <div className="cms-layout-menu-subtitle">Columns (Flex)</div>
              <button
                className="cms-layout-menu-item"
                onClick={() => insertLayout('2-column')}
                type="button"
              >
                <div className="cms-layout-preview cms-layout-preview-2col">
                  <div className="cms-layout-preview-col"></div>
                  <div className="cms-layout-preview-col"></div>
                </div>
                <span>2 Columns</span>
              </button>

              <button
                className="cms-layout-menu-item"
                onClick={() => insertLayout('3-column')}
                type="button"
              >
                <div className="cms-layout-preview cms-layout-preview-3col">
                  <div className="cms-layout-preview-col"></div>
                  <div className="cms-layout-preview-col"></div>
                  <div className="cms-layout-preview-col"></div>
                </div>
                <span>3 Columns</span>
              </button>

              <button
                className="cms-layout-menu-item"
                onClick={() => insertLayout('4-column')}
                type="button"
              >
                <div className="cms-layout-preview cms-layout-preview-4col">
                  <div className="cms-layout-preview-col"></div>
                  <div className="cms-layout-preview-col"></div>
                  <div className="cms-layout-preview-col"></div>
                  <div className="cms-layout-preview-col"></div>
                </div>
                <span>4 Columns</span>
              </button>
            </div>

            <div className="cms-layout-menu-section">
              <div className="cms-layout-menu-subtitle">Grid</div>
              <button
                className="cms-layout-menu-item"
                onClick={() => insertLayout('grid-2x2')}
                type="button"
              >
                <div className="cms-layout-preview cms-layout-preview-grid-2x2">
                  <div className="cms-layout-preview-col"></div>
                  <div className="cms-layout-preview-col"></div>
                  <div className="cms-layout-preview-col"></div>
                  <div className="cms-layout-preview-col"></div>
                </div>
                <span>2×2 Grid</span>
              </button>

              <button
                className="cms-layout-menu-item"
                onClick={() => insertLayout('grid-3x3')}
                type="button"
              >
                <div className="cms-layout-preview cms-layout-preview-grid-3x3">
                  <div className="cms-layout-preview-col"></div>
                  <div className="cms-layout-preview-col"></div>
                  <div className="cms-layout-preview-col"></div>
                  <div className="cms-layout-preview-col"></div>
                  <div className="cms-layout-preview-col"></div>
                  <div className="cms-layout-preview-col"></div>
                  <div className="cms-layout-preview-col"></div>
                  <div className="cms-layout-preview-col"></div>
                  <div className="cms-layout-preview-col"></div>
                </div>
                <span>3×3 Grid</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
