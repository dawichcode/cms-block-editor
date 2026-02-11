# Export & Import Guide

The CMS Block Editor includes comprehensive export and import capabilities for HTML and Markdown formats.

## Features

### Export Options
- ✅ Export to HTML (clean)
- ✅ Export to HTML with styles (complete document)
- ✅ Export to Markdown
- ✅ Copy HTML to clipboard
- ✅ Copy Markdown to clipboard
- ✅ Download as files

### Import Options
- ✅ Import from HTML file
- ✅ Import from Markdown file
- ✅ Paste HTML from clipboard
- ✅ Paste Markdown from clipboard
- ✅ Replace or append content

## Using the Toolbar

### Export Button (⬇️)

Click the download icon in the toolbar to access export options:

1. **HTML** - Download clean HTML
2. **HTML + Styles** - Download complete HTML document with CSS
3. **Markdown** - Download as .md file
4. **Copy HTML** - Copy HTML to clipboard
5. **Copy Markdown** - Copy Markdown to clipboard

### Import Button (⬆️)

Click the upload icon in the toolbar to access import options:

1. Select format (HTML or Markdown)
2. Choose import method:
   - **From File** - Upload a file
   - **From Clipboard** - Paste content

## Programmatic Usage

### Export Functions

```tsx
import { 
  exportToHTML, 
  exportToMarkdown,
  downloadHTML,
  downloadMarkdown 
} from '@cms/cms-block-editor';

// In your component
const [editor] = useLexicalComposerContext();

// Export to HTML string
const html = exportToHTML(editor);

// Export to Markdown string
const markdown = exportToMarkdown(editor);

// Download HTML file
downloadHTML(editor, 'my-content.html');

// Download HTML with styles
downloadHTML(editor, 'my-content.html', { includeStyles: true });

// Download Markdown file
downloadMarkdown(editor, 'my-content.md');
```

### Import Functions

```tsx
import { 
  importFromHTML,
  importFromMarkdown,
  loadHTMLFromFile,
  loadMarkdownFromFile
} from '@cms/cms-block-editor';

// Import HTML string
importFromHTML(editor, '<h1>Hello World</h1>');

// Import Markdown string
importFromMarkdown(editor, '# Hello World');

// Load from file
const handleFileUpload = (file: File) => {
  if (file.name.endsWith('.html')) {
    loadHTMLFromFile(
      editor,
      file,
      () => console.log('Imported successfully'),
      (error) => console.error('Import failed:', error)
    );
  } else if (file.name.endsWith('.md')) {
    loadMarkdownFromFile(
      editor,
      file,
      () => console.log('Imported successfully'),
      (error) => console.error('Import failed:', error)
    );
  }
};
```

## HTML Export

### Clean HTML

Exports just the content without wrapper or styles:

```html
<h1>My Heading</h1>
<p>This is a paragraph with <strong>bold</strong> text.</p>
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

### HTML with Styles

Exports a complete HTML document with embedded CSS:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Exported Content</title>
  <style>
    /* Embedded styles */
  </style>
</head>
<body>
  <div class="cms-content">
    <!-- Your content -->
  </div>
</body>
</html>
```

## Markdown Export

Exports content in standard Markdown format:

```markdown
# My Heading

This is a paragraph with **bold** text.

- Item 1
- Item 2

## Subheading

> This is a quote

[Link text](https://example.com)
```

### Supported Markdown Features

