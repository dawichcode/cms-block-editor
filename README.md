# CMS Block Editor

A powerful, feature-rich block editor for CMS applications built with Lexical and React. Create beautiful, responsive content with an intuitive editing experience.

[![npm version](https://img.shields.io/npm/v/cms-block-editor.svg)](https://www.npmjs.com/package/cms-block-editor)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
<img width="1440" height="813" alt="image" src="https://github.com/user-attachments/assets/be60464e-7fd3-4efa-b340-1761b68bfe4f" />

## Features

✨ **Rich Text Editing** - Full formatting support (bold, italic, underline, headings, lists, etc.)  
🎨 **Sections** - 10 pre-designed section templates (hero, features, pricing, testimonials, etc.)  
📐 **Layouts** - Flexbox and CSS Grid support with visual controls  
🖼️ **Images** - Upload, resize, drag-and-drop, and advanced editing with filters  
🎨 **Image Filters** - 7 adjustable filters with 6 professional presets  
🎬 **Videos** - Native HTML5 video upload with playback controls  
🎥 **Embeds** - YouTube, Facebook, Instagram, Twitter, TikTok, Vimeo, Spotify, SoundCloud  
🔗 **Links** - Custom link insertion with labels and options  
📊 **Tables** - Visual table builder with configurable rows/columns and professional styling  
🎨 **Styling** - Background colors, images, gradients, opacity controls  
🌈 **Themes** - 10 preset themes with light/dark mode and custom theme support  
📱 **Responsive** - Mobile-first design with automatic responsive behavior  
💾 **Export/Import** - HTML and Markdown support  
🎯 **Section Editor** - Full control over section layout, spacing, and styling  
⚡ **Performance** - Optimized rendering and minimal bundle size  

## Installation

```bash
npm install cms-block-editor
```

## Quick Start

```tsx
import { CMSBlockEditor, ThemeProvider } from 'cms-block-editor';
import 'cms-block-editor/dist/index.css';

function App() {
  const [content, setContent] = useState('');

  return (
    <ThemeProvider defaultTheme="light" defaultMode="auto">
      <CMSBlockEditor 
        value={content}
        onChange={(editorState) => {
          setContent(JSON.stringify(editorState));
        }}
      />
    </ThemeProvider>
  );
}
```

## Rendering Content

```tsx
import { CMSRenderer } from 'cms-block-editor';
import 'cms-block-editor/dist/index.css';

function BlogPost({ content }) {
  return (
    <article>
      <CMSRenderer content={content} />
    </article>
  );
}
```

## Core Components

### CMSBlockEditor

Main editor component with full editing capabilities.

**Props:**
- `value?: string` - Initial editor state (JSON string)
- `onChange?: (state: any) => void` - Callback fired when content changes
- `onImageAdded?: (file: File) => Promise<string>` - Custom image upload handler that returns the image URL
- `onVideoAdded?: (file: File) => Promise<string>` - Custom video upload handler that returns the video URL
- `useBase64Url?: boolean` - Use base64 encoding for images (default: `true`)

### CMSRenderer

Read-only renderer for displaying saved content.

**Props:**
- `content: string` - Serialized editor state (JSON string)
- `className?: string` - Additional CSS classes

## Available Features

### Text Formatting
- Headings (H1, H2, H3)
- Bold, Italic, Underline, Strikethrough
- Inline code
- Text alignment (left, center, right, justify)
- Bullet and numbered lists
- Blockquotes
- Code blocks

### Media
- **Images**: Upload from computer, resize with 8-point handles, drag-and-drop positioning, custom upload handler support, advanced editing with filters
- **Image Filters**: Brightness, contrast, saturation, blur, grayscale, sepia, hue rotation with 6 presets
- **Videos**: Native HTML5 video upload, drag-and-drop, playback controls (autoplay, loop, mute), resize support
- **YouTube**: Embed videos with custom sizing
- **Embeds**: Support for 8+ platforms with automatic URL detection
- **Tables**: Visual builder with configurable dimensions, header rows, and professional styling

### Sections
10 pre-designed templates:
- Hero Section
- Features Grid
- Call to Action
- Testimonial
- Pricing Table
- Team Members
- Statistics
- FAQ Section
- Contact Form
- Newsletter Signup

### Section Controls
- Background colors (30 presets + custom)
- Background images with gradient overlays
- Layout types (Block, Flex, Grid)
- Flexbox controls (direction, wrap, align, justify)
- CSS Grid controls (columns, rows)
- Spacing controls (padding, margin, gap)
- Text alignment
- Opacity control

### Export & Import
- Export to HTML (clean or with styles)
- Export to Markdown
- Import from HTML
- Import from Markdown
- Download as files
- Copy to clipboard

## Advanced Usage

### Theme System

Use preset themes or create custom ones:

```typescript
import { CMSBlockEditor, ThemeProvider, ThemeSwitcher } from 'cms-block-editor';

function App() {
  return (
    <ThemeProvider defaultTheme="ocean" defaultMode="auto">
      <div>
        <ThemeSwitcher />
        <CMSBlockEditor value={content} onChange={setContent} />
      </div>
    </ThemeProvider>
  );
}
```

**Available Themes**: light, dark, ocean, forest, sunset, rose, midnight, dracula, monokai, minimal

**Custom Theme**:
```typescript
import { Theme, lightTheme } from 'cms-block-editor';

const myTheme: Theme = {
  ...lightTheme,
  name: 'my-theme',
  colors: {
    ...lightTheme.colors,
    primary: '#ff6b6b',
    primaryHover: '#ee5a52',
  },
};

<ThemeProvider defaultTheme={myTheme}>
  <CMSBlockEditor />
</ThemeProvider>
```

### Custom Video Upload

Upload videos to your server:

```typescript
import { CMSBlockEditor } from 'cms-block-editor';

function Editor() {
  const [content, setContent] = useState('');

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
    <CMSBlockEditor 
      value={content}
      onChange={(state) => setContent(JSON.stringify(state))}
      onVideoAdded={handleVideoUpload}
    />
  );
}
```

### Custom Image Upload

Upload images to your server instead of using base64 encoding:

```tsx
import { CMSBlockEditor } from 'cms-block-editor';

function Editor() {
  const [content, setContent] = useState('');

  const handleImageUpload = async (file: File): Promise<string> => {
    // Upload to your server
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    const data = await response.json();
    return data.url; // Return the uploaded image URL
  };

  return (
    <CMSBlockEditor 
      value={content}
      onChange={(state) => setContent(JSON.stringify(state))}
      onImageAdded={handleImageUpload}
      useBase64Url={false}
    />
  );
}
```

**Image Upload Options:**

- **With `onImageAdded`**: Provide a custom upload handler that uploads the file to your server and returns the URL
- **With `useBase64Url={true}`** (default): Images are encoded as base64 strings (no server upload needed)
- **With `useBase64Url={false}` and no `onImageAdded`**: Image upload will be disabled

### With Persistence

```tsx
import { CMSBlockEditor } from 'cms-block-editor';

function Editor() {
  const [content, setContent] = useState(() => {
    return localStorage.getItem('content') || '';
  });

  const handleChange = (state) => {
    const serialized = JSON.stringify(state);
    setContent(serialized);
    localStorage.setItem('content', serialized);
  };

  return <CMSBlockEditor value={content} onChange={handleChange} />;
}
```

### Export Utilities

```tsx
import { 
  exportToHTML, 
  exportToMarkdown,
  downloadHTML,
  downloadMarkdown 
} from 'cms-block-editor';

// Export to HTML string
const html = exportToHTML(editor);

// Export to Markdown string
const markdown = exportToMarkdown(editor);

// Download as file
downloadHTML(editor, 'content.html', { includeStyles: true });
downloadMarkdown(editor, 'content.md');
```

### Import Utilities

```tsx
import { 
  importFromHTML,
  importFromMarkdown 
} from 'cms-block-editor';

// Import HTML
importFromHTML(editor, '<h1>Hello World</h1>');

// Import Markdown
importFromMarkdown(editor, '# Hello World');
```

## Styling

The editor comes with default styles. Import the CSS file:

```tsx
import 'cms-block-editor/dist/index.css';
```

### Custom Styling

Override default styles with your own CSS:

```css
.cms-editor-shell {
  border: 2px solid #your-color;
  border-radius: 8px;
}

.cms-toolbar {
  background: #your-color;
}

.cms-section {
  /* Custom section styles */
}
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## TypeScript Support

Full TypeScript support with type definitions included.

```tsx
import { CMSBlockEditor, CMSRenderer } from 'cms-block-editor';
import type { SerializedEditorState } from 'lexical';
```

## Performance

- Optimized rendering with Lexical
- Minimal re-renders
- Lazy loading of plugins
- Small bundle size (~200KB minified)
- Tree-shakeable exports

## Examples

Check out the [example app](./example-app) for a complete implementation with:
- Basic editor
- Persistence with localStorage
- Custom styling
- All features demonstrated

## Documentation

Comprehensive guides available:
- [Theme System Guide](./docs/THEME-GUIDE.md) - Complete theming and customization
- [Video Upload Guide](./docs/VIDEO-GUIDE.md) - Native HTML5 video upload and playback
- [Image Editing Guide](./docs/IMAGE-EDITING-GUIDE.md) - Advanced image filters and effects
- [Section Creator Guide](./SECTION-CREATOR-GUIDE.md)
- [Section Editing Guide](./SECTION-EDITING-GUIDE.md)
- [Background Image Guide](./BACKGROUND-IMAGE-GUIDE.md)
- [Embed Guide](./EMBED-GUIDE.md)
- [Table Guide](./TABLE-GUIDE.md)
- [Responsive Rendering Guide](./RESPONSIVE-RENDERING-GUIDE.md)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Your Name]

## Support

For issues and questions:
- [GitHub Issues](https://github.com/yourusername/cms-block-editor/issues)
- [Documentation](https://github.com/yourusername/cms-block-editor#readme)

## Acknowledgments

Built with:
- [Lexical](https://lexical.dev/) - Extensible text editor framework
- [React](https://react.dev/) - UI library
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library
