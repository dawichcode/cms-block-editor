# Image Editing Guide

Complete guide to using the advanced image editing features in CMS Block Editor.

## Overview

The image editor provides powerful tools for editing images directly within the editor:

- **Filters**: Brightness, contrast, saturation, blur, grayscale, sepia, hue rotation
- **Presets**: 6 pre-configured filter combinations (Vintage, B&W, Warm, Cool, Dramatic, Soft)
- **Crop**: Adjust image dimensions (coming soon)
- **Real-time Preview**: See changes instantly before applying

## Opening the Image Editor

### Method 1: Click the Edit Button

1. Click on any image in the editor to select it
2. Click the "✏️ Edit" button that appears in the top-right corner
3. The image editor modal will open

### Method 2: Programmatic Access

```typescript
import { OPEN_IMAGE_EDITOR_COMMAND } from 'cms-block-editor';

// Dispatch the command with node key and image source
editor.dispatchCommand(OPEN_IMAGE_EDITOR_COMMAND, {
  nodeKey: 'image-node-key',
  src: 'image-url'
});
```

## Using Filters

### Individual Filters

Adjust each filter using the sliders:

**Brightness** (0-200%)
- Default: 100%
- Lower values darken the image
- Higher values brighten the image

**Contrast** (0-200%)
- Default: 100%
- Lower values reduce contrast
- Higher values increase contrast

**Saturation** (0-200%)
- Default: 100%
- 0% = completely desaturated (grayscale)
- Higher values increase color intensity

**Blur** (0-10px)
- Default: 0px
- Adds gaussian blur effect
- Useful for soft focus or background blur

**Grayscale** (0-100%)
- Default: 0%
- 100% = full black and white
- Partial values create muted colors

**Sepia** (0-100%)
- Default: 0%
- Creates vintage, warm-toned effect
- 100% = full sepia tone

**Hue Rotate** (0-360°)
- Default: 0°
- Rotates colors around the color wheel
- 180° inverts warm/cool tones

### Filter Presets

Quick-apply professional filter combinations:

**Vintage**
- Brightness: 110%
- Contrast: 90%
- Saturation: 80%
- Sepia: 40%
- Creates a nostalgic, aged photo look

**B&W (Black & White)**
- Contrast: 110%
- Grayscale: 100%
- Classic black and white photography

**Warm**
- Brightness: 105%
- Saturation: 110%
- Sepia: 20%
- Hue Rotate: 10°
- Adds warmth and golden tones

**Cool**
- Saturation: 110%
- Hue Rotate: 180°
- Creates cool, blue-toned images

**Dramatic**
- Brightness: 90%
- Contrast: 130%
- Saturation: 120%
- High-impact, bold look

**Soft**
- Brightness: 110%
- Contrast: 85%
- Saturation: 90%
- Blur: 1px
- Gentle, dreamy effect

## Workflow

### Basic Editing Workflow

1. **Select Image**: Click on an image in the editor
2. **Open Editor**: Click the "✏️ Edit" button
3. **Try Presets**: Click preset buttons to preview different looks
4. **Fine-tune**: Adjust individual sliders for custom effects
5. **Preview**: See changes in real-time
6. **Apply or Cancel**: 
   - Click "Apply" to save changes
   - Click "Cancel" to discard changes
   - Click "Reset" to restore default values

### Tips for Best Results

**Portrait Photos**
- Use "Soft" preset for flattering skin tones
- Adjust brightness +5-10% for better lighting
- Slight blur (1-2px) can soften imperfections

**Landscape Photos**
- Use "Dramatic" preset for impact
- Increase saturation for vibrant colors
- Adjust contrast for depth

**Product Photos**
- Keep filters minimal
- Adjust brightness for consistent lighting
- Use slight contrast boost for definition

**Vintage Look**
- Start with "Vintage" preset
- Add more sepia for stronger effect
- Reduce saturation for faded look

**Black & White**
- Use "B&W" preset as starting point
- Adjust contrast for mood (high = dramatic, low = soft)
- Slight sepia (10-20%) adds warmth to B&W

## Technical Details

### How It Works

1. **Filter Application**: CSS filters are applied in real-time for preview
2. **Canvas Rendering**: When you click "Apply", the image is rendered to a canvas with filters
3. **Data URL**: The filtered image is converted to a data URL
4. **Node Update**: The image node is updated with the new filtered image

### Filter Order

Filters are applied in this order:
1. Brightness
2. Contrast
3. Saturation
4. Blur
5. Grayscale
6. Sepia
7. Hue Rotate

This order ensures optimal results and matches CSS filter behavior.

### Performance

- **Real-time Preview**: Uses CSS filters (very fast)
- **Apply Operation**: Canvas rendering (takes 1-2 seconds for large images)
- **Memory**: Filtered images are stored as data URLs
- **Recommendation**: For production, consider uploading filtered images to a server