- ✅ Headings (# ## ###)
- ✅ Bold (**text**)
- ✅ Italic (*text*)
- ✅ Inline code (`code`)
- ✅ Strikethrough (~~text~~)
- ✅ Links ([text](url))
- ✅ Bullet lists (-)
- ✅ Numbered lists (1.)
- ✅ Blockquotes (>)
- ✅ Code blocks (```)

## HTML Import

### Supported HTML Elements

- ✅ Headings (h1-h6)
- ✅ Paragraphs (p)
- ✅ Text formatting (strong, em, u, s, code)
- ✅ Lists (ul, ol, li)
- ✅ Links (a)
- ✅ Images (img)
- ✅ Blockquotes (blockquote)
- ✅ Code blocks (pre, code)
- ✅ Line breaks (br)

### Import Behavior

- Replaces all existing content
- Preserves formatting and structure
- Converts HTML to Lexical nodes
- Maintains semantic meaning

## Markdown Import

### Supported Markdown Syntax

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*
`Inline code`
~~Strikethrough~~

[Link](https://example.com)

- Bullet item
- Another item

1. Numbered item
2. Another item

> Blockquote

```
Code block
```
```

### Import Behavior

- Parses Markdown to Lexical nodes
- Preserves formatting
- Handles nested structures
- Converts inline formatting

## Use Cases

### Blog Post Export

```tsx
// Export blog post as HTML
const handlePublish = () => {
  const html = exportToHTML(editor);
  
  // Send to backend
  fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({ content: html }),
    headers: { 'Content-Type': 'application/json' }
  });
};
```

### Documentation Export

```tsx
// Export documentation as Markdown
const handleExportDocs = () => {
  const markdown = exportToMarkdown(editor);
  
  // Save to GitHub
  saveToGitHub(markdown);
};
```

### Content Migration

```tsx
// Import from old CMS
const handleMigration = async () => {
  const response = await fetch('/api/old-content');
  const html = await response.text();
  
  importFromHTML(editor, html);
};
```

### Backup & Restore

```tsx
// Backup content
const handleBackup = () => {
  const html = exportToHTML(editor);
  localStorage.setItem('backup', html);
};

// Restore content
const handleRestore = () => {
  const html = localStorage.getItem('backup');
  if (html) {
    importFromHTML(editor, html);
  }
};
```

## Advanced Usage

### Custom Export Wrapper

```tsx
import { exportToHTML } from '@cms/cms-block-editor';

const customExport = (editor: LexicalEditor) => {
  const html = exportToHTML(editor);
  
  return `
    <article class="blog-post">
      <div class="content">
        ${html}
      </div>
      <footer>
        <p>Published: ${new Date().toLocaleDateString()}</p>
      </footer>
    </article>
  `;
};
```

### Batch Import

```tsx
const importMultipleFiles = async (files: File[]) => {
  for (const file of files) {
    if (file.name.endsWith('.md')) {
      await new Promise((resolve) => {
        loadMarkdownFromFile(editor, file, resolve);
      });
    }
  }
};
```

### Export with Metadata

```tsx
const exportWithMetadata = (editor: LexicalEditor) => {
  const html = exportToHTML(editor);
  const markdown = exportToMarkdown(editor);
  
  return {
    html,
    markdown,
    wordCount: markdown.split(/\s+/).length,
    exportedAt: new Date().toISOString(),
    version: '1.0'
  };
};
```

## File Formats

### HTML Files (.html, .htm)

- Standard HTML5 format
- UTF-8 encoding
- Can include inline styles
- Compatible with all browsers

### Markdown Files (.md, .markdown)

- Standard Markdown format
- UTF-8 encoding
- GitHub-flavored Markdown compatible
- Plain text format

## Browser Compatibility

### Export
- ✅ Chrome/Edge: Full support
- ✅ Firefox: Full support
- ✅ Safari: Full support
- ✅ Mobile: Full support

### Import
- ✅ Chrome/Edge: Full support
- ✅ Firefox: Full support
- ✅ Safari: Full support
- ✅ Mobile: Full support (file picker)

### Clipboard
- ✅ Chrome/Edge: Full support
- ✅ Firefox: Full support
- ✅ Safari: Requires user permission
- ⚠️ Mobile: Limited clipboard API support

## Limitations

### HTML Export
- Custom CSS classes may not be preserved
- Complex nested structures simplified
- JavaScript removed for security

### Markdown Export
- No support for tables (yet)
- No support for footnotes
- Images exported as links
- Limited styling options

### HTML Import
- Sanitizes potentially dangerous HTML
- Removes scripts and event handlers
- Simplifies complex structures
- May lose some styling

### Markdown Import
- Basic Markdown only
- No extended syntax (tables, footnotes)
- No HTML in Markdown
- Limited to supported features

## Best Practices

### Export
1. **Choose the right format**: HTML for web, Markdown for docs
2. **Include styles**: Use HTML+Styles for standalone documents
3. **Test output**: Verify exported content renders correctly
4. **Backup regularly**: Export content periodically
5. **Version control**: Use Markdown for Git repositories

### Import
1. **Validate content**: Check imported content for errors
2. **Clean HTML**: Remove unnecessary tags before import
3. **Test first**: Import to test editor before production
4. **Backup before import**: Save current content first
5. **Handle errors**: Implement error handling for imports

## Troubleshooting

### Export Issues

**Problem**: Exported HTML missing styles  
**Solution**: Use `downloadHTML(editor, 'file.html', { includeStyles: true })`

**Problem**: Markdown formatting incorrect  
**Solution**: Check that content uses supported Markdown features

**Problem**: Download not working  
**Solution**: Check browser permissions and popup blockers

### Import Issues

**Problem**: HTML not importing correctly  
**Solution**: Ensure HTML is valid and well-formed

**Problem**: Markdown formatting lost  
**Solution**: Verify Markdown syntax is correct

**Problem**: File upload not working  
**Solution**: Check file type and size limits

**Problem**: Clipboard paste fails  
**Solution**: Grant clipboard permissions in browser

## API Reference

### Export Functions

```typescript
// HTML Export
exportToHTML(editor: LexicalEditor): string
exportToHTMLWithWrapper(editor: LexicalEditor, options?: {
  className?: string;
  includeStyles?: boolean;
}): string
downloadHTML(editor: LexicalEditor, filename?: string, options?: {
  includeStyles?: boolean;
}): void

// Markdown Export
exportToMarkdown(editor: LexicalEditor): string
downloadMarkdown(editor: LexicalEditor, filename?: string): void
copyMarkdownToClipboard(editor: LexicalEditor): Promise<boolean>
```

### Import Functions

```typescript
// HTML Import
importFromHTML(editor: LexicalEditor, html: string): void
appendHTML(editor: LexicalEditor, html: string): void
loadHTMLFromFile(
  editor: LexicalEditor,
  file: File,
  onSuccess?: () => void,
  onError?: (error: Error) => void
): void

// Markdown Import
importFromMarkdown(editor: LexicalEditor, markdown: string): void
loadMarkdownFromFile(
  editor: LexicalEditor,
  file: File,
  onSuccess?: () => void,
  onError?: (error: Error) => void
): void
pasteMarkdownFromClipboard(editor: LexicalEditor): Promise<boolean>
```

## Examples

### Complete Export/Import Component

```tsx
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { 
  exportToHTML, 
  exportToMarkdown,
  importFromHTML,
  importFromMarkdown 
} from '@cms/cms-block-editor';

function ExportImportControls() {
  const [editor] = useLexicalComposerContext();

  const handleExport = (format: 'html' | 'markdown') => {
    if (format === 'html') {
      const html = exportToHTML(editor);
      console.log(html);
    } else {
      const markdown = exportToMarkdown(editor);
      console.log(markdown);
    }
  };

  const handleImport = (content: string, format: 'html' | 'markdown') => {
    if (format === 'html') {
      importFromHTML(editor, content);
    } else {
      importFromMarkdown(editor, content);
    }
  };

  return (
    <div>
      <button onClick={() => handleExport('html')}>Export HTML</button>
      <button onClick={() => handleExport('markdown')}>Export Markdown</button>
    </div>
  );
}
```

---

**Note**: The export/import functionality is automatically included in the toolbar. Use the download (⬇️) and upload (⬆️) buttons for quick access!
