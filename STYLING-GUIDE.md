# 🎨 Built-in Styling & Toolbar Guide

## Overview

The CMS Block Editor now comes with **beautiful built-in styles** and a **professional toolbar** - no additional CSS required!

## ✅ What's Included

### Built-in Toolbar
- **Undo/Redo** buttons (↶ ↷)
- **Text formatting** (Bold, Italic, Underline)
- **Headings** (H1, H2, H3)
- **Image upload** button
- **Dividers** for visual organization
- **Hover effects** and active states
- **Responsive design** for mobile

### Built-in Styles
- **Editor shell** with border and shadow
- **Content area** with scrolling
- **Typography** styles for headings and paragraphs
- **Block styles** (quotes, columns, lists)
- **Image & video** resize handles
- **Slash menu** styling
- **Dark mode** support (automatic)

## 🎯 Zero Configuration

Just import and use - styles are automatically included:

```tsx
import { CMSBlockEditor } from '@cms/cms-block-editor';

function App() {
  return <CMSBlockEditor />;
}
```

That's it! No CSS imports needed.

## 🎨 Toolbar Features

### Undo/Redo
```
↶ Undo (Cmd+Z)
↷ Redo (Cmd+Shift+Z)
```
- Hover: Blue background
- Click: Performs action
- Disabled: Grayed out when no history

### Text Formatting
```
B  Bold (Cmd+B)
I  Italic (Cmd+I)
U  Underline (Cmd+U)
```
- Active state: Blue background
- Toggle on/off with click
- Keyboard shortcuts work

### Headings
```
H1  Large heading
H2  Medium heading
H3  Small heading
```
- Click to convert current line
- Hover: Blue background
- Works with selection

### Image Upload
```
📷 Image
```
- Opens file picker
- Supports all image formats
- Converts to base64

## 🎨 Style Customization

### CSS Variables (Coming Soon)
```css
:root {
  --cms-primary-color: #667eea;
  --cms-border-color: #e9ecef;
  --cms-background: white;
}
```

### Override Classes
You can override any built-in class:

```css
/* Custom toolbar background */
.cms-toolbar {
  background: linear-gradient(to right, #667eea, #764ba2);
}

/* Custom button style */
.cms-toolbar-button {
  border-radius: 20px;
}

/* Custom editor height */
.cms-editor-content {
  min-height: 500px;
}
```

## 📐 Layout Structure

```
┌─────────────────────────────────┐
│  cms-editor-shell               │
│  ┌───────────────────────────┐  │
│  │  cms-toolbar              │  │
│  │  [↶] [↷] | [B] [I] [U]   │  │
│  │  | [H1] [H2] [H3]         │  │
│  │  | [📷 Image]             │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │  cms-editor-content       │  │
│  │                           │  │
│  │  Your content here...     │  │
│  │                           │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

## 🎨 Color Scheme

### Primary Colors
- **Primary**: #667eea (Blue-purple)
- **Primary Dark**: #5568d3
- **Accent**: #764ba2 (Purple)

### Neutral Colors
- **Text**: #2c3e50 (Dark gray)
- **Text Light**: #495057
- **Border**: #e9ecef (Light gray)
- **Background**: #f8f9fa

### State Colors
- **Hover**: #667eea
- **Active**: #667eea
- **Disabled**: 50% opacity

## 📱 Responsive Design

### Desktop (> 768px)
- Full toolbar with all buttons
- Larger button sizes (36px)
- More padding and spacing

### Mobile (≤ 768px)
- Compact toolbar
- Smaller buttons (32px)
- Reduced padding
- Touch-friendly targets

## 🌙 Dark Mode

Automatically adapts to system preference:

```css
@media (prefers-color-scheme: dark) {
  /* Dark backgrounds */
  /* Light text */
  /* Adjusted colors */
}
```

### Dark Mode Colors
- **Background**: #1e1e1e
- **Toolbar**: #2a2a2a
- **Text**: #e0e0e0
- **Border**: #3e3e3e

## 🎯 Class Reference

### Main Classes
- `.cms-editor-shell` - Outer container
- `.cms-toolbar` - Toolbar container
- `.cms-editor-content` - Content area
- `.cms-editor-placeholder` - Placeholder text

### Toolbar Classes
- `.cms-toolbar-button` - Toolbar button
- `.cms-toolbar-button.active` - Active button
- `.cms-toolbar-divider` - Vertical divider

### Block Classes
- `.quote-block` - Quote styling
- `.columns-block` - Columns container
- `.column` - Individual column

### Node Classes
- `.image-node-wrapper` - Image container
- `.youtube-node-wrapper` - Video container
- `.image-resize-handle` - Resize handle
- `.slash-menu` - Command menu

## 💡 Tips

### Custom Theme
```css
/* Override primary color */
.cms-toolbar-button:hover {
  background: #your-color;
  border-color: #your-color;
}

.cms-editor-shell:focus-within {
  border-color: #your-color;
}

.image-node-wrapper.selected {
  outline-color: #your-color;
}
```

### Custom Toolbar
```css
/* Larger toolbar */
.cms-toolbar {
  padding: 16px;
}

.cms-toolbar-button {
  padding: 10px 16px;
  font-size: 16px;
}
```

### Custom Content Area
```css
/* Different font */
.cms-editor-content {
  font-family: 'Georgia', serif;
  font-size: 18px;
  line-height: 2;
}

/* Fixed height */
.cms-editor-content {
  min-height: 400px;
  max-height: 800px;
}
```

## 🚀 Performance

### Optimizations
- ✅ CSS is minified in production
- ✅ Only loads what's needed
- ✅ No external dependencies
- ✅ Small bundle size (~6KB CSS)

### Bundle Sizes
- **CSS**: 6.29 KB
- **JS (ESM)**: 42.97 KB
- **JS (CJS)**: 47.26 KB
- **Total**: ~55 KB

## 📦 What's Included

### Typography
- Heading styles (H1-H3)
- Paragraph spacing
- List styling
- Font sizing and weights

### Components
- Toolbar with buttons
- Content editable area
- Placeholder text
- Scrollbar styling

### Blocks
- Quote blocks
- Column layouts
- Image nodes
- YouTube embeds

### Interactive
- Resize handles
- Drag indicators
- Hover states
- Active states
- Focus states

### Utilities
- Responsive breakpoints
- Dark mode support
- Smooth transitions
- Box shadows

## 🎨 Example Customizations

### Minimal Style
```css
.cms-editor-shell {
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: none;
}

.cms-toolbar {
  background: white;
  border-bottom: 1px solid #ddd;
}
```

### Bold Style
```css
.cms-editor-shell {
  border: 3px solid #667eea;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.2);
}

.cms-toolbar-button {
  font-weight: 700;
  text-transform: uppercase;
}
```

### Compact Style
```css
.cms-toolbar {
  padding: 8px;
  gap: 2px;
}

.cms-toolbar-button {
  padding: 6px 10px;
  font-size: 13px;
}

.cms-editor-content {
  padding: 16px;
  min-height: 200px;
}
```

## Try It Now!

Open http://localhost:5174/ to see the new built-in styles and toolbar in action!

All styling is automatic - just use the component and enjoy the professional look! 🎉
