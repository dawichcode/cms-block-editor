# Responsive Rendering Guide

This guide explains how the CMS Block Editor handles responsive rendering for images, layouts, and sections.

## Overview

The editor now properly saves and renders resized dimensions for images and YouTube embeds, while maintaining full responsiveness across all device sizes.

## Image Rendering

### How It Works

1. **During Editing**: When you resize an image using the resize handles, the new dimensions are saved to the ImageNode
2. **During Rendering**: The CMSRenderer displays the image at the saved dimensions
3. **Responsive Behavior**: Images scale down proportionally on smaller screens while maintaining aspect ratio

### Saved Properties

Each image stores:
- `width`: The resized width in pixels
- `height`: The resized height in pixels (maintains aspect ratio)
- `src`: The image URL
- `alt`: Alternative text

### Responsive Breakpoints

**Desktop (> 1024px)**
- Images display at saved dimensions
- Maximum width: 100% of container

**Tablet (768px - 1024px)**
- Images scale proportionally
- Maximum width: 100% of container
- Maintains aspect ratio

**Mobile (< 768px)**
- Images scale to fit screen
- Maximum width: 100% of container
- Maintains aspect ratio
- Padding adjusts for smaller screens

**Small Mobile (< 480px)**
- Further scaling for very small screens
- Optimized padding and margins

## YouTube Embed Rendering

### How It Works

1. **During Editing**: Resize YouTube embeds using 8-point handles
2. **Saved Dimensions**: Width and height are stored in the YouTubeNode
3. **Responsive Rendering**: Embeds maintain 16:9 aspect ratio and scale down on mobile

### Saved Properties

Each YouTube embed stores:
- `width`: The resized width in pixels
- `height`: The resized height in pixels
- `id`: The YouTube video ID

### Responsive Behavior

**Desktop**
- Displays at saved dimensions
- 16:9 aspect ratio maintained

**Tablet & Mobile**
- Scales to fit screen width
- Maintains 16:9 aspect ratio
- Uses CSS aspect-ratio for proper sizing

## Section Layout Rendering

### Flex Layouts

**Desktop**
- Displays as configured (row/column)
- Full flex controls applied

**Tablet (< 1024px)**
- Maintains flex layout
- May adjust gap spacing

**Mobile (< 768px)**
- Row layouts convert to column (stack vertically)
- Column layouts remain as column
- Gap reduces to 16px

### Grid Layouts

**Desktop**
- Displays with configured columns
- Full grid template applied

**Tablet (< 1024px)**
- 4-column grids → 2 columns
- 3-column grids → 2 columns
- 2-column grids → 2 columns

**Mobile (< 768px)**
- All grids → 1 column (stack)
- Gap reduces to 16px

**Small Mobile (< 480px)**
- Single column layout
- Gap reduces to 12px

## Background Images

### Responsive Behavior

**All Devices**
- Background images use `background-size: cover` by default
- Position: center (or as configured)
- Scales appropriately for screen size

**Mobile Optimization**
- Forces `background-size: cover` for consistency
- Forces `background-position: center` for best display
- Gradient overlays remain intact

## Column Layouts

### 2-Column Layout

**Desktop**: Side by side
**Tablet**: Side by side
**Mobile**: Stacked vertically

### 3-Column Layout

**Desktop**: Three columns
**Tablet**: Three columns (may wrap)
**Mobile**: Stacked vertically

### 4-Column Layout

**Desktop**: Four columns
**Tablet**: Two rows of two
**Mobile**: Stacked vertically

### Grid Layouts (2×2, 3×3)

**Desktop**: Full grid
**Tablet**: Adjusted grid
**Mobile**: Single column

## Padding & Spacing

### Section Padding

**Desktop**
- As configured (default: 40px-80px)

**Tablet (< 1024px)**
- Reduced by ~20%
- Example: 60px → 50px

**Mobile (< 768px)**
- Reduced to 40px-50px
- Horizontal: 20px
- Vertical: 40px-50px

**Small Mobile (< 480px)**
- Further reduced to 30px-40px
- Horizontal: 15px
- Vertical: 30px-40px

### Gap Spacing

**Desktop**
- As configured (0-100px)

**Mobile (< 768px)**
- Maximum 16px

**Small Mobile (< 480px)**
- Maximum 12px

## Typography Scaling

### Headings

