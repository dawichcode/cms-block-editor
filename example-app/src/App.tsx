import { useState } from 'react';
import { 
  CMSBlockEditor, 
  CMSRenderer, 
  ThemeProvider, 
  ThemeSwitcher,
  useTheme 
} from 'cms-block-editor';

function EditorDemo() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'basic' | 'themes' | 'media' | 'persistence' | 'renderer'>('basic');
  const [content, setContent] = useState<string | undefined>(undefined);
  const [themesContent, setThemesContent] = useState<string | undefined>(undefined);
  const [mediaContent, setMediaContent] = useState<string | undefined>(undefined);
  const [persistedContent, setPersistedContent] = useState<string | undefined>(() => {
    const saved = localStorage.getItem('cms-content');
    return saved || undefined;
  });
  const [rendererContent, setRendererContent] = useState<string | undefined>(undefined);
  const [showPreview, setShowPreview] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handlePersistenceChange = (editorState: any) => {
    const serialized = JSON.stringify(editorState);
    setPersistedContent(serialized);
    
    setTimeout(() => {
      localStorage.setItem('cms-content', serialized);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }, 1000);
  };

  const handleClear = () => {
    localStorage.removeItem('cms-content');
    setPersistedContent(undefined);
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    console.log('Image uploaded:', file.name, file.size);
    // For demo: return a placeholder URL
    return `https://via.placeholder.com/800x400?text=${encodeURIComponent(file.name)}`;
  };

  const handleVideoUpload = async (file: File): Promise<string> => {
    console.log('Video uploaded:', file.name, file.size);
    // For demo: use object URL (not recommended for production)
    return URL.createObjectURL(file);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div>
            <h1>🎨 CMS Block Editor Demo</h1>
            <p>Explore all features with live examples</p>
          </div>
          <div className="header-actions">
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      <div className="tabs">
        <button 
          className={activeTab === 'basic' ? 'active' : ''}
          onClick={() => setActiveTab('basic')}
        >
          📝 Basic
        </button>
        <button 
          className={activeTab === 'themes' ? 'active' : ''}
          onClick={() => setActiveTab('themes')}
        >
          🎨 Themes
        </button>
        <button 
          className={activeTab === 'media' ? 'active' : ''}
          onClick={() => setActiveTab('media')}
        >
          🖼️ Media
        </button>
        <button 
          className={activeTab === 'persistence' ? 'active' : ''}
          onClick={() => setActiveTab('persistence')}
        >
          💾 Persistence
        </button>
        <button 
          className={activeTab === 'renderer' ? 'active' : ''}
          onClick={() => setActiveTab('renderer')}
        >
          👁️ Renderer
        </button>
      </div>

      <div className="content">
        {activeTab === 'basic' && (
          <div className="example-section">
            <div className="example-header">
              <h2>Basic Example</h2>
              <p>Simple editor with minimal setup. Type <code>/</code> to see available commands.</p>
            </div>
            <CMSBlockEditor 
              value={content}
              onChange={(editorState: any) => {
                setContent(JSON.stringify(editorState));
              }}
              onImageAdded={handleImageUpload}
              onVideoAdded={handleVideoUpload}
              useBase64Url={false}
            />
            <div className="info-box">
              <strong>Features:</strong> Rich text, headings, lists, links, images, videos, tables, sections
              <br />
              <strong>Content length:</strong> {content?.length || 0} characters
            </div>
          </div>
        )}

        {activeTab === 'themes' && (
          <div className="example-section">
            <div className="example-header">
              <h2>Theme System Demo</h2>
              <p>
                Current theme: <strong>{theme.name}</strong>
                <br />
                Try switching themes using the theme switcher in the header!
              </p>
            </div>
            <CMSBlockEditor 
              value={themesContent}
              onChange={(editorState: any) => {
                setThemesContent(JSON.stringify(editorState));
              }}
              onImageAdded={handleImageUpload}
              onVideoAdded={handleVideoUpload}
            />
            <div className="info-box">
              <strong>Available Themes:</strong>
              <ul>
                <li><strong>Light Themes:</strong> Light, Ocean, Forest, Sunset, Rose, Minimal</li>
                <li><strong>Dark Themes:</strong> Dark, Midnight, Dracula, Monokai</li>
              </ul>
              <strong>Modes:</strong> Light, Dark, Auto (follows system preference)
            </div>
          </div>
        )}

        {activeTab === 'media' && (
          <div className="example-section">
            <div className="example-header">
              <h2>Media Upload Demo</h2>
              <p>Upload images and videos with advanced features</p>
            </div>
            <CMSBlockEditor 
              value={mediaContent}
              onChange={(editorState: any) => {
                setMediaContent(JSON.stringify(editorState));
              }}
              onImageAdded={handleImageUpload}
              onVideoAdded={handleVideoUpload}
              useBase64Url={false}
            />
            <div className="info-box">
              <strong>Image Features:</strong>
              <ul>
                <li>Drag & drop upload</li>
                <li>Resize with handles</li>
                <li>Advanced editing (filters, brightness, contrast, etc.)</li>
                <li>Click image → Edit button to access filters</li>
              </ul>
              <strong>Video Features:</strong>
              <ul>
                <li>Drag & drop upload</li>
                <li>Playback controls (autoplay, loop, mute)</li>
                <li>Resize support</li>
                <li>MP4, WebM, OGG formats</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'persistence' && (
          <div className="example-section">
            <div className="example-header">
              <h2>Persistence Demo</h2>
              <p>Content is automatically saved to localStorage. Refresh the page to see it persist!</p>
              <div className="actions">
                {isSaved && <span className="saved-indicator">✓ Saved</span>}
                <button onClick={handleClear} className="clear-btn">Clear Content</button>
              </div>
            </div>
            <CMSBlockEditor 
              value={persistedContent}
              onChange={handlePersistenceChange}
              onImageAdded={handleImageUpload}
              onVideoAdded={handleVideoUpload}
            />
            <div className="info-box">
              <strong>Tip:</strong> Your content is saved automatically after 1 second of inactivity.
              <br />
              Try refreshing the page to see your content persist!
            </div>
          </div>
        )}

        {activeTab === 'renderer' && (
          <div className="example-section">
            <div className="example-header">
              <h2>Renderer Demo</h2>
              <p>Edit content and see it rendered in read-only mode.</p>
              <div className="actions">
                <button 
                  onClick={() => setShowPreview(!showPreview)} 
                  className="preview-btn"
                >
                  {showPreview ? '✏️ Edit' : '👁️ Preview'}
                </button>
              </div>
            </div>
            
            {!showPreview ? (
              <>
                <CMSBlockEditor 
                  value={rendererContent}
                  onChange={(editorState: any) => {
                    setRendererContent(JSON.stringify(editorState));
                  }}
                  onImageAdded={handleImageUpload}
                  onVideoAdded={handleVideoUpload}
                />
                <div className="info-box">
                  <strong>Tip:</strong> Click "Preview" to see how your content will be rendered.
                </div>
              </>
            ) : (
              <>
                {rendererContent ? (
                  <CMSRenderer content={rendererContent} className="demo-renderer" />
                ) : (
                  <p className="empty-state">No content to preview. Switch to edit mode and add some content!</p>
                )}
              </>
            )}
          </div>
        )}
      </div>

      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-info">
            <h3>CMS Block Editor</h3>
            <p>A powerful, feature-rich block editor built with Lexical and React</p>
          </div>
          <div className="footer-features">
            <h4>Features</h4>
            <ul>
              <li>✨ Rich text editing</li>
              <li>🎨 10 preset themes</li>
              <li>🖼️ Image editing with filters</li>
              <li>🎬 Video upload support</li>
              <li>📊 Tables & sections</li>
              <li>💾 Export/Import</li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Resources</h4>
            <ul>
              <li><a href="https://github.com/yourusername/cms-block-editor" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://www.npmjs.com/package/cms-block-editor" target="_blank" rel="noopener noreferrer">NPM</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Documentation coming soon!'); }}>Documentation</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Built with Lexical • Try typing <code>/</code> for commands</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" defaultMode="auto">
      <EditorDemo />
    </ThemeProvider>
  );
}

export default App;
