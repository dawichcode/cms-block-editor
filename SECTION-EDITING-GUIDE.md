# Section Editing Guide

The CMS Block Editor now includes comprehensive section editing controls that give you full control over layout, styling, and positioning.

## Features

- ✅ Background color picker with 30 preset colors
- ✅ Background images with URL support
- ✅ Image sizing and positioning controls
- ✅ Gradient overlays (6 presets + custom)
- ✅ Opacity control (0-100%)
- ✅ Text alignment (left, center, right, justify)
- ✅ Layout types (Block, Flex, Grid)
- ✅ Flexbox controls (direction, wrap, align, justify)
- ✅ CSS Grid controls (columns, rows)
- ✅ Gap/spacing controls
- ✅ Padding and margin controls
- ✅ Real-time visual updates
- ✅ Preset quick-apply buttons

## How to Use

### Accessing Section Editor

1. Click inside any section you've created
2. Look for the **"Section"** button in the toolbar (purple with settings icon)
3. Click it to open the section editor panel

### Background Color

Choose from 30 preset colors or use the custom color picker:

- Click any preset color swatch for instant application
- Use the color input at the bottom for custom colors
- Active color is highlighted with a blue border

**Preset Colors Include:**
- Grayscale (white to black)
- Brand colors (purple, blue, pink, green, etc.)
- Vibrant colors for CTAs and highlights

### Background Image

Add background images to sections with full control:

**Image URL:**
- Enter any publicly accessible image URL
- Supports direct URLs, CDN URLs, Unsplash, etc.

**Image Controls:**
- **Size**: Cover, Contain, Auto, Stretch
- **Position**: 9 preset positions (center, top, bottom, corners)
- **Repeat**: No repeat, repeat, repeat-x, repeat-y

**Gradient Overlays:**
- 6 preset gradients (dark, purple, sunset, green, etc.)
- Custom gradient support (CSS linear/radial gradients)
- Perfect for improving text readability

**Opacity:**
- Slider control from 0-100%
- Preset buttons (25%, 50%, 75%, 100%)
- Affects entire section

See [BACKGROUND-IMAGE-GUIDE.md](./BACKGROUND-IMAGE-GUIDE.md) for complete details.

### Text Alignment

Control how text is aligned within the section:

- **Left**: Default alignment
- **Center**: Center all text
- **Right**: Right-align text
- **Justify**: Stretch text to fill width

**Best for:**
- Center: Hero sections, CTAs, testimonials
- Left: Content sections, articles
- Right: Quotes, captions
- Justify: Long-form content

### Layout Types

Choose how content is displayed within the section:

#### Block Layout (Default)
- Standard document flow
- Elements stack vertically
- No special positioning

**Use for:** Simple content, text-heavy sections

#### Flex Layout
- Flexible box layout
- Control direction, alignment, and distribution
- Responsive and powerful

**Use for:** Navigation bars, card layouts, button groups

#### Grid Layout
- Two-dimensional grid system
- Define columns and rows
- Precise control over placement

**Use for:** Image galleries, pricing tables, feature grids

## Flex Layout Controls

When you select "Flex" layout, additional controls appear:

### Flex Direction
- **Row**: Items flow left to right (→)
- **Column**: Items stack top to bottom (↓)
- **Row Reverse**: Items flow right to left (←)
- **Column Reverse**: Items stack bottom to top (↑)

### Flex Wrap
- **No Wrap**: Items stay on one line
- **Wrap**: Items wrap to next line
- **Wrap Reverse**: Items wrap in reverse order

### Align Items
Controls cross-axis alignment:
- **Start**: Align to start of container
- **Center**: Center items
- **End**: Align to end of container
- **Stretch**: Stretch to fill container

### Justify Content
Controls main-axis distribution:
- **Start**: Pack items at start
- **Center**: Center items
- **End**: Pack items at end
- **Space Between**: Even spacing, no edge gaps
- **Space Around**: Even spacing with edge gaps
- **Space Evenly**: Equal spacing everywhere

## Grid Layout Controls

When you select "Grid" layout, grid-specific controls appear:

### Grid Columns
Define the column structure:

