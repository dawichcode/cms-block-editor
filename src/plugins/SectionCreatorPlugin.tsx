import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useState, useCallback, useRef, useEffect } from "react";
import { $getSelection, $isRangeSelection, $createParagraphNode } from "lexical";
import { $createSectionNode } from "../blocks/SectionNode";
import { SECTION_TEMPLATES, SectionTemplate } from "../utils/sectionTemplates";
import { $generateNodesFromDOM } from "@lexical/html";
import { MdViewModule } from "react-icons/md";

export default function SectionCreatorPlugin() {
  const [editor] = useLexicalComposerContext();
  const [showSectionMenu, setShowSectionMenu] = useState(false);
  const [sectionPosition, setSectionPosition] = useState({ top: 0, left: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sectionRef.current && !sectionRef.current.contains(event.target as Node)) {
        setShowSectionMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSectionMenu = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (!showSectionMenu) {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      setSectionPosition({
        top: rect.bottom + 8,
        left: rect.left
      });
    }
    setShowSectionMenu(!showSectionMenu);
  }, [showSectionMenu]);

  const insertSection = useCallback((template: SectionTemplate) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        // Create section node
        const sectionNode = $createSectionNode(
          template.type,
          template.backgroundColor,
          template.padding
        );

        // Parse HTML content
        const parser = new DOMParser();
        const dom = parser.parseFromString(template.content, 'text/html');
        const nodes = $generateNodesFromDOM(editor, dom);

        // Add content to section
        nodes.forEach(node => {
          sectionNode.append(node);
        });

        // Insert section
        selection.insertNodes([sectionNode]);

        // Add spacing after section
        const paragraph = $createParagraphNode();
        sectionNode.insertAfter(paragraph);
        paragraph.select();
      }
    });

    setShowSectionMenu(false);
  }, [editor]);

  return (
    <div className="cms-section-creator-plugin" ref={sectionRef}>
      <button
        className="cms-toolbar-button"
        onClick={toggleSectionMenu}
        title="Insert Section"
        type="button"
      >
        <MdViewModule size={18} />
      </button>

      {showSectionMenu && (
        <div 
          className="cms-section-menu"
          style={{
            top: `${sectionPosition.top}px`,
            left: `${sectionPosition.left}px`
          }}
        >
          <div className="cms-section-menu-header">
            <span>Insert Section</span>
          </div>

          <div className="cms-section-grid">
            {SECTION_TEMPLATES.map((template) => (
              <button
                key={template.type}
                className="cms-section-card"
                onClick={() => insertSection(template)}
                type="button"
              >
                <div className="cms-section-card-icon">{template.icon}</div>
                <div className="cms-section-card-content">
                  <div className="cms-section-card-title">{template.name}</div>
                  <div className="cms-section-card-desc">{template.description}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="cms-section-menu-footer">
            <p>💡 Tip: Sections are fully editable after insertion</p>
          </div>
        </div>
      )}
    </div>
  );
}
