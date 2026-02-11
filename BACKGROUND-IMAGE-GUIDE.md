# Background Image Guide

The CMS Block Editor now supports full background image control with gradient overlays, positioning, sizing, and opacity controls.

## Features

- ✅ Background image URL support
- ✅ Image sizing (cover, contain, auto, stretch)
- ✅ Image positioning (9 preset positions)
- ✅ Image repeat options
- ✅ Gradient overlay presets
- ✅ Custom gradient overlays
- ✅ Opacity control (0-100%)
- ✅ Real-time preview
- ✅ Easy removal

## How to Use

### Adding a Background Image

1. Click inside any section
2. Click the **"Section"** button in the toolbar
3. Find the **"Background Image"** field
4. Enter an image URL
5. The image will appear immediately

**Supported URLs:**
- Direct image URLs: `https://example.com/image.jpg`
- CDN URLs: `https://cdn.example.com/photo.png`
- Unsplash: `https://images.unsplash.com/photo-...`
- Any publicly accessible image URL

### Image Sizing

Control how the image fills the section:

#### Cover (Default)
- Image covers entire section
- Maintains aspect ratio
- May crop edges
- **Best for:** Hero sections, full-width backgrounds

#### Contain
- Entire image visible
- Maintains aspect ratio
- May show empty space
- **Best for:** Logos, illustrations, important images

#### Auto
- Image displays at natural size
- No scaling
- **Best for:** Patterns, textures, small images

#### Stretch
- Image stretches to fill section
- May distort aspect ratio
- **Best for:** Specific design needs

### Image Positioning

Choose where the image is positioned within the section:

**Preset Positions:**
- **Center** (default): Centered horizontally and vertically
- **Top**: Aligned to top edge
- **Bottom**: Aligned to bottom edge
- **Left**: Aligned to left edge
- **Right**: Aligned to right edge
- **Top Left**: Upper left corner
- **Top Right**: Upper right corner
- **Bottom Left**: Lower left corner
- **Bottom Right**: Lower right corner

**Use Cases:**
- Center: Most backgrounds
- Top: Skylines, headers
- Bottom: Ground, footers
- Corners: Decorative elements

### Image Repeat

Control if/how the image repeats:

#### No Repeat (Default)
- Image appears once
- **Best for:** Photos, hero images

#### Repeat
- Image tiles horizontally and vertically
- **Best for:** Patterns, textures

#### Repeat X
- Image tiles horizontally only
- **Best for:** Horizontal patterns

#### Repeat Y
- Image tiles vertically only
- **Best for:** Vertical patterns

## Gradient Overlays

Add gradient overlays on top of background images for better text readability and visual effects.

### Preset Gradients

Click any preset to apply instantly:

#### None
- No overlay
- Pure image background
- **Use when:** Image is already dark/light enough

#### Dark Gradient
- `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7))`
- Light to dark from top to bottom
- **Use for:** Hero sections with white text

#### Dark Overlay
- `rgba(0,0,0,0.5)`
- Uniform 50% black overlay
- **Use for:** Consistent darkening

#### Purple Gradient
- Purple to violet gradient
- Brand-colored overlay
- **Use for:** Branded sections

#### Sunset Gradient
- Pink to yellow gradient
- Warm, vibrant overlay
- **Use for:** CTAs, featured content

#### Green Gradient
- Green to cyan gradient
- Fresh, modern overlay
- **Use for:** Nature, eco themes

### Custom Gradients

Enter custom CSS gradients for complete control:

**Examples:**

```css
/* Top to bottom */
linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.9))

/* Left to right */
linear-gradient(to right, rgba(0,0,0,0.7), transparent)

/* Diagonal */
linear-gradient(135deg, rgba(102,126,234,0.8), rgba(118,75,162,0.8))

/* Multiple stops */
linear-gradient(
  rgba(0,0,0,0) 0%,
  rgba(0,0,0,0.5) 50%,
  rgba(0,0,0,0.9) 100%
)

/* Radial gradient */
radial-gradient(circle, rgba(0,0,0,0.3), rgba(0,0,0,0.8))
```

## Opacity Control

Adjust the overall opacity of the entire section (including background and content).

**Slider:** Drag from 0% (transparent) to 100% (opaque)

**Preset Buttons:**
- 25%: Very transparent
- 50%: Half transparent
- 75%: Mostly opaque
- 100%: Fully opaque (default)

**Use Cases:**
- 100%: Normal sections
- 75-90%: Subtle transparency
- 50%: Layered effects
- 25%: Watermark-like sections

**Note:** Opacity affects the entire section. For background-only transparency, use gradient overlays with rgba colors.

## Common Use Cases

### Hero Section with Image

```
Background Image: https://images.unsplash.com/photo-...
Size: Cover
Position: Center
Gradient Overlay: Dark Gradient
Text Color: White
Text Align: Center
Padding: 100px 40px
```

### Testimonial with Subtle Background

```
Background Image: https://example.com/pattern.png
Size: Contain
Position: Center
Repeat: Repeat
Opacity: 25%
Gradient Overlay: None
```

### CTA Section with Brand Gradient

```
Background Image: https://example.com/texture.jpg
Size: Cover
Position: Center
Gradient Overlay: Purple Gradient
Text Color: White
Padding: 80px 40px
```

### Feature Section with Top Image

```
Background Image: https://example.com/header.jpg
Size: Cover
Position: Top
Gradient Overlay: linear-gradient(transparent, white)
```

### Footer with Dark Image

```
Background Image: https://example.com/footer-bg.jpg
Size: Cover
Position: Bottom
Gradient Overlay: Dark Overlay
Text Color: White
```

## Best Practices

### Image Selection

