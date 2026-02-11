import React, { useState, useEffect } from 'react';
import { CMSBlockEditor } from '@cms/cms-block-editor';

/**
 * Example with localStorage persistence
 */
export function PersistenceExample() {
  const [content, setContent] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // Load content on mount
  useEffect(() => {
    const saved = localStorage.getItem('cms-content');
    if (saved) {
      setContent(saved);
    }
  }, []);

  const handleChange = (editorState: any) => {
    const serialized = JSON.stringify(editorState);
    setContent(serialized);
    
    // Auto-save after 1 second of inactivity
    const timeoutId = setTimeout(() => {
      localStorage.setItem('cms-content', serialized);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }, 1000);

    return () => clearTimeout(timeoutId);
  };

  const handleClear = () => {
    localStorage.removeItem('cms-content');
    setContent('');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Editor with Persistence</h1>
        <div>
          {isSaved && <span style={{ color: 'green', marginRight: '10px' }}>✓ Saved</span>}
          <button onClick={handleClear}>Clear Content</button>
        </div>
      </div>
      
      <CMSBlockEditor 
        value={content}
        onChange={handleChange}
      />
    </div>
  );
}
