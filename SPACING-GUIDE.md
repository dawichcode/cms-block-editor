# Spacing & Display Guide

The CMS Block Editor includes comprehensive spacing controls for padding, margin, and display mode.

## Features

- **Display Mode**: Switch between inline, inline-block, and block display
- **Padding Control**: Adjust padding on all four sides (top, right, bottom, left)
- **Margin Control**: Adjust margin on all four sides (top, right, bottom, left)
- **Quick Presets**: One-click spacing values (0, 4, 8, 12, 16, 20, 24, 32, 40, 48px)
- **Individual Controls**: Fine-tune each side independently
- **Visual Feedback**: Real-time preview of spacing changes
- **Reset Option**: Clear all spacing with one click

## How to Use

### Opening the Spacing Menu

1. Select the text or element you want to style
2. Click the settings icon (⚙️) in the toolbar
3. The spacing menu will appear with all controls

### Display Mode

Choose how the element is displayed:

- **Inline**: Default text flow (like `<span>`)
- **Inline Block**: Inline but accepts width/height (like `<img>`)
- **Block**: Takes full width, starts on new line (like `<div>`)

**When to use:**
- Inline: For text within paragraphs
- Inline Block: For styled text that needs padding/margin
- Block: For standalone elements or sections

### Padding

Padding adds space inside the element (between content and border).

**Quick Apply:**
- Click any preset button (0-48px) to apply to all sides

**Individual Control:**
- Adjust Top, Right, Bottom, Left independently
- Type values directly or use arrow keys
- Range: 0-200px

**Example Use Cases:**
- Add breathing room around text
- Create button-like appearance
- Highlight important content

### Margin

Margin adds space outside the element (between element and surroundings).

**Quick Apply:**
- Click any preset button (0-48px) to apply to all sides

**Individual Control:**
- Adjust Top, Right, Bottom, Left independently
- Type values directly or use arrow keys
- Range: 0-200px

**Example Use Cases:**
- Separate elements vertically
- Create indentation
- Add spacing between sections

## Examples

### Creating a Button-Style Text

1. Select text: "Click Here"
2. Open spacing menu
3. Set Display: Inline Block
4. Set Padding: 12px (all sides)
5. Add background color (use color picker)
6. Result: Button-like appearance

### Highlighted Quote

1. Select quote text
2. Set Display: Block
3. Set Padding: 16px (all sides)
4. Set Margin: 20px top and bottom
5. Add background color
6. Result: Standalone highlighted quote

### Indented Paragraph

1. Select paragraph text
2. Set Display: Block
3. Set Margin Left: 32px
4. Result: Indented paragraph

### Spaced Heading

1. Select heading text
2. Set Margin Bottom: 24px
3. Result: More space below heading

## Preset Values

The quick preset buttons provide common spacing values:

| Value | Use Case |
|-------|----------|
| 0px | Remove spacing |
| 4px | Minimal spacing |
| 8px | Tight spacing |
| 12px | Comfortable spacing |
| 16px | Standard spacing |
| 20px | Generous spacing |
| 24px | Large spacing |
| 32px | Extra large spacing |
| 40px | Section spacing |
| 48px | Major section spacing |

## Technical Details

### CSS Properties Applied

```css
/* Display */
display: inline | inline-block | block;

/* Padding */
padding-top: Xpx;
padding-right: Xpx;
padding-bottom: Xpx;
padding-left: Xpx;

/* Margin */
margin-top: Xpx;
margin-right: Xpx;
margin-bottom: Xpx;
margin-left: Xpx;
```

### Style Application

Styles are applied as inline CSS:

```html
<span style="display: inline-block; padding: 12px; margin: 8px;">
  Styled text
</span>
```

### Persistence

All spacing values are:
- Saved with editor content
- Preserved when editing
- Rendered correctly in CMSRenderer
- Exported in JSON format

## Rendering

The CMSRenderer automatically displays spacing:

