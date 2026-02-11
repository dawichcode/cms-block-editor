# Color Picker Guide

The CMS Block Editor includes a comprehensive color picker for text and background colors.

## Features

- Text color selection
- Background color (highlight) selection
- 80 preset colors organized in a grid
- Custom color picker for any color
- Visual color indicator on toolbar buttons
- Remove color option
- Real-time preview of current colors

## How to Use

### Applying Text Color

1. Select the text you want to color
2. Click the text color button (A icon with color bar) in the toolbar
3. Choose from preset colors or use the custom color picker
4. The selected text will be colored immediately

### Applying Background Color

1. Select the text you want to highlight
2. Click the background color button (paint bucket icon) in the toolbar
3. Choose from preset colors or use the custom color picker
4. The selected text will have a colored background

### Removing Colors

- Click the "Remove" button in the color picker menu to remove the color
- This resets to default (black text or transparent background)

## Preset Colors

The color picker includes 80 carefully selected colors:

- **Grayscale**: Black to white (10 shades)
- **Primary Colors**: Red, orange, yellow, green, cyan, blue, purple, magenta
- **Tints**: Light versions of primary colors
- **Shades**: Dark versions of primary colors

## Custom Colors

Use the custom color input at the bottom of the picker to:
- Select any RGB color
- Enter hex color codes
- Use your system's color picker

## Color Indicator

The toolbar buttons show a small colored bar indicating:
- Current text color (for text color button)
- Current background color (for background color button)
- Updates automatically based on cursor position

## Keyboard Shortcuts

While the color picker is open:
- **Click outside**: Close the picker
- **Escape**: Close the picker (browser default)

## Examples

### Colored Headings

```tsx
// Select heading text and apply color
"Welcome to My Blog" → Apply blue color
```

### Highlighted Text

```tsx
// Select important text and apply background color
"Important Note" → Apply yellow background
```

### Colored Links

```tsx
// Select link text and apply custom color
"Click Here" → Apply custom brand color
```

## Technical Details

### Color Format

Colors are stored as CSS color values:
- Hex: `#ff0000`
- RGB: `rgb(255, 0, 0)`
- Named: `red`

### Style Application

Colors are applied using inline styles:
```html
<span style="color: #ff0000;">Colored text</span>
<span style="background-color: #ffff00;">Highlighted text</span>
```

### Persistence

Colors are saved with the editor content and will be:
- Preserved when editing
- Rendered correctly in CMSRenderer
- Exported in JSON format

## Styling in Renderer

The CMSRenderer automatically displays colored text:

```tsx
import { CMSRenderer } from '@cms/cms-block-editor';

<CMSRenderer content={savedContent} />
// Colors will be rendered exactly as edited
```

## Customization

### Override Preset Colors

You can customize the preset colors by modifying `PRESET_COLORS` in `ColorPickerPlugin.tsx`:

```tsx
const PRESET_COLORS = [
  '#your-color-1',
  '#your-color-2',
  // ... add your brand colors
];
```

### Custom Styling

Override the color picker styles:

```css
.cms-color-picker-menu {
  /* Customize picker appearance */
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.cms-color-swatch {
  /* Customize color swatches */
  width: 28px;
  height: 28px;
}
```

## Best Practices

1. **Accessibility**: Ensure sufficient contrast between text and background colors
2. **Consistency**: Use a limited color palette for professional appearance
3. **Readability**: Avoid very bright backgrounds with light text
4. **Brand Colors**: Add your brand colors to the preset palette
5. **Semantic Use**: Use colors to convey meaning (e.g., red for warnings)

## Accessibility Considerations

- Maintain WCAG AA contrast ratio (4.5:1 for normal text)
- Don't rely solely on color to convey information
- Test with color blindness simulators
- Provide alternative indicators (icons, text)

## Browser Support

The color picker works in all modern browsers:
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support with native color pickers

## Troubleshooting

### Colors not applying
- Ensure text is selected before clicking color button
- Check that the editor is focused
- Verify the color picker menu is visible

### Colors not persisting
- Make sure `onChange` callback is properly configured
- Verify content is being saved correctly
- Check that CMSRenderer is using the saved content

### Custom color picker not working
- Some browsers may have different color picker UIs
- The hex value input always works as fallback
- Mobile devices use native color pickers

## API Reference

### ColorPickerPlugin

The plugin is automatically included in the toolbar and requires no configuration.

### Color Application

Colors are applied using Lexical's `$patchStyleText` function:

```tsx
$patchStyleText(selection, { 
  color: '#ff0000' 
});

$patchStyleText(selection, { 
  'background-color': '#ffff00' 
});
```

### Removing Colors

```tsx
$patchStyleText(selection, { 
  color: null 
});

$patchStyleText(selection, { 
  'background-color': null 
});
```

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

// Colors are automatically included in the toolbar
// No additional configuration needed
```

## Performance

The color picker is optimized for performance:
- Lazy rendering (only shown when clicked)
- Efficient color application
- Minimal re-renders
- Small bundle size impact (~2KB)

## Future Enhancements

Potential future features:
- Color history/recent colors
- Color palettes/themes
- Gradient support
- Opacity/transparency control
- Color picker presets per user
