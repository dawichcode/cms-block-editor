# 📝 WordPress-Style Editor Features

## Complete Feature Set

Your CMS Block Editor now includes all the essential features found in WordPress Gutenberg and classic editors!

## ✅ Text Formatting

### Basic Formatting
- **Bold** (Cmd+B) - Make text bold
- **Italic** (Cmd+I) - Italicize text
- **Underline** (Cmd+U) - Underline text
- **Strikethrough** - Cross out text
- **Inline Code** - Monospace code formatting

### How to Use
1. Select text
2. Click toolbar button or use keyboard shortcut
3. Format is applied immediately
4. Active state shows in toolbar (blue background)

## 📐 Text Alignment

### Alignment Options
- **Left Align** (⫴) - Default alignment
- **Center Align** (≡) - Center text
- **Right Align** (⫵) - Right-align text
- **Justify** (≣) - Full justification

### How to Use
1. Place cursor in paragraph/heading
2. Click alignment button
3. Entire block is aligned
4. Works with all block types

## 📋 Lists

### List Types
- **Bullet List** (≡) - Unordered list
- **Numbered List** (≣) - Ordered list

### Features
- Nested lists (Tab to indent)
- Multi-level support
- Auto-continue on Enter
- Backspace to exit list

### How to Use
1. Click list button in toolbar
2. Type list item
3. Press Enter for new item
4. Press Tab to indent
5. Press Shift+Tab to outdent

## 📑 Block Types

### Paragraph (¶)
- Default block type
- Standard text content
- Supports all formatting

### Headings
- **H1** - Main title (largest)
- **H2** - Section heading
- **H3** - Subsection heading

### Quote (")
- Blockquote styling
- Italic text
- Left border accent
- Light background

### Code Block ({ })
- Syntax-highlighted code
- Dark theme
- Monospace font
- Horizontal scroll for long lines

## 🔗 Links

### Insert Link (🔗)
1. Select text
2. Click link button
3. Enter URL in prompt
4. Link is inserted

### Format
- Markdown-style: `[text](url)`
- Can be enhanced with LinkNode

## 📷 Media

### Image Upload (📷)
- Click button to upload
- Supports all image formats
- Base64 encoding
- Resizable and draggable

### YouTube Embeds
- Use slash command `/youtube`
- Enter video ID
- Resizable player
- Draggable positioning

## ⌨️ Keyboard Shortcuts

### Text Formatting
- `Cmd+B` - Bold
- `Cmd+I` - Italic
- `Cmd+U` - Underline
- `Cmd+Z` - Undo
- `Cmd+Shift+Z` - Redo

### Navigation
- `Enter` - New paragraph
- `Shift+Enter` - Line break
- `Tab` - Indent list
- `Shift+Tab` - Outdent list
- `Backspace` - Delete/exit block

## 🎯 Slash Commands

Type `/` to open command menu:

### Text Blocks
- `/h1` - Heading 1
- `/h2` - Heading 2
- `/h3` - Heading 3
- `/quote` - Quote block
- `/code` - Code block

### Lists
- `/ul` or `/bullet` - Bullet list
- `/ol` or `/number` - Numbered list

### Media
- `/image` - Upload image
- `/youtube` - YouTube embed

### Layout
- `/columns` - Two-column layout

## 🎨 Toolbar Layout

```
┌────────────────────────────────────────────────────────┐
│ [↶] [↷] | [¶] [H1] [H2] [H3] | [B] [I] [U] [S] [<>]  │
│ | [≡] [≣] | [⫴] [≡] [⫵] [≣] | ["] [{ }] | [🔗] [📷]  │
└────────────────────────────────────────────────────────┘

Legend:
↶↷ = Undo/Redo
¶ = Paragraph
H1-H3 = Headings
B I U S = Bold, Italic, Underline, Strikethrough
<> = Inline code
≡≣ = Lists
⫴≡⫵≣ = Alignment
" = Quote
{ } = Code block
🔗 = Link
📷 = Image
```

## 📊 Feature Comparison

| Feature | WordPress | CMS Block Editor |
|---------|-----------|------------------|
| Bold/Italic/Underline | ✅ | ✅ |
| Headings (H1-H3) | ✅ | ✅ |
| Lists | ✅ | ✅ |
| Text Alignment | ✅ | ✅ |
| Links | ✅ | ✅ |
| Images | ✅ | ✅ |
| Code Blocks | ✅ | ✅ |
| Quotes | ✅ | ✅ |
| Undo/Redo | ✅ | ✅ |
| Drag & Drop | ✅ | ✅ |
| Resize Media | ✅ | ✅ |
| Slash Commands | ✅ | ✅ |
| Real-time Preview | ✅ | ✅ |

## 🎯 Usage Examples

### Example 1: Format Text
```
1. Type some text
2. Select it
3. Click [B] for bold
4. Click [I] for italic
5. Text is now bold and italic
```

### Example 2: Create List
```
1. Click [≡] for bullet list
2. Type first item
3. Press Enter
4. Type second item
5. Press Tab to indent
6. Type nested item
```

### Example 3: Add Heading
```
1. Type text
2. Click [H1] button
3. Text becomes heading
4. Or use /h1 slash command
```

### Example 4: Insert Code
```
1. Click [{ }] button
2. Type or paste code
3. Code block with syntax highlighting
4. Or use /code slash command
```

### Example 5: Align Text
```
1. Place cursor in paragraph
2. Click [≡] for center
3. Paragraph is centered
4. Works with headings too
```

## 💡 Pro Tips

### Efficient Editing
1. Use keyboard shortcuts for speed
2. Use slash commands for quick blocks
3. Select text before formatting
4. Use Tab/Shift+Tab in lists

### Content Organization
1. Use H1 for main title
2. Use H2 for sections
3. Use H3 for subsections
4. Use lists for structured content

### Visual Appeal
1. Use quotes for callouts
2. Use code blocks for examples
3. Use alignment for emphasis
4. Use images to break up text

### Workflow
1. Write content first
2. Format as you go
3. Use toolbar for quick access
4. Use slash commands for blocks

## 🚀 Advanced Features

### Coming Soon
- [ ] Tables
- [ ] Horizontal rules
- [ ] Text colors
- [ ] Background colors
- [ ] Font sizes
- [ ] Custom blocks
- [ ] Block patterns
- [ ] Reusable blocks

### Already Included
- ✅ Drag & drop media
- ✅ Resize images/videos
- ✅ 360° resize handles
- ✅ Auto-save support
- ✅ Dark mode
- ✅ Responsive design
- ✅ Accessibility

## 📱 Mobile Support

All features work on mobile:
- Touch-friendly buttons
- Responsive toolbar
- Swipe gestures
- Virtual keyboard support

## 🎨 Customization

### Override Styles
```css
/* Custom toolbar */
.cms-toolbar-button {
  background: your-color;
}

/* Custom code block */
.cms-editor-content pre {
  background: your-color;
}
```

### Add Custom Blocks
```typescript
// Create custom node
// Register in EditorConfig
// Add to slash commands
```

## Try It Now!

Open http://localhost:5174/ and explore all the WordPress-style features:

1. Try all toolbar buttons
2. Use keyboard shortcuts
3. Create lists and headings
4. Format text multiple ways
5. Insert images and code
6. Align content
7. Use slash commands

You now have a full-featured WordPress-style editor! 🎉
