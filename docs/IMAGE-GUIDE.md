# 📸 Image Features Guide

## How Images Work Now

### ✅ Images Display in Editor
- Images appear **inline** while you're editing
- They're fully visible and interactive
- No need to preview - what you see is what you get!

### ✅ Click to Select & Resize
1. **Click on any image** to select it
2. **Blue border** appears when selected
3. **Resize handles** appear on left and right sides
4. **Drag the handles** to resize the image
5. **Maintains aspect ratio** automatically
6. **Click outside** to deselect

## 3 Ways to Add Images

### 1. 📷 Toolbar Button (Easiest!)
```
1. Click "📷 Upload Image" button at top
2. Select image from your computer
3. Image appears immediately in editor
4. Click to select and resize
```

### 2. 🖱️ Drag & Drop (Fastest!)
```
1. Drag image file from your desktop
2. Drop anywhere in the editor
3. Image appears at drop location
4. Click to select and resize
```

### 3. ⌨️ Slash Command (Most Flexible!)
```
Type /image and choose:
- "Image" → Upload from computer
- "Image from URL" → Paste web URL
```

## Image Features

### Selection
- **Click image** → Shows blue border + resize handles
- **Click outside** → Deselects image
- **Visual feedback** → Clear indication of selected state

### Resizing
- **Left handle** → Drag to resize from left
- **Right handle** → Drag to resize from right
- **Minimum size** → 100px width (prevents too small)
- **Aspect ratio** → Automatically maintained
- **Smooth resizing** → Real-time visual feedback

### Storage
- **Base64 encoding** → Images embedded in content
- **No server needed** → Works completely client-side
- **Persists with content** → Saved in editor state
- **Works offline** → No external dependencies

## Visual Indicators

### Normal State
```
┌─────────────────┐
│                 │
│     IMAGE       │
│                 │
└─────────────────┘
```

### Selected State
```
┌─────────────────┐
║█                █║  ← Resize handles (blue)
║█    IMAGE      █║
║█                █║
└─────────────────┘
   ↑ Blue border
```

### Resizing State
```
┌─────────────────┐
║█→              ←█║  ← Drag handles
║█    IMAGE      █║
║█                █║
└─────────────────┘
   Slightly transparent
```

## Tips & Tricks

### Best Practices
- ✅ Click image to select before resizing
- ✅ Use drag handles for precise sizing
- ✅ Images auto-fit to editor width
- ✅ Base64 works for small-medium images

### Keyboard Shortcuts
- **Cmd+Z** → Undo image insertion
- **Cmd+Shift+Z** → Redo
- **Delete/Backspace** → Remove selected image (when cursor is next to it)

### Performance
- **Small images** (< 1MB) → Works great
- **Medium images** (1-5MB) → Still good
- **Large images** (> 5MB) → Consider resizing first or using URL

## Supported Formats
- ✅ JPG/JPEG
- ✅ PNG
- ✅ GIF
- ✅ WebP
- ✅ SVG
- ✅ BMP

## Try It Now!

1. Open http://localhost:5174/
2. Click "📷 Upload Image" button
3. Select an image
4. Click the image to select it
5. Drag the blue handles to resize
6. Click outside to deselect

Enjoy your fully interactive image editor! 🎨
