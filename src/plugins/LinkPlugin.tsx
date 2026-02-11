import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState, useCallback } from "react";
import { 
  $getSelection, 
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  KEY_ESCAPE_COMMAND,
  $createTextNode
} from "lexical";
import { $createLinkNode, $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";

export default function LinkPlugin() {
  const [editor] = useLexicalComposerContext();
  const [showModal, setShowModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [openInNewTab, setOpenInNewTab] = useState(false);

  // Listen for custom link command
  useEffect(() => {
    return editor.registerCommand(
      KEY_ESCAPE_COMMAND,
      () => {
        if (showModal) {
          setShowModal(false);
          return true;
        }
        return false;
      },
      COMMAND_PRIORITY_LOW
    );
  }, [editor, showModal]);

  const handleInsertLink = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const selectedText = selection.getTextContent();
        setLinkText(selectedText || '');
        setShowModal(true);
      }
    });
  }, [editor]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!linkUrl) return;

    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        // If there's selected text, wrap it in a link
        if (selection.getTextContent()) {
          editor.dispatchCommand(TOGGLE_LINK_COMMAND, {
            url: linkUrl,
            target: openInNewTab ? '_blank' : null,
            rel: openInNewTab ? 'noopener noreferrer' : null,
            title: linkTitle || null,
          });
        } else {
          // If no text selected, insert link with custom text
          const linkNode = $createLinkNode(linkUrl, {
            target: openInNewTab ? '_blank' : null,
            rel: openInNewTab ? 'noopener noreferrer' : null,
            title: linkTitle || null,
          });
          const textNode = $createTextNode(linkText || linkUrl);
          linkNode.append(textNode);
          selection.insertNodes([linkNode]);
        }
      }
    });

    // Reset and close
    setShowModal(false);
    setLinkUrl('');
    setLinkText('');
    setLinkTitle('');
    setOpenInNewTab(false);
  };

  const handleCancel = () => {
    setShowModal(false);
    setLinkUrl('');
    setLinkText('');
    setLinkTitle('');
    setOpenInNewTab(false);
  };

  // Expose function to toolbar
  useEffect(() => {
    (window as any).__insertLink = handleInsertLink;
    return () => {
      delete (window as any).__insertLink;
    };
  }, [handleInsertLink]);

  if (!showModal) return null;

  return (
    <div className="cms-link-modal-overlay" onClick={handleCancel}>
      <div className="cms-link-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cms-link-modal-header">
          <h3>Insert Link</h3>
          <button 
            className="cms-link-modal-close"
            onClick={handleCancel}
            type="button"
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="cms-link-modal-form">
          <div className="cms-link-modal-field">
            <label htmlFor="link-text">Link Text</label>
            <input
              id="link-text"
              type="text"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              placeholder="Enter link text (or leave empty to use selected text)"
              autoFocus
            />
          </div>

          <div className="cms-link-modal-field">
            <label htmlFor="link-url">URL *</label>
            <input
              id="link-url"
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              required
            />
          </div>

          <div className="cms-link-modal-field">
            <label htmlFor="link-title">Title (optional)</label>
            <input
              id="link-title"
              type="text"
              value={linkTitle}
              onChange={(e) => setLinkTitle(e.target.value)}
              placeholder="Link title for accessibility"
            />
          </div>

          <div className="cms-link-modal-field cms-link-modal-checkbox">
            <label>
              <input
                type="checkbox"
                checked={openInNewTab}
                onChange={(e) => setOpenInNewTab(e.target.checked)}
              />
              <span>Open in new tab</span>
            </label>
          </div>

          <div className="cms-link-modal-actions">
            <button 
              type="button" 
              onClick={handleCancel}
              className="cms-link-modal-button cms-link-modal-button-cancel"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="cms-link-modal-button cms-link-modal-button-submit"
              disabled={!linkUrl}
            >
              Insert Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
