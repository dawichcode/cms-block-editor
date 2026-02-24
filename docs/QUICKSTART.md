# Quick Start Guide

Get up and running with CMS Block Editor in 5 minutes.

## Installation

```bash
npm install cms-block-editor
```

## Basic Setup

### 1. Import and Use

```typescript
import { CMSBlockEditor } from 'cms-block-editor';
import 'cms-block-editor/dist/index.css';
import { useState } from 'react';

function App() {
  const [content, setContent] = useState('');

  return (
    <CMSBlockEditor 
      value={content}
      onChange={(editorState) => {
        setContent(JSON.stringify(editorState));
      }}
    />
  );
}

export default App;
```

That's it! You now have a fully functional editor.

## Add Themes (Optional)

```typescript
import { CMSBlockEditor, ThemeProvider } from 'cms-block-editor';
import 'cms-block-editor/dist/index.css';

function App() {
  const [content, setContent] = useState('');

  return (
    <ThemeProvider defaultTheme="ocean" defaultMode="auto">
      <CMSBlockEditor 
        value={content}
        onChange={(state) => setContent(JSON.stringify(state))}
      />
    </ThemeProvider>
  );
}
```

## Add Theme Switcher (Optional)

```typescript
import { 
  CMSBlockEditor, 
  ThemeProvider, 
  ThemeSwitcher 
} from 'cms-block-editor';

function App() {
  const [content, setContent] = useState('');

  return (
    <ThemeProvider defaultTheme="light">
      <div>
        <ThemeSwitcher />
        <CMSBlockEditor 
          value={content}
          onChange={(state) => setContent(JSON.stringify(state))}
        />
      </div>
    </ThemeProvider>
  );
}
```

## Add Custom Upload Handlers (Recommended)

```typescript
import { CMSBlockEditor, ThemeProvider } from 'cms-block-editor';

function App() {
  const [content, setContent] = useState('');

  const handleImageUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch('/api/upload-image', {
      method: 'POST',
      body: formData,
    });
    
    const data = await response.json();
    return data.url;
  };

  const handleVideoUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('video', file);
    
    const response = await fetch('/api/upload-video', {
      method: 'POST',
      body: formData,
    });
    
    const data = await response.json();
    return data.url;
  };

  return (
    <ThemeProvider>
      <CMSBlockEditor 
        value={content}
        onChange={(state) => setContent(JSON.stringify(state))}
        onImageAdded={handleImageUpload}
        onVideoAdded={handleVideoUpload}
        useBase64Url={false}
      />
    </ThemeProvider>
  );
}
```

## Render Content (Read-Only)

```typescript
import { CMSRenderer } from 'cms-block-editor';
import 'cms-block-editor/dist/index.css';

function BlogPost({ content }: { content: string }) {
  return (
    <article>
      <CMSRenderer content={content} />
    </article>
  );
}
```

## Complete Example

```typescript
import { useState } from 'react';
import { 
  CMSBlockEditor, 
  CMSRenderer,
  ThemeProvider, 
  ThemeSwitcher 
} from 'cms-block-editor';
import 'cms-block-editor/dist/index.css';

function App() {
  const [content, setContent] = useState('');
  const [isPreview, setIsPreview] = useState(false);

  const handleImageUpload = async (file: File) => {
    // Upload to your server
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch('/api/upload', { 
      method: 'POST', 
      body: formData 
    });
    const data = await res.json();
    return data.url;
  };

  const handleVideoUpload = async (file: File) => {
    // Upload to your server
    const formData = new FormData();
    formData.append('video', file);
    const res = await fetch('/api/upload-video', { 
      method: 'POST', 
      body: formData 
    });
    const data = await res.json();
    return data.url;
  };

  return (
    <ThemeProvider defaultTheme="ocean" defaultMode="auto">
      <div className="app">
        <header>
          <h1>My CMS</h1>
          <div className="actions">
            <ThemeSwitcher />
            <button onClick={() => setIsPreview(!isPreview)}>
              {isPreview ? 'Edit' : 'Preview'}
            </button>
          </div>
        </header>

        <main>
          {!isPreview ? (
            <CMSBlockEditor 
              value={content}
              onChange={(state) => setContent(JSON.stringify(state))}
              onImageAdded={handleImageUpload}
              onVideoAdded={handleVideoUpload}
              useBase64Url={false}
            />
          ) : (
            <CMSRenderer content={content} />
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
```

## Next Steps

### Try These Features

1. **Type `/` in the editor** to see slash commands
2. **Drag and drop an image** to upload it
3. **Click on an image** and select "Edit" to apply filters
4. **Upload a video** using `/video` command
5. **Switch themes** using the theme switcher
6. **Create a table** using `/table` command
7. **Add a section** using `/section` command

### Explore Documentation

- [Features Summary](./FEATURES-SUMMARY.md) - All features overview
- [Theme Guide](./THEME-GUIDE.md) - Theming and customization
- [Video Guide](./VIDEO-GUIDE.md) - Video upload and playback
- [Image Editing Guide](./IMAGE-EDITING-GUIDE.md) - Image filters and effects

### Run Example App

```bash
cd example-app
npm install
npm run dev
```

Visit `http://localhost:5173` to see all features in action.

## Common Use Cases

### Blog/CMS

```typescript
<CMSBlockEditor 
  value={post.content}
  onChange={(state) => savePost({ ...post, content: JSON.stringify(state) })}
  onImageAdded={uploadToS3}
/>
```

### Documentation

```typescript
<ThemeProvider defaultTheme="minimal">
  <CMSBlockEditor 
    value={doc.content}
    onChange={(state) => updateDoc(state)}
  />
</ThemeProvider>
```

### Marketing Pages

```typescript
<ThemeProvider defaultTheme="sunset">
  <CMSBlockEditor 
    value={page.content}
    onChange={(state) => savePage(state)}
    onImageAdded={uploadToCDN}
    onVideoAdded={uploadToCDN}
  />
</ThemeProvider>
```

## Troubleshooting

### Styles not loading
Make sure you import the CSS:
```typescript
import 'cms-block-editor/dist/index.css';
```

### Theme not applying
Wrap your app with ThemeProvider:
```typescript
<ThemeProvider defaultTheme="light">
  <App />
</ThemeProvider>
```

### Upload not working
Provide upload handlers:
```typescript
<CMSBlockEditor 
  onImageAdded={handleImageUpload}
  onVideoAdded={handleVideoUpload}
/>
```

## Support

- [GitHub Issues](https://github.com/yourusername/cms-block-editor/issues)
- [Full Documentation](../README.md)
- [Example App](../example-app)

---

**Happy Editing!** 🚀
