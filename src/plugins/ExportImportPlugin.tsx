import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useState, useCallback, useRef, useEffect } from "react";
import { MdFileDownload, MdFileUpload } from "react-icons/md";
import { exportToHTML, downloadHTML } from "../utils/htmlExport";
import { exportToMarkdown, downloadMarkdown, copyMarkdownToClipboard } from "../utils/markdownExport";
import { importFromHTML, loadHTMLFromFile } from "../utils/htmlImport";
import { importFromMarkdown, loadMarkdownFromFile } from "../utils/markdownImport";

export default function ExportImportPlugin() {
  const [editor] = useLexicalComposerContext();
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showImportMenu, setShowImportMenu] = useState(false);
  const [exportPosition, setExportPosition] = useState({ top: 0, left: 0 });
  const [importPosition, setImportPosition] = useState({ top: 0, left: 0 });
  const [notification, setNotification] = useState<string | null>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  const importRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importType, setImportType] = useState<'html' | 'markdown'>('html');

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportRef.current && !exportRef.current.contains(event.target as Node)) {
        setShowExportMenu(false);
      }
      if (importRef.current && !importRef.current.contains(event.target as Node)) {
        setShowImportMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-hide notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (message: string) => {
    setNotification(message);
  };

  const toggleExportMenu = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (!showExportMenu) {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      setExportPosition({
        top: rect.bottom + 8,
        left: rect.left
      });
    }
    setShowExportMenu(!showExportMenu);
    setShowImportMenu(false);
  }, [showExportMenu]);

  const toggleImportMenu = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (!showImportMenu) {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      setImportPosition({
        top: rect.bottom + 8,
        left: rect.left
      });
    }
    setShowImportMenu(!showImportMenu);
    setShowExportMenu(false);
  }, [showImportMenu]);

  // Export handlers
  const handleExportHTML = useCallback(() => {
    downloadHTML(editor, 'content.html', { includeStyles: false });
    setShowExportMenu(false);
    showNotification('HTML exported successfully!');
  }, [editor]);

  const handleExportHTMLWithStyles = useCallback(() => {
    downloadHTML(editor, 'content.html', { includeStyles: true });
    setShowExportMenu(false);
    showNotification('HTML with styles exported!');
  }, [editor]);

  const handleExportMarkdown = useCallback(() => {
    downloadMarkdown(editor, 'content.md');
    setShowExportMenu(false);
    showNotification('Markdown exported successfully!');
  }, [editor]);

  const handleCopyHTML = useCallback(async () => {
    const html = exportToHTML(editor);
    try {
      await navigator.clipboard.writeText(html);
      setShowExportMenu(false);
      showNotification('HTML copied to clipboard!');
    } catch (error) {
      showNotification('Failed to copy HTML');
    }
  }, [editor]);

  const handleCopyMarkdown = useCallback(async () => {
    const success = await copyMarkdownToClipboard(editor);
    setShowExportMenu(false);
    showNotification(success ? 'Markdown copied to clipboard!' : 'Failed to copy Markdown');
  }, [editor]);

  // Import handlers
  const handleImportFile = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (importType === 'html') {
      loadHTMLFromFile(
        editor,
        file,
        () => {
          setShowImportMenu(false);
          showNotification('HTML imported successfully!');
        },
        (error) => {
          showNotification(`Import failed: ${error.message}`);
        }
      );
    } else {
      loadMarkdownFromFile(
        editor,
        file,
        () => {
          setShowImportMenu(false);
          showNotification('Markdown imported successfully!');
        },
        (error) => {
          showNotification(`Import failed: ${error.message}`);
        }
      );
    }

    // Reset file input
    event.target.value = '';
  }, [editor, importType]);

  const handlePasteHTML = useCallback(async () => {
    try {
      const html = await navigator.clipboard.readText();
      importFromHTML(editor, html);
      setShowImportMenu(false);
      showNotification('HTML pasted successfully!');
    } catch (error) {
      showNotification('Failed to paste HTML');
    }
  }, [editor]);

  const handlePasteMarkdown = useCallback(async () => {
    try {
      const markdown = await navigator.clipboard.readText();
      importFromMarkdown(editor, markdown);
      setShowImportMenu(false);
      showNotification('Markdown pasted successfully!');
    } catch (error) {
      showNotification('Failed to paste Markdown');
    }
  }, [editor]);

  return (
    <>
      {/* Export Button */}
      <div className="cms-export-import-plugin" ref={exportRef}>
        <button
          className="cms-toolbar-button"
          onClick={toggleExportMenu}
          title="Export Content"
          type="button"
        >
          <MdFileDownload size={18} />
        </button>

        {showExportMenu && (
          <div 
            className="cms-export-import-menu"
            style={{
              top: `${exportPosition.top}px`,
              left: `${exportPosition.left}px`
            }}
          >
            <div className="cms-export-import-header">Export Content</div>
            
            <button
              className="cms-export-import-item"
              onClick={handleExportHTML}
              type="button"
            >
              <span className="cms-export-import-icon">📄</span>
              <div>
                <div className="cms-export-import-title">HTML</div>
                <div className="cms-export-import-desc">Download as HTML file</div>
              </div>
            </button>

            <button
              className="cms-export-import-item"
              onClick={handleExportHTMLWithStyles}
              type="button"
            >
              <span className="cms-export-import-icon">🎨</span>
              <div>
                <div className="cms-export-import-title">HTML + Styles</div>
                <div className="cms-export-import-desc">Complete HTML document</div>
              </div>
            </button>

            <button
              className="cms-export-import-item"
              onClick={handleExportMarkdown}
              type="button"
            >
              <span className="cms-export-import-icon">📝</span>
              <div>
                <div className="cms-export-import-title">Markdown</div>
                <div className="cms-export-import-desc">Download as .md file</div>
              </div>
            </button>

            <div className="cms-export-import-divider" />

            <button
              className="cms-export-import-item"
              onClick={handleCopyHTML}
              type="button"
            >
              <span className="cms-export-import-icon">📋</span>
              <div>
                <div className="cms-export-import-title">Copy HTML</div>
                <div className="cms-export-import-desc">Copy to clipboard</div>
              </div>
            </button>

            <button
              className="cms-export-import-item"
              onClick={handleCopyMarkdown}
              type="button"
            >
              <span className="cms-export-import-icon">📋</span>
              <div>
                <div className="cms-export-import-title">Copy Markdown</div>
                <div className="cms-export-import-desc">Copy to clipboard</div>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Import Button */}
      <div className="cms-export-import-plugin" ref={importRef}>
        <button
          className="cms-toolbar-button"
          onClick={toggleImportMenu}
          title="Import Content"
          type="button"
        >
          <MdFileUpload size={18} />
        </button>

        {showImportMenu && (
          <div 
            className="cms-export-import-menu"
            style={{
              top: `${importPosition.top}px`,
              left: `${importPosition.left}px`
            }}
          >
            <div className="cms-export-import-header">Import Content</div>
            
            <div className="cms-import-type-selector">
              <button
                className={`cms-import-type-btn ${importType === 'html' ? 'active' : ''}`}
                onClick={() => setImportType('html')}
                type="button"
              >
                HTML
              </button>
              <button
                className={`cms-import-type-btn ${importType === 'markdown' ? 'active' : ''}`}
                onClick={() => setImportType('markdown')}
                type="button"
              >
                Markdown
              </button>
            </div>

            <button
              className="cms-export-import-item"
              onClick={handleImportFile}
              type="button"
            >
              <span className="cms-export-import-icon">📁</span>
              <div>
                <div className="cms-export-import-title">From File</div>
                <div className="cms-export-import-desc">Upload {importType.toUpperCase()} file</div>
              </div>
            </button>

            <button
              className="cms-export-import-item"
              onClick={importType === 'html' ? handlePasteHTML : handlePasteMarkdown}
              type="button"
            >
              <span className="cms-export-import-icon">📋</span>
              <div>
                <div className="cms-export-import-title">From Clipboard</div>
                <div className="cms-export-import-desc">Paste {importType.toUpperCase()}</div>
              </div>
            </button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={importType === 'html' ? '.html,.htm' : '.md,.markdown'}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>

      {/* Notification */}
      {notification && (
        <div className="cms-export-import-notification">
          {notification}
        </div>
      )}
    </>
  );
}
