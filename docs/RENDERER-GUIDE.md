# CMSRenderer Guide

The CMSRenderer component displays saved editor content in a read-only format, perfect for rendering content on your frontend.

## Features

- Read-only display of editor content
- Preserves all formatting (bold, italic, underline, etc.)
- Renders images, YouTube embeds, and links
- Displays layouts (columns and grids)
- Responsive design
- Dark mode support
- No editing controls or toolbar

## Installation

The CMSRenderer is included in the package:

```tsx
import { CMSRenderer } from '@cms/cms-block-editor';
```

## Basic Usage

```tsx
import { CMSRenderer } from '@cms/cms-block-editor';

function BlogPost({ content }) {
  return (
    <article>
      <CMSRenderer content={content} />
    </article>
  );
}
```

## Props

### content (required)
- Type: `string`
- The serialized editor state (JSON string) from CMSBlockEditor
- This is the same value you get from the `onChange` callback

### className (optional)
- Type: `string`
- Additional CSS class names to apply to the renderer container
- Default: `""`

## Example with Custom Styling

```tsx
import { CMSRenderer } from '@cms/cms-block-editor';
import './my-custom-styles.css';

function Article({ content }) {
  return (
    <div className="article-container">
      <CMSRenderer 
        content={content} 
        className="my-custom-renderer"
      />
    </div>
  );
}
```

## Complete Example: Editor + Renderer

```tsx
import { useState } from 'react';
import { CMSBlockEditor, CMSRenderer } from '@cms/cms-block-editor';

function ContentManager() {
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(true);

  const handleSave = (editorState) => {
    const json = JSON.stringify(editorState);
    setContent(json);
    // Save to your backend
    fetch('/api/content', {
      method: 'POST',
      body: JSON.stringify({ content: json }),
      headers: { 'Content-Type': 'application/json' }
    });
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <CMSBlockEditor 
            value={content}
            onChange={handleSave}
          />
          <button onClick={() => setIsEditing(false)}>
            Preview
          </button>
        </div>
      ) : (
        <div>
          <CMSRenderer content={content} />
          <button onClick={() => setIsEditing(true)}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
```

## What Gets Rendered

The CMSRenderer supports all editor features:

### Text Formatting
- Headings (H1, H2, H3)
- Paragraphs
- Bold, italic, underline, strikethrough
- Inline code
- Text alignment (left, center, right, justify)

### Blocks
- Quote blocks
- Code blocks
- Bullet lists
- Numbered lists

### Media
- Images (with original dimensions)
- YouTube embeds

### Links
- Regular links
- Links that open in new tabs (with ↗ indicator)
- Auto-detected URLs

### Layouts
- 2, 3, and 4 column layouts
- 2×2 and 3×3 grid layouts
- Responsive (stacks on mobile)

## Styling

The renderer comes with default styles that match the editor. You can customize by:

1. **Override CSS classes**: Target `.cms-renderer` and `.cms-renderer-content`
2. **Use className prop**: Add your own classes
3. **CSS variables**: Define custom colors and spacing

### Custom CSS Example

```css
/* Override default styles */
.cms-renderer-content {
  font-family: 'Georgia', serif;
  font-size: 18px;
  line-height: 2;
}

.cms-renderer-content h1 {
  color: #1a1a1a;
  font-size: 2.5em;
}

.cms-renderer-content a {
  color: #0066cc;
}

/* Custom class styling */
.my-custom-renderer {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}
```

## Server-Side Rendering (SSR)

The CMSRenderer works with SSR frameworks like Next.js:

```tsx
// pages/blog/[slug].tsx
import { CMSRenderer } from '@cms/cms-block-editor';

export default function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <CMSRenderer content={post.content} />
    </article>
  );
}

export async function getServerSideProps({ params }) {
  const post = await fetchPost(params.slug);
  return { props: { post } };
}
```

## Performance Tips

1. **Memoize content**: Use `useMemo` if the content doesn't change often
2. **Lazy load**: Load the renderer only when needed
3. **Code splitting**: Import dynamically for better initial load

```tsx
import { lazy, Suspense } from 'react';

const CMSRenderer = lazy(() => 
  import('@cms/cms-block-editor').then(mod => ({ 
    default: mod.CMSRenderer 
  }))
);

function Article({ content }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CMSRenderer content={content} />
    </Suspense>
  );
}
```

## Accessibility

The renderer maintains accessibility features:
- Semantic HTML elements
- Proper heading hierarchy
- Alt text for images
- Link titles and ARIA attributes
- Keyboard navigation support

## Differences from Editor

| Feature | Editor | Renderer |
|---------|--------|----------|
| Editable | ✅ Yes | ❌ No |
| Toolbar | ✅ Yes | ❌ No |
| Resize handles | ✅ Yes | ❌ No |
| Drag & drop | ✅ Yes | ❌ No |
| Selection | ✅ Yes | ✅ Yes (for copying) |
| Styling | Full editor UI | Clean content display |

## Troubleshooting

### Content not displaying
- Ensure the content prop is a valid JSON string
- Check that the content was saved from CMSBlockEditor
- Verify the content is not empty

### Styling issues
- Make sure renderer.css is imported
- Check for CSS conflicts with your app styles
- Use browser DevTools to inspect applied styles

### Images not loading
- Verify image URLs are accessible
- Check CORS settings for external images
- Ensure base64 images are properly encoded

## API Reference

```typescript
interface CMSRendererProps {
  content: string;      // Required: Serialized editor state
  className?: string;   // Optional: Additional CSS classes
}
```

## Best Practices

1. **Always validate content**: Sanitize content from untrusted sources
2. **Cache rendered output**: Store rendered HTML for better performance
3. **Use semantic HTML**: The renderer outputs semantic markup
4. **Test responsiveness**: Verify layouts work on all screen sizes
5. **Monitor bundle size**: Use code splitting for large applications
