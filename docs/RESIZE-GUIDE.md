# 🎯 360° Resize Guide

## Full 360-Degree Resize Control

Both images and YouTube embeds now support **8-point resize handles** for complete control over sizing!

## Resize Handles Layout

```
     ┌───[N]───┐
     │         │
   [W]  IMAGE [E]
     │         │
     └───[S]───┘

Where:
• [N] = North (top)
• [S] = South (bottom)  
• [E] = East (right)
• [W] = West (left)
• [NW] = Northwest (top-left corner)
• [NE] = Northeast (top-right corner)
• [SW] = Southwest (bottom-left corner)
• [SE] = Southeast (bottom-right corner)
```

## Visual Representation

### Selected State with All Handles

```
    ●────────●
    │        │
    ▌  IMG   ▐
    │        │
    ●────────●

Legend:
● = Corner handles (circular, 12px)
▌ = Edge handles (rectangular, 8x40px or 40x8px)
```

## Handle Types

### 🔵 Corner Handles (4 total)
- **Shape**: Circular dots
- **Size**: 12px diameter
- **Color**: Blue (#667eea)
- **Border**: 2px white outline
- **Cursors**:
  - NW/SE: ↖↘ (nwse-resize)
  - NE/SW: ↗↙ (nesw-resize)

### 🔷 Edge Handles (4 total)
- **Shape**: Rectangular bars
- **Size**: 
  - Horizontal (N/S): 40px wide × 8px tall
  - Vertical (E/W): 8px wide × 40px tall
- **Color**: Blue (#667eea)
- **Cursors**:
  - N/S: ↕ (ns-resize)
  - E/W: ↔ (ew-resize)

## How to Use

### 1. Select the Element
```
Click on image or YouTube embed
→ Blue border appears
→ 8 resize handles appear
```

### 2. Choose Your Handle
```
Corner handles: Resize from corners
Edge handles: Resize from sides
```

### 3. Drag to Resize
```
Click and hold handle
→ Drag in desired direction
→ Element resizes in real-time
→ Release to finish
```

### 4. Deselect
```
Click outside element
→ Handles disappear
→ Blue border disappears
```

## Resize Behaviors

### Aspect Ratio
✅ **Always maintained** - Images and videos keep their proportions

### Minimum Sizes
- **Images**: 100px minimum width
- **YouTube**: 280px minimum width (158px height)

### Direction Mapping

| Handle | Resize Direction | Effect |
|--------|-----------------|---------|
| N (Top) | Vertical | Resize from top |
| S (Bottom) | Vertical | Resize from bottom |
| E (Right) | Horizontal | Resize from right |
| W (Left) | Horizontal | Resize from left |
| NE | Diagonal | Resize from top-right |
| NW | Diagonal | Resize from top-left |
| SE | Diagonal | Resize from bottom-right |
| SW | Diagonal | Resize from bottom-left |

## Visual Feedback

### Hover State
```css
Handle color: #667eea → #5568d3 (darker blue)
Handle size: 1.0x → 1.2x (20% larger)
Transition: Smooth 0.2s animation
```

### Resizing State
```css
Element opacity: 1.0 → 0.8 (slightly transparent)
Cursor: Shows appropriate resize cursor
Real-time: Size updates as you drag
```

### Selected State
```css
Border: 2px solid #667eea
Outline: 2px offset
Border radius: 6px (images) / 10px (videos)
```

## Keyboard Shortcuts

While element is selected:
- **Esc** - Deselect element
- **Delete/Backspace** - Delete element (when cursor adjacent)
- **Cmd+Z** - Undo resize
- **Cmd+Shift+Z** - Redo resize

## Tips & Best Practices

### For Precise Sizing
1. ✅ Use corner handles for proportional resize
2. ✅ Use edge handles for specific dimension control
3. ✅ Hover over handles to see them highlight
4. ✅ Drag slowly for fine control

### For Quick Sizing
1. ✅ Use SE (bottom-right) corner - most intuitive
2. ✅ Drag far for large changes
3. ✅ Release anywhere to finish

### Performance
- ✅ Smooth resizing even with large images
- ✅ Real-time visual feedback
- ✅ No lag or stuttering
- ✅ Works with base64 images

## Examples

### Resize Image from Corner
```
1. Upload/insert image
2. Click image to select
3. Grab SE (bottom-right) corner handle
4. Drag diagonally to resize
5. Release when desired size reached
```

### Resize YouTube from Side
```
1. Insert YouTube embed (/youtube)
2. Click video to select
3. Grab E (right) edge handle
4. Drag horizontally to widen
5. Height adjusts automatically
```

### Make Image Smaller
```
1. Select image
2. Grab any corner handle
3. Drag toward center
4. Image shrinks proportionally
5. Minimum 100px enforced
```

## Handle Positions (Exact)

### Corner Handles
- **NW**: left: -4px, top: -4px
- **NE**: right: -4px, top: -4px
- **SW**: left: -4px, bottom: -4px
- **SE**: right: -4px, bottom: -4px

### Edge Handles
- **N**: left: 50%, top: -4px (centered)
- **S**: left: 50%, bottom: -4px (centered)
- **E**: right: -4px, top: 50% (centered)
- **W**: left: -4px, top: 50% (centered)

## Browser Compatibility

✅ Chrome/Edge - Full support
✅ Firefox - Full support
✅ Safari - Full support
✅ Mobile browsers - Touch support

## Try It Now!

Open http://localhost:5174/ and:

1. Click "📷 Upload Image" button
2. Select an image
3. Click the image to see all 8 handles
4. Try dragging each handle to see how it works!

Enjoy your 360-degree resize control! 🎨