**Preset Options:**
- 1 Col: `1fr` (single column)
- 2 Cols: `repeat(2, 1fr)` (two equal columns)
- 3 Cols: `repeat(3, 1fr)` (three equal columns)
- 4 Cols: `repeat(4, 1fr)` (four equal columns)

**Custom Values:**
- `1fr 2fr`: Two columns, second is twice as wide
- `200px 1fr`: Fixed 200px column + flexible column
- `repeat(auto-fit, minmax(250px, 1fr))`: Responsive grid

### Grid Rows
Define the row structure:

**Common Values:**
- `auto`: Automatic row height
- `repeat(2, 200px)`: Two 200px rows
- `100px auto 100px`: Fixed header/footer, flexible content

## Gap Control

Available for both Flex and Grid layouts:

- **Slider**: Drag to adjust gap from 0-100px
- **Preset Buttons**: Quick apply 0, 8, 16, 24, or 32px
- **Real-time Preview**: See changes immediately

**Use Cases:**
- 0px: No spacing (tight layouts)
- 8px: Minimal spacing
- 16px: Standard spacing
- 24px: Generous spacing
- 32px+: Large spacing for emphasis

## Padding Control

Add internal spacing within the section:

**Preset Options:**
- 0px: No padding
- 20px: Minimal padding
- 40px: Standard padding (default)
- 60px: Generous padding
- 80px: Large padding

**Custom Values:**
- `40px`: All sides equal
- `40px 20px`: Vertical | Horizontal
- `40px 20px 60px`: Top | Horizontal | Bottom
- `40px 20px 60px 80px`: Top | Right | Bottom | Left

## Margin Control

Add external spacing around the section:

**Preset Options:**
- 0px: No margin
- 20px V: 20px top and bottom
- 40px V: 40px top and bottom
- Center: `0 auto` (horizontally center)

**Custom Values:**
- `20px 0`: Vertical spacing only
- `0 auto`: Center horizontally
- `40px auto`: Vertical spacing + horizontal centering

## Common Use Cases

### Hero Section - Centered Content with Image

```
Background Image: https://images.unsplash.com/photo-...
Image Size: Cover
Image Position: Center
Gradient Overlay: Dark Gradient
Layout: Block
Text Align: Center
Padding: 100px 40px
Text Color: White
```

### Feature Grid - 3 Columns

```
Layout: Grid
Grid Columns: repeat(3, 1fr)
Gap: 24px
Padding: 60px 40px
Background: #f8f9fa
```

### Horizontal Button Group

```
Layout: Flex
Flex Direction: Row
Justify Content: Center
Gap: 16px
Padding: 20px
```

### Pricing Cards - Flex

```
Layout: Flex
Flex Direction: Row
Flex Wrap: Wrap
Justify Content: Space Between
Gap: 24px
Padding: 60px 40px
```

### Testimonial - Centered

```
Layout: Block
Text Align: Center
Padding: 60px 40px
Margin: 40px 0
Background: #f8f9fa
```

### Image Gallery - Grid

```
Layout: Grid
Grid Columns: repeat(auto-fit, minmax(250px, 1fr))
Gap: 16px
Padding: 40px
```

### Sidebar Layout - Flex

```
Layout: Flex
Flex Direction: Row
Gap: 32px
Padding: 40px
```

### Stacked Cards - Flex Column

```
Layout: Flex
Flex Direction: Column
Gap: 20px
Padding: 40px
```

## Tips & Best Practices

### Layout Selection

1. **Use Block for:**
   - Simple text content
   - Blog posts
   - Articles
   - Default sections

2. **Use Flex for:**
   - Navigation bars
   - Button groups
   - Card layouts
   - Horizontal/vertical arrangements

3. **Use Grid for:**
   - Image galleries
   - Pricing tables
   - Feature grids
   - Complex layouts

### Spacing

1. **Consistent Padding:**
   - Use 40px or 60px for most sections
   - Use 80px for hero sections
   - Use 20px for compact sections

2. **Vertical Rhythm:**
   - Add 40px vertical margin between sections
   - Use consistent gap values (16px or 24px)

3. **Responsive Considerations:**
   - Larger padding on desktop
   - Reduce padding on mobile
   - Use flexible gap values

### Colors