**Desktop**
- H1: 2em
- H2: 1.5em
- H3: 1.17em

**Mobile (< 768px)**
- H1: 1.75em
- H2: 1.35em
- H3: 1.1em

**Small Mobile (< 480px)**
- H1: 1.5em
- H2: 1.25em
- H3: 1.05em

### Body Text

**Desktop**: 16px
**Tablet**: 15px
**Mobile**: 15px
**Small Mobile**: 14px

## Testing Responsiveness

### In the Editor

1. Resize your browser window
2. Check how sections adapt
3. Verify images scale properly
4. Test on different screen sizes

### In the Renderer

1. View rendered content on different devices
2. Test with browser DevTools device emulation
3. Check actual mobile devices
4. Verify all breakpoints work correctly

## Best Practices

### Images

1. **Use Appropriate Sizes**
   - Don't make images too large (max 1200px width)
   - Consider mobile users
   - Optimize file sizes

2. **Maintain Aspect Ratios**
   - The editor automatically maintains aspect ratio
   - Don't force unusual dimensions

3. **Test on Mobile**
   - Always check how images look on small screens
   - Ensure important content is visible

### Layouts

1. **Design Mobile-First**
   - Consider how content stacks on mobile
   - Ensure readability when stacked

2. **Use Appropriate Columns**
   - 2-3 columns work best
   - 4+ columns may be too many on tablet

3. **Test Flex vs Grid**
   - Flex: Better for simple layouts
   - Grid: Better for complex layouts

### Sections

1. **Padding Considerations**
   - Use moderate padding (40-60px)
   - Too much padding wastes space on mobile

2. **Background Images**
   - Ensure text is readable on all devices
   - Use gradient overlays
   - Test on small screens

3. **Content Length**
   - Keep sections concise
   - Long sections may be overwhelming on mobile

## Troubleshooting

### Images Not Scaling

**Problem**: Images appear too large on mobile

**Solution**:
- Check that max-width: 100% is applied
- Verify container has proper width
- Inspect with DevTools

### Layouts Not Stacking

**Problem**: Flex/grid layouts don't stack on mobile

**Solution**:
- Verify responsive CSS is loaded
- Check media query breakpoints
- Inspect element styles

### Background Images Cut Off

**Problem**: Important parts of background image are hidden

**Solution**:
- Adjust background-position
- Use background-size: contain
- Choose better focal point

### Text Too Small on Mobile

**Problem**: Text is hard to read on small screens

**Solution**:
- Typography scales automatically
- Check if custom font sizes are overriding
- Verify base font size

### Sections Too Cramped

**Problem**: Content feels squeezed on mobile

**Solution**:
- Padding automatically reduces on mobile
- Check if custom padding is too small
- Verify gap spacing

## Browser Support

All responsive features work in:
- ✅ Chrome/Edge (desktop & mobile)
- ✅ Firefox (desktop & mobile)
- ✅ Safari (desktop & mobile)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

### Optimization Tips

1. **Image Optimization**
   - Compress images before upload
   - Use appropriate dimensions
   - Consider WebP format

2. **CSS Efficiency**
   - Responsive styles are optimized
   - Minimal media queries
   - Hardware-accelerated transforms

3. **Mobile Performance**
   - Reduced padding saves space
   - Stacked layouts load faster
   - Optimized for touch devices

## Accessibility

### Responsive Accessibility

1. **Touch Targets**
   - Buttons are larger on touch devices
   - Minimum 44px touch targets

2. **Text Scaling**
   - Respects user font size preferences
   - Scales proportionally

3. **Focus Indicators**
   - Visible on all screen sizes
   - Keyboard navigation works on mobile

4. **Screen Readers**
   - Semantic HTML maintained
   - ARIA labels preserved
   - Content order logical when stacked

## Summary

The CMS Block Editor provides:

✅ Automatic responsive rendering
✅ Saved image dimensions with responsive scaling
✅ Flexible layout adaptation (flex/grid)
✅ Mobile-optimized spacing
✅ Background image responsiveness
✅ Typography scaling
✅ Touch-friendly controls
✅ Accessibility compliance
✅ Cross-browser support

**Your content looks great on all devices!** 📱💻🖥️

---

**Pro Tip**: Always test your content on multiple screen sizes during editing. Use browser DevTools device emulation for quick testing!