## Advanced Usage

### Custom Filter Combinations

Create your own signature looks:

**High-Key Portrait**
```
Brightness: 120%
Contrast: 85%
Saturation: 90%
```

**Moody Landscape**
```
Brightness: 80%
Contrast: 140%
Saturation: 110%
Hue Rotate: 10°
```

**Faded Film**
```
Brightness: 105%
Contrast: 90%
Saturation: 70%
Sepia: 30%
```

**Neon Pop**
```
Brightness: 110%
Contrast: 120%
Saturation: 150%
Hue Rotate: 45°
```

### Programmatic Filter Application

```typescript
// Access the editor state
const editorState = editor.getEditorState();

// Find image nodes
editorState.read(() => {
  const nodes = $getRoot().getAllTextNodes();
  // Apply filters programmatically
});
```

## Keyboard Shortcuts

Currently, the image editor doesn't have keyboard shortcuts, but you can:

- **Esc**: Close modal (coming soon)
- **Enter**: Apply changes (coming soon)
- **Cmd/Ctrl + Z**: Undo (coming soon)

## Limitations

### Current Limitations

1. **Crop Tool**: Not yet implemented (coming soon)
2. **Undo/Redo**: Within editor only (not for individual filter changes)
3. **Batch Editing**: One image at a time
4. **File Size**: Large images may take longer to process
5. **Cross-Origin**: Images from external domains may have CORS restrictions

### Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile: Full support (touch-friendly)

## Troubleshooting

### Image Won't Edit

**Problem**: Edit button doesn't appear
- **Solution**: Make sure the image is selected (click on it)

**Problem**: Modal doesn't open
- **Solution**: Check browser console for errors

### Filters Not Applying

**Problem**: Changes don't save
- **Solution**: Click "Apply" button before closing

**Problem**: Image looks different after applying
- **Solution**: Some browsers may render filters slightly differently

### Performance Issues

**Problem**: Editor is slow with large images
- **Solution**: Resize images before uploading (recommended max: 2000px width)

**Problem**: Browser freezes when applying filters
- **Solution**: Reduce image size or use fewer filters

### CORS Errors

**Problem**: "Tainted canvas" error
- **Solution**: Images must be from the same domain or have CORS headers enabled
- **Workaround**: Use the `onImageAdded` prop to upload images to your server first

## Best Practices

### Image Preparation

1. **Optimize Before Upload**: Compress images to reasonable sizes
2. **Use Appropriate Formats**: JPEG for photos, PNG for graphics
3. **Consider Dimensions**: 1200-2000px width is usually sufficient

### Filter Usage

1. **Less is More**: Subtle adjustments often look better
2. **Consistency**: Use similar filters across related images
3. **Test on Different Screens**: Colors may appear different on various devices
4. **Save Originals**: Keep unedited versions for future adjustments

### Performance

1. **Batch Operations**: Edit multiple images before saving
2. **Server-Side Processing**: For production, consider server-side image processing
3. **Lazy Loading**: Load images only when needed
4. **Caching**: Cache filtered images to avoid re-processing

## Future Enhancements

Planned features for future releases:

- [ ] Interactive crop tool with aspect ratio presets
- [ ] Rotation and flip controls
- [ ] Advanced adjustments (exposure, highlights, shadows)
- [ ] Custom preset saving
- [ ] Batch editing for multiple images
- [ ] Undo/redo within editor
- [ ] Keyboard shortcuts
- [ ] Touch gestures for mobile
- [ ] AI-powered auto-enhance
- [ ] Background removal
- [ ] Object selection and masking

## Examples

### Example 1: Professional Portrait

```typescript
<CMSBlockEditor 
  value={content}
  onChange={setContent}
/>

// User workflow:
// 1. Upload portrait photo
// 2. Click Edit button
// 3. Apply "Soft" preset
// 4. Adjust brightness to 115%
// 5. Add slight blur (1px)
// 6. Click Apply
```

### Example 2: Vintage Blog Post

```typescript
// Apply vintage look to all images
const applyVintageToImages = () => {
  editor.update(() => {
    // Find all image nodes
    // Apply vintage filters
    // Save changes
  });
};
```

### Example 3: Product Showcase

```typescript
// Consistent product photo editing
const productFilters = {
  brightness: 110,
  contrast: 105,
  saturation: 100,
  // Other filters at default
};
```

## Support

For issues or questions about image editing:

- Check this guide first
- Review browser console for errors
- Test with different images
- Report bugs on GitHub Issues

## Related Guides

- [Image Upload Guide](./IMAGE-GUIDE.md)
- [Background Image Guide](./BACKGROUND-IMAGE-GUIDE.md)
- [Responsive Guide](./RESPONSIVE-GUIDE.md)

---

**Happy Editing!** 🎨
