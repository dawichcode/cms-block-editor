# Changelog

All notable changes to this project will be documented in this file.

## [1.0.9] - 2024-02-20

### Added
- Comprehensive theme system with 10 preset themes
- ThemeProvider component for theme management
- ThemeSwitcher UI component
- Light and dark mode support with auto-detection
- Custom theme creation API
- CSS variables for all theme values
- Theme persistence with localStorage
- Preset themes: Light, Dark, Ocean, Forest, Sunset, Rose, Midnight, Dracula, Monokai, Minimal
- useTheme hook for programmatic theme control
- THEME-GUIDE.md comprehensive documentation

### Changed
- All components now use CSS variables for theming
- Editor styles are now theme-aware
- Toolbar and modals respect theme colors

### Documentation
- Added complete theme system guide
- Custom theme creation examples
- CSS variable reference
- Theme switcher integration examples

## [1.0.8] - 2024-02-19

### Added
- Native HTML5 video upload and playback support
- VideoNode with full playback controls
- VideoUploadPlugin for drag-and-drop video upload
- Video settings panel (autoplay, loop, mute, controls)
- Video resize with aspect ratio preservation
- Custom video upload handler via `onVideoAdded` prop
- Slash command `/video` for quick video insertion
- Support for MP4, WebM, and OGG formats
- VIDEO-GUIDE.md comprehensive documentation

### Changed
- EditorConfig now includes VideoNode
- SlashCommandPlugin includes video command
- CMSBlockEditor accepts `onVideoAdded` prop

### Documentation
- Added complete video upload guide
- Server-side upload examples (Node.js, AWS S3, Cloudinary)
- Video optimization best practices
- Accessibility guidelines for videos

## [1.0.7] - 2024-02-18

### Added
- Advanced image editing with filters and effects
- Image editor modal with real-time preview
- 7 adjustable filters: brightness, contrast, saturation, blur, grayscale, sepia, hue rotation
- 6 filter presets: Vintage, B&W, Warm, Cool, Dramatic, Soft
- Edit button on selected images for quick access
- Canvas-based filter application with data URL export
- Custom image upload handler support via `onImageAdded` prop
- `onImageAdded?: (file: File) => Promise<string>` callback for server-side image uploads
- `useBase64Url?: boolean` prop to control image encoding behavior (default: `true`)
- Flexible image handling: custom upload, base64 encoding, or disabled
- Example implementation in demo app showing server upload integration
- IMAGE-EDITING-GUIDE.md documentation

### Changed
- ImageNode now includes edit button when selected
- ImageUploadPlugin now supports async image upload workflows
- Enhanced image handling with better error handling and logging

### Documentation
- Added comprehensive image editing guide
- Updated README with custom image upload examples
- Added API documentation for new props
- Included server upload integration example
- Filter presets and usage examples

## [1.0.6] - 2024-02-11

### Added
- Table support with visual builder
- Interactive table insertion modal
- Configurable rows (1-20) and columns (1-10)
- Header row styling option
- Quick preset buttons (3×3, 5×3, 4×4, 10×5)
- Live table preview in modal
- Full table editing capabilities (add/remove rows/columns, merge cells)
- Professional table styling (purple headers, striped rows, hover effects)
- Responsive table design with horizontal scroll on mobile
- TABLE-GUIDE.md documentation

## [1.0.0] - 2024-02-11

### Added
- Initial release of CMS Block Editor
- Rich text editing with full formatting support
- 10 pre-designed section templates
- Section editor with comprehensive controls
- Background images with gradient overlays
- Flexbox and CSS Grid layout support
- Image upload with resize and drag-and-drop
- Embed support for 8+ platforms (YouTube, Facebook, Instagram, Twitter, TikTok, Vimeo, Spotify, SoundCloud)
- Link insertion with custom labels
- Color picker for text and backgrounds
- Spacing controls (padding, margin, gap)
- Export to HTML and Markdown
- Import from HTML and Markdown
- CMSRenderer component for read-only display
- Responsive design with mobile optimization
- TypeScript support with full type definitions
- Comprehensive documentation

### Features

#### Editor
- Toolbar with all formatting options
- Slash commands for quick insertion
- Undo/redo support
- Keyboard shortcuts
- Real-time preview
- Auto-save support

#### Sections
- Hero Section
- Features Grid
- Call to Action
- Testimonial
- Pricing Table
- Team Members
- Statistics
- FAQ Section
- Contact Form
- Newsletter Signup

#### Section Controls
- Background colors (30 presets + custom)
- Background images with URL support
- Image sizing and positioning
- Gradient overlays (6 presets + custom)
- Opacity control (0-100%)
- Text alignment (left, center, right, justify)
- Layout types (Block, Flex, Grid)
- Flexbox controls (direction, wrap, align, justify)
- CSS Grid controls (columns, rows)
- Gap/spacing controls
- Padding and margin controls

#### Media
- Image upload from computer
- Image resize with 8-point handles
- Image drag-and-drop positioning
- YouTube embed with custom sizing
- Multi-platform embed support
- Automatic URL detection
- Responsive scaling

#### Export/Import
- Export to clean HTML
- Export to HTML with styles
- Export to Markdown
- Import from HTML
- Import from Markdown
- Download as files
- Copy to clipboard

### Technical
- Built with Lexical 0.15.0
- React 17+ support
- TypeScript support
- ESM module format
- Tree-shakeable exports
- Optimized bundle size (~200KB)
- Responsive CSS with mobile-first approach
- Accessibility compliant
- Cross-browser compatible

### Documentation
- Comprehensive README
- Section Creator Guide
- Section Editing Guide
- Background Image Guide
- Embed Guide
- Responsive Rendering Guide
- Section Controls Summary
- API documentation
- Example app included

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Future Roadmap

### Planned Features
- [x] Table support (Added in v1.0.6)
- [x] Custom image upload handler (Added in v1.0.7)
- [x] Advanced image editing (crop, filters) (Added in v1.0.7)
- [x] Video upload support (Added in v1.0.8)
- [x] Theme system (Added in v1.0.9)
- [ ] Custom block creation API
- [ ] Custom block creation API
- [ ] Collaboration features
- [ ] Version history
- [ ] Comments and annotations
- [ ] More section templates
- [ ] Theme system
- [ ] Plugin architecture
- [ ] Accessibility improvements
- [ ] Performance optimizations

### Under Consideration
- [ ] AI-powered content suggestions
- [ ] SEO optimization tools
- [ ] Analytics integration
- [ ] Multi-language support
- [ ] Custom fonts support
- [ ] Animation controls
- [ ] Advanced grid layouts
- [ ] Component library integration

---

For more information, visit [GitHub Repository](https://github.com/dawichcode/cms-block-editor)