1. **Contrast:**
   - Ensure text is readable on background
   - Use light text on dark backgrounds
   - Use dark text on light backgrounds

2. **Brand Consistency:**
   - Stick to 2-3 main colors
   - Use neutral backgrounds for content
   - Use vibrant colors for CTAs

3. **Visual Hierarchy:**
   - Different backgrounds for different sections
   - Alternate colors for visual interest
   - Use white/light gray for content sections

### Alignment

1. **Center Alignment:**
   - Hero sections
   - CTAs
   - Testimonials
   - Short content

2. **Left Alignment:**
   - Long-form content
   - Articles
   - Lists
   - Default for readability

3. **Right Alignment:**
   - Quotes
   - Captions
   - Special emphasis

## Keyboard Shortcuts

While editing sections:
- **Click inside section**: Activate section editor button
- **Esc**: Close section editor panel
- **Tab**: Navigate between controls
- **Enter**: Apply changes (in inputs)

## Advanced Techniques

### Responsive Grid

```
Grid Columns: repeat(auto-fit, minmax(250px, 1fr))
```
This creates a responsive grid that automatically adjusts columns based on available space.

### Centered Container

```
Layout: Block
Margin: 0 auto
Padding: 40px
Max Width: (set via custom CSS)
```

### Sticky Header

```
Layout: Flex
Flex Direction: Row
Justify Content: Space Between
Align Items: Center
Padding: 20px 40px
Position: (set via custom CSS)
```

### Full-Width Hero

```
Layout: Block
Text Align: Center
Padding: 100px 40px
Background: Linear gradient (via color picker)
```

### Card Grid with Hover

```
Layout: Grid
Grid Columns: repeat(3, 1fr)
Gap: 24px
Padding: 60px 40px
```

## Troubleshooting

### Layout not applying
- Ensure you've selected a layout type
- Check that content supports the layout
- Try refreshing the editor

### Flex items not aligning
- Check flex direction is correct
- Verify align-items and justify-content settings
- Ensure flex wrap is set appropriately

### Grid not displaying correctly
- Verify grid-template-columns syntax
- Check that you have enough content items
- Try using preset column options first

### Colors not showing
- Ensure background color is selected
- Check contrast with text color
- Verify the color value is valid

### Spacing not visible
- Check if margin is collapsing with adjacent elements
- Verify padding values are applied
- Inspect element in browser DevTools

## Browser Support

All section editing features work in modern browsers:
- ✅ Chrome/Edge: Full support
- ✅ Firefox: Full support
- ✅ Safari: Full support
- ✅ Mobile browsers: Full support

## Performance

Section editing is optimized for performance:
- Real-time updates without lag
- Efficient DOM manipulation
- Minimal re-renders
- Small bundle size impact (~5KB)

## Export & Rendering

All section properties are:
- ✅ Saved with editor content
- ✅ Preserved in JSON export
- ✅ Rendered correctly in CMSRenderer
- ✅ Exported to HTML with inline styles

## Examples

### Complete Landing Page Layout

```
Section 1 - Hero:
  Layout: Block
  Text Align: Center
  Padding: 100px 40px
  Background: #667eea

Section 2 - Features:
  Layout: Grid
  Grid Columns: repeat(3, 1fr)
  Gap: 24px
  Padding: 60px 40px
  Background: #ffffff

Section 3 - CTA:
  Layout: Flex
  Flex Direction: Column
  Align Items: Center
  Gap: 20px
  Padding: 80px 40px
  Background: #f8f9fa

Section 4 - Footer:
  Layout: Flex
  Flex Direction: Row
  Justify Content: Space Between
  Padding: 40px
  Background: #212529
```

---

## Summary

The Section Editor provides:

- ✅ Complete layout control (Block, Flex, Grid)
- ✅ Visual styling (colors, alignment)
- ✅ Spacing management (padding, margin, gap)
- ✅ Real-time preview
- ✅ Preset quick-apply options
- ✅ Professional results

**Perfect for:** Creating professional, responsive layouts without writing CSS!

---

**Pro Tip:** Start with a preset layout type, then fine-tune with spacing and colors. Use the preset buttons for quick, consistent styling! 🎨
