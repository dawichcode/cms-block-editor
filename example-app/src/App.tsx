import { useState } from 'react';
import { CMSBlockEditor, CMSRenderer } from 'cms-block-editor';

function App() {
  const [activeTab, setActiveTab] = useState<'basic' | 'persistence' | 'styled' | 'renderer'>('basic');
  const [content, setContent] = useState<string | undefined>(undefined);
  const [persistedContent, setPersistedContent] = useState<string | undefined>(() => {
    const saved = localStorage.getItem('cms-content');
    return saved || undefined;
  });
  const [styledContent, setStyledContent] = useState<string | undefined>(undefined);
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

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎨 CMS Block Editor Demo</h1>
        <p>Explore different implementations of the block editor</p>
      </header>

      <div className="tabs">
        <button 
          className={activeTab === 'basic' ? 'active' : ''}
          onClick={() => setActiveTab('basic')}
        >
          Basic
        </button>
        <button 
          className={activeTab === 'persistence' ? 'active' : ''}
          onClick={() => setActiveTab('persistence')}
        >
          With Persistence
        </button>
        <button 
          className={activeTab === 'styled' ? 'active' : ''}
          onClick={() => setActiveTab('styled')}
        >
          Custom Styled
        </button>
        <button 
          className={activeTab === 'renderer' ? 'active' : ''}
          onClick={() => setActiveTab('renderer')}
        >
          Renderer Demo
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
              onChange={(editorState:any) => {
                const content=JSON.stringify(editorState);
                setContent(content);
                console.log(content);
              }}
              onImageAdded={async (file: File) => {
                // Example: Upload to your server
                // const formData = new FormData();
                // formData.append('image', file);
                // const response = await fetch('/api/upload', { method: 'POST', body: formData });
                // const data = await response.json();
                // return data.url;
                
                // For demo: return a placeholder URL
                console.log('Image uploaded:', file.name);
                return `https://via.placeholder.com/800x400?text=${encodeURIComponent(file.name)}`;
              }}
              useBase64Url={false}
            />
            <div className="info-box">
              <strong>Content length:</strong> {content?.length || 0} characters
            </div>
          </div>
        )}

        {activeTab === 'persistence' && (
          <div className="example-section">
            <div className="example-header">
              <h2>With Persistence</h2>
              <p>Content is automatically saved to localStorage. Refresh the page to see it persist!</p>
              <div className="actions">
                {isSaved && <span className="saved-indicator">✓ Saved</span>}
                <button onClick={handleClear} className="clear-btn">Clear Content</button>
              </div>
            </div>
            <CMSBlockEditor 
              value={persistedContent}
              onChange={handlePersistenceChange}
            />
            <div className="info-box">
              <strong>Tip:</strong> Your content is saved automatically after 1 second of inactivity.
            </div>
          </div>
        )}

        {activeTab === 'styled' && (
          <div className="example-section styled">
            <div className="example-header">
              <h2>Custom Styled</h2>
              <p>Editor with custom theme and styling applied.</p>
            </div>
            <div className="custom-editor-wrapper">
              <CMSBlockEditor 
                value={styledContent}
                onChange={(editorState:any) => {
                  setStyledContent(JSON.stringify(editorState));
                }}
              />
            </div>
            <div className="content-preview">
              <h3>Content Stats</h3>
              <p>Characters: {styledContent?.length || 0}</p>
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
                  onChange={(editorState:any) => {
                    setRendererContent(JSON.stringify(editorState));
                  }}
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

{rendererContent && (
                  <CMSRenderer content={JSON.stringify({"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Leveraging Istio and Spire to create a cryptographically secure service identity mesh across hybrid environments.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}})} className="demo-renderer" />
                )}
      <footer className="app-footer">
 <CMSRenderer content={JSON.stringify({"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Leveraging Istio and Spire to create a cryptographically secure service identity mesh across hybrid environments.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}})} className="demo-renderer" />
        <p>Built with Lexical • Try typing <code>/</code> for commands</p>
      </footer>
    </div>
  );
}

export default App;
