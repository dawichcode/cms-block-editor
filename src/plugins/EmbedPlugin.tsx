import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useState, useCallback, useRef, useEffect } from "react";
import { $getSelection, $isRangeSelection, $createParagraphNode } from "lexical";
import { $createEmbedNode } from "../blocks/EmbedNode";
import { MdVideoLibrary } from "react-icons/md";

export default function EmbedPlugin() {
  const [editor] = useLexicalComposerContext();
  const [showModal, setShowModal] = useState(false);
  const [embedUrl, setEmbedUrl] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openModal = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setShowModal(true);
    setEmbedUrl('');
  }, []);

  const insertEmbed = useCallback(() => {
    if (!embedUrl.trim()) return;

    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const embedNode = $createEmbedNode(embedUrl.trim());
        selection.insertNodes([embedNode]);
        
        // Add paragraph after embed
        const paragraph = $createParagraphNode();
        embedNode.insertAfter(paragraph);
        paragraph.select();
      }
    });

    setShowModal(false);
    setEmbedUrl('');
  }, [editor, embedUrl]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      insertEmbed();
    } else if (e.key === 'Escape') {
      setShowModal(false);
    }
  }, [insertEmbed]);

  return (
    <div className="cms-embed-plugin" ref={modalRef}>
      <button
        className="cms-toolbar-button"
        onClick={openModal}
        title="Insert Embed (YouTube, Facebook, Instagram, etc.)"
        type="button"
      >
        <MdVideoLibrary size={18} />
      </button>

      {showModal && (
        <>
          <div className="cms-modal-backdrop" onClick={() => setShowModal(false)} />
          <div className="cms-embed-modal">
            <div className="cms-embed-modal-header">
              <span>Insert Embed</span>
            </div>

          <div className="cms-embed-modal-content">
            <div className="cms-embed-info">
              <p>Paste a link from:</p>
              <div className="cms-embed-platforms">
                <span className="cms-embed-platform">YouTube</span>
                <span className="cms-embed-platform">Facebook</span>
                <span className="cms-embed-platform">Instagram</span>
                <span className="cms-embed-platform">Twitter/X</span>
                <span className="cms-embed-platform">TikTok</span>
                <span className="cms-embed-platform">Vimeo</span>
                <span className="cms-embed-platform">Spotify</span>
                <span className="cms-embed-platform">SoundCloud</span>
              </div>
            </div>

            <div className="cms-form-group">
              <label htmlFor="embed-url">URL</label>
              <input
                id="embed-url"
                type="url"
                value={embedUrl}
                onChange={(e) => setEmbedUrl(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="https://www.youtube.com/watch?v=..."
                className="cms-input"
                autoFocus
              />
            </div>

            <div className="cms-embed-examples">
              <p className="cms-embed-examples-title">Example URLs:</p>
              <ul className="cms-embed-examples-list">
                <li>https://www.youtube.com/watch?v=dQw4w9WgXcQ</li>
                <li>https://www.facebook.com/username/posts/123456</li>
                <li>https://www.instagram.com/p/ABC123/</li>
                <li>https://twitter.com/username/status/123456</li>
                <li>https://www.tiktok.com/@username/video/123456</li>
                <li>https://vimeo.com/123456789</li>
                <li>https://open.spotify.com/track/123456</li>
              </ul>
            </div>

            <div className="cms-modal-actions">
              <button
                onClick={() => setShowModal(false)}
                className="cms-button cms-button-secondary"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={insertEmbed}
                className="cms-button cms-button-primary"
                disabled={!embedUrl.trim()}
                type="button"
              >
                Insert Embed
              </button>
            </div>
          </div>
          </div>
        </>
      )}
    </div>
  );
}