1. **High Resolution:**
   - Use images at least 1920px wide
   - Retina displays need 2x resolution
   - Compress images for web

2. **Aspect Ratio:**
   - 16:9 for hero sections
   - Square for centered sections
   - Wide for full-width sections

3. **File Size:**
   - Optimize images (use tools like TinyPNG)
   - Target < 500KB per image
   - Use WebP format when possible

4. **Content:**
   - Avoid busy images with text
   - Use images with negative space
   - Consider focal points

### Gradient Overlays

1. **Text Readability:**
   - Always use overlays with text
   - Dark overlay for light text
   - Light overlay for dark text
   - Ensure WCAG contrast ratios

2. **Consistency:**
   - Use same gradient style across site
   - Match brand colors
   - Keep opacity consistent

3. **Subtlety:**
   - Don't over-darken images
   - Preserve image details
   - Balance overlay and image

### Performance

1. **Lazy Loading:**
   - Use lazy loading for below-fold images
   - Implement progressive loading
   - Consider placeholder images

2. **CDN:**
   - Host images on CDN
   - Use image optimization services
   - Enable caching

3. **Responsive:**
   - Provide different images for mobile
   - Use srcset for responsive images
   - Consider mobile data usage

### Accessibility

1. **Contrast:**
   - Ensure text is readable
   - Use sufficient gradient opacity
   - Test with contrast checkers

2. **Alternative Content:**
   - Don't rely solely on images
   - Provide text alternatives
   - Ensure content is accessible without images

3. **Performance:**
   - Don't block content with images
   - Provide fallback colors
   - Test with slow connections

## Advanced Techniques

### Parallax Effect

While not built-in, you can achieve parallax with custom CSS:

```css
.cms-section {
  background-attachment: fixed;
}
```

### Multiple Backgrounds

Use custom gradient with multiple images:

```
Background Image: url(image1.jpg)
Gradient Overlay: url(image2.png), linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))
```

### Animated Gradients

Use CSS animations for gradient effects:

```css
.cms-section {
  animation: gradient-shift 10s ease infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

### Blend Modes

Combine with CSS blend modes:

```css
.cms-section {
  background-blend-mode: multiply;
}
```

## Troubleshooting

### Image not displaying
- Verify URL is publicly accessible
- Check for CORS issues
- Ensure URL is correct
- Try a different image

### Image looks stretched
- Change size to "Cover" or "Contain"
- Check image aspect ratio
- Verify image resolution

### Text not readable
- Add gradient overlay
- Increase overlay opacity
- Use darker gradient
- Change text color

### Image loads slowly
- Optimize image file size
- Use CDN
- Compress image
- Consider smaller dimensions

### Gradient not showing
- Ensure background image is set
- Check gradient syntax
- Verify rgba values
- Try preset gradients first

### Opacity affecting text
- Use gradient overlay instead
- Apply opacity to background only
- Adjust gradient rgba values
- Use semi-transparent colors

## Image Sources

### Free Stock Photos

- **Unsplash**: https://unsplash.com
- **Pexels**: https://pexels.com
- **Pixabay**: https://pixabay.com
- **Burst**: https://burst.shopify.com

### Patterns & Textures

- **Subtle Patterns**: https://subtlepatterns.com
- **Hero Patterns**: https://heropatterns.com
- **Pattern Library**: https://thepatternlibrary.com

### Gradients

- **UI Gradients**: https://uigradients.com
- **Gradient Hunt**: https://gradienthunt.com
- **WebGradients**: https://webgradients.com

## Examples

### Modern Hero Section

```
Background Image: https://images.unsplash.com/photo-1557683316-973673baf926
Size: Cover
Position: Center
Repeat: No Repeat
Gradient Overlay: linear-gradient(rgba(102,126,234,0.7), rgba(118,75,162,0.7))
Opacity: 100%
Text Align: Center
Text Color: White
Padding: 120px 40px
```

### Subtle Pattern Background

```
Background Image: https://subtlepatterns.com/patterns/geometry.png
Size: Auto
Position: Center
Repeat: Repeat
Gradient Overlay: None
Opacity: 50%
Background Color: #f8f9fa
```

### Testimonial with Image

```
Background Image: https://images.unsplash.com/photo-1522071820081-009f0129c71c
Size: Cover
Position: Center
Gradient Overlay: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6))
Text Color: White
Text Align: Center
Padding: 80px 40px
```

### Feature Section with Top Fade

```
Background Image: https://images.unsplash.com/photo-1451187580459-43490279c0fa
Size: Cover
Position: Top
Gradient Overlay: linear-gradient(transparent 0%, white 70%)
Padding: 100px 40px 60px
```

## Browser Support

All background features work in modern browsers:
- ✅ Chrome/Edge: Full support
- ✅ Firefox: Full support
- ✅ Safari: Full support
- ✅ Mobile browsers: Full support

## Performance Impact

Background images add minimal overhead:
- Image loading: Depends on file size
- Gradient rendering: Negligible
- Opacity: Hardware accelerated
- Overall: ~1-2KB code + image size

## Export & Rendering

Background images are:
- ✅ Saved with editor content
- ✅ Preserved in JSON export
- ✅ Rendered correctly in CMSRenderer
- ✅ Exported to HTML with inline styles
- ✅ Compatible with all export formats

---

## Summary

Background image features provide:

- ✅ Full image control (URL, size, position, repeat)
- ✅ Gradient overlays (presets + custom)
- ✅ Opacity control
- ✅ Real-time preview
- ✅ Easy management
- ✅ Professional results

**Perfect for:** Hero sections, testimonials, CTAs, and any section that needs visual impact!

---

**Pro Tip:** Start with a high-quality image, add a gradient overlay for text readability, and adjust opacity for the perfect balance! 🎨
