import React, { useState } from 'react';
import { CMSBlockEditor } from '@cms/cms-block-editor';

/**
 * Basic example showing minimal setup
 */
export function BasicExample() {
  const [content, setContent] = useState('');

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Basic Editor Example</h1>
      <CMSBlockEditor 
        value={content}
        onChange={(editorState) => {
          setContent(JSON.stringify(editorState));
        }}
      />
    </div>
  );
}
