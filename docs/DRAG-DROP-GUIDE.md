# 🎯 Drag & Drop Repositioning Guide

## Move Images & Videos Anywhere!

Both images and YouTube embeds can now be **dragged and repositioned** anywhere in your document during editing.

## How It Works

### 1. Select the Element
```
Click on image or YouTube embed
→ Blue border appears
→ Cursor changes to "move" (✋)
→ Element is now draggable
```

### 2. Drag to New Location
```
Click and hold on the selected element
→ Semi-transparent clone appears
→ Drag to desired location
→ Release to drop
```

### 3. Element Repositions
```
Element moves to new location
→ Automatically inserted at drop point
→ Maintains size and properties
```

## Visual States

### Normal State
```
┌─────────────┐
│   IMAGE     │  ← cursor: pointer
└─────────────┘
```

### Selected State (Ready to Drag)
```
╔═════════════╗
║   IMAGE     ║  ← cursor: move (✋)
╚═════════════╝
   Blue border
```

### Dragging State
```
┌─────────────┐
│   IMAGE     │  ← Original position (stays)
└─────────────┘

    ↓ (dragging)

┌─────────────┐
│   IMAGE     │  ← Semi-transparent clone (50% opacity)
└─────────────┘  ← cursor: grabbing (✊)
   Follows mouse
```

### After Drop
```
┌─────────────┐
│   IMAGE     │  ← New position
└─────────────┘
```

## Cursor Changes

| State | Cursor | Meaning |
|-------|--------|---------|
| Unselected | pointer (👆) | Click to select |
| Selected | move (✋) | Ready to drag |
| Dragging | grabbing (✊) | Currently dragging |
| On resize handle | resize (↔↕↖↗) | Ready to resize |

## Features

### ✅ Smart Drag Detection
- Clicking resize handles won't trigger drag
- Only drags when clicking the element body
- Prevents accidental moves while resizing

### ✅ Visual Feedback
- **Clone follows cursor** - See where you're moving
- **50% opacity** - Clearly indicates dragging state
- **Original stays** - Until drop is confirmed
- **Smooth animation** - Professional feel

### ✅ Drop Validation
- Only drops in editor content area
- Invalid drops are cancelled
- Element returns to original position if dropped outside

### ✅ Maintains Properties
- Size is preserved
- Alt text preserved (images)
- Video ID preserved (YouTube)
- All settings maintained

## Step-by-Step Examples

### Example 1: Move Image Down
```
1. Click image to select (blue border appears)
2. Cursor changes to move icon (✋)
3. Click and hold on image
4. Drag downward to new position
5. Release mouse button
6. Image moves to new location
```

### Example 2: Move YouTube Video Up
```
1. Click video to select
2. See move cursor (✋)
3. Click and drag upward
4. Position above text
5. Release to drop
6. Video repositions above text
```

### Example 3: Reorder Multiple Elements
```
1. Insert image at top
2. Insert video at bottom
3. Select video (click it)
4. Drag video to top
5. Select image
6. Drag image to bottom
7. Elements are now swapped!
```

## Tips & Best Practices

### For Precise Positioning
1. ✅ Select element first (click once)
2. ✅ Wait for move cursor to appear
3. ✅ Click and hold on element body (not handles)
4. ✅ Drag slowly for control
5. ✅ Release at exact desired position

### For Quick Moves
1. ✅ Select and immediately drag
2. ✅ Use fast, confident movements
3. ✅ Drop anywhere in editor

### Avoiding Accidental Drags
1. ✅ Click outside to deselect when done
2. ✅ Use resize handles for resizing (not dragging)
3. ✅ Be deliberate with clicks

### Performance Tips
- ✅ Works smoothly with any size image
- ✅ No lag even with base64 images
- ✅ Multiple elements can be moved sequentially
- ✅ Undo/redo supported (Cmd+Z)

## Keyboard Shortcuts

While dragging:
- **Esc** - Cancel drag (element stays in place)
- **Cmd+Z** - Undo move after drop

While selected:
- **Click outside** - Deselect element
- **Delete/Backspace** - Delete element

## Technical Details

### Drag Behavior
```javascript
1. Click on selected element
2. Create semi-transparent clone
3. Clone follows mouse cursor
4. Original element stays in place
5. On release:
   - Find drop target
   - Remove original
   - Insert at new position
   - Remove clone
```

### Drop Zones
- ✅ Anywhere in `.editor-content`
- ✅ Between paragraphs
- ✅ Before/after other elements
- ❌ Outside editor (cancels drag)
- ❌ On toolbar (cancels drag)

### Z-Index Layers
```
Layer 9999: Dragging clone (top)
Layer 10: Resize handles
Layer 1: Selected element border
Layer 0: Normal content
```

## Combining Features

### Drag + Resize
```
1. Insert image
2. Resize to desired size (drag handles)
3. Drag to desired position
4. Perfect placement!
```

### Drag + Upload
```
1. Upload image (toolbar button)
2. Image appears at cursor
3. Select and drag to final position
4. Resize if needed
```

### Multiple Operations
```
1. Upload image → Resize → Drag → Position
2. Insert video → Drag → Resize → Perfect
3. Reorder → Resize → Adjust → Done
```

## Troubleshooting

### Element Won't Drag
- ✅ Make sure element is selected (blue border)
- ✅ Click on element body, not resize handles
- ✅ Wait for move cursor (✋) to appear

### Drag Cancelled
- ✅ Dropped outside editor area
- ✅ Pressed Esc during drag
- ✅ Browser interrupted drag

### Element Disappeared
- ✅ Use Cmd+Z to undo
- ✅ Check if dropped outside visible area
- ✅ Scroll to find element

## Browser Compatibility

✅ Chrome/Edge - Full support
✅ Firefox - Full support  
✅ Safari - Full support
✅ Mobile - Touch drag supported

## Try It Now!

Open http://localhost:5174/ and:

1. Upload an image
2. Click to select (see blue border)
3. Notice cursor changes to move icon (✋)
4. Click and drag the image
5. See the semi-transparent clone follow your cursor
6. Drop anywhere in the editor
7. Image repositions!

Enjoy your drag-and-drop editing! 🎨