```tsx
import { CMSRenderer } from '@cms/cms-block-editor';

<CMSRenderer content={savedContent} />
// Spacing will be rendered exactly as edited
```

## Best Practices

### Display Mode

1. **Use Inline for text**: Keep text flowing naturally
2. **Use Inline Block for styled elements**: When you need padding/margin on text
3. **Use Block for sections**: For standalone content blocks

### Padding

1. **Consistent values**: Use preset values for consistency
2. **Breathing room**: Add padding to improve readability
3. **Visual hierarchy**: More padding = more importance
4. **Mobile consideration**: Avoid excessive padding on small screens

### Margin

1. **Vertical rhythm**: Use consistent vertical margins
2. **Separation**: Add margin between distinct sections
3. **Alignment**: Use margin for indentation
4. **Collapsing margins**: Remember that vertical margins collapse

## Common Patterns

### Call-to-Action Button

```
Display: Inline Block
Padding: 12px 24px (top/bottom, left/right)
Margin: 16px 0 (top/bottom, left/right)
Background: Brand color
Text Color: White
```

### Info Box

```
Display: Block
Padding: 20px (all sides)
Margin: 24px 0 (top/bottom)
Background: Light blue
Border: 1px solid blue
```

### Pull Quote

```
Display: Block
Padding: 24px 32px
Margin: 32px 0
Font Size: Larger
Font Style: Italic
Border Left: 4px solid
```

### Indented List Item

```
Display: Block
Margin Left: 40px
Padding Left: 16px
Border Left: 2px solid
```

## Keyboard Shortcuts

While in number inputs:
- **Arrow Up**: Increase value by 1
- **Arrow Down**: Decrease value by 1
- **Shift + Arrow**: Increase/decrease by 10
- **Tab**: Move to next input
- **Enter**: Apply and close menu

## Accessibility

The spacing controls maintain accessibility:
- Proper label associations
- Keyboard navigation support
- Screen reader friendly
- Focus indicators
- Semantic HTML

## Browser Support

Works in all modern browsers:
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

## Troubleshooting

### Spacing not applying
- Ensure text is selected
- Check display mode (inline may not accept some spacing)
- Verify the editor is focused
- Try switching to inline-block or block

### Values not persisting
- Make sure `onChange` callback is configured
- Verify content is being saved
- Check that CMSRenderer is using saved content

### Display mode not working
- Some elements may override display
- Check for conflicting CSS
- Verify the element supports the display mode

### Margin not visible
- Check if margins are collapsing
- Verify surrounding elements
- Try adding background color to see boundaries

## Advanced Usage

### Combining with Colors

```tsx
// Create a styled badge
1. Select text
2. Display: Inline Block
3. Padding: 4px 12px
4. Margin: 0 4px
5. Background: Red
6. Text Color: White
7. Border Radius: (via custom CSS)
```

### Responsive Spacing

While the editor doesn't have built-in responsive controls, you can:
1. Use moderate spacing values
2. Test on different screen sizes
3. Adjust based on content needs
4. Consider mobile-first approach

### Custom Spacing Values

For values not in presets:
1. Type directly in input fields
2. Use arrow keys for fine-tuning
3. Values from 0-200px supported
4. Negative margins not supported (for safety)

## Integration Example

```tsx
import { CMSBlockEditor } from '@cms/cms-block-editor';

function MyEditor() {
  const [content, setContent] = useState('');

  return (
    <CMSBlockEditor
      value={content}
      onChange={(state) => setContent(JSON.stringify(state))}
    />
  );
}

// Spacing controls are automatically included
// No additional configuration needed
```

## Performance

The spacing plugin is optimized:
- Lazy rendering (only shown when clicked)
- Efficient style application
- Minimal re-renders
- Small bundle size impact (~3KB)

## Future Enhancements

Potential future features:
- Border controls
- Border radius
- Box shadow
- Width/height controls
- Responsive breakpoints
- Spacing presets/themes
- Copy/paste spacing
