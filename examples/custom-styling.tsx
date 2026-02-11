import React, { useState } from 'react';
import { CMSBlockEditor } from '@cms/cms-block-editor';
import './custom-styles.css';

/**
 * Example with custom styling
 */
export function CustomStylingExample() {
  const [content, setContent] = useState('');

  return (
    <div className="custom-editor-container">
      <h1>Custom Styled Editor</h1>
      <p>This example shows how to apply custom styles to the editor.</p>
      
      <CMSBlockEditor 
        value={content}
        onChange={(editorState) => {
          setContent(JSON.stringify(editorState));
        }}
      />
      
      <div className="content-preview">
        <h2>Content Length</h2>
        <p>{content.length} characters</p>
      </div>
    </div>
  );
}
