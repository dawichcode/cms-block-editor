# CMS Block Editor - Example App

This is a comprehensive demo application showcasing all features of the CMS Block Editor.

## Features Demonstrated

### 1. Basic Editor
- Rich text editing
- Slash commands (`/`)
- All formatting options
- Basic setup example

### 2. Theme System
- 10 preset themes
- Light/Dark mode toggle
- Auto mode (follows system preference)
- Live theme switching
- Custom theme support

### 3. Media Upload
- Image upload with drag & drop
- Image editing with filters
- Video upload support
- Resize functionality
- Custom upload handlers

### 4. Persistence
- Auto-save to localStorage
- Content restoration on refresh
- Clear content functionality

### 5. Renderer
- Read-only content display
- Edit/Preview toggle
- Production-ready rendering

## Running the Demo

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Project Structure

```
example-app/
├── src/
│   ├── App.tsx          # Main application with all demos
│   ├── App.css          # Application styles
│   ├── index.css        # Global styles with theme support
│   └── main.tsx         # Entry point
├── index.html           # HTML template
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
└── vite.config.ts       # Vite config
```

## Key Features to Try

### Slash Commands
Type `/` in the editor to see available commands:
- `/h1`, `/h2`, `/h3` - Headings
- `/image` - Insert image
- `/video` - Insert video
- `/table` - Insert table
- `/quote` - Insert quote
- And more!

### Image Editing
1. Upload or drag an image into the editor
2. Click on the image to select it
3. Click the "Edit" button
4. Try different filters and presets
5. Apply changes

### Video Upload
1. Type `/video` or drag a video file
2. Click on the video to select it
3. Click "Settings" to configure playback
4. Adjust autoplay, loop, mute, and controls

### Theme Switching
1. Click the theme switcher in the header
2. Try different preset themes
3. Toggle between light and dark modes
4. Enable auto mode to follow system preference

### Content Persistence
1. Go to the "Persistence" tab
2. Add some content
3. Wait for the "Saved" indicator
4. Refresh the page
5. Your content is still there!

## Customization

### Custom Theme Example

```typescript
import { Theme, lightTheme } from 'cms-block-editor';

const myTheme: Theme = {
  ...lightTheme,
  name: 'my-theme',
  colors: {
    ...lightTheme.colors,
    primary: '#your-color',
    primaryHover: '#your-hover-color',
  },
};

<ThemeProvider defaultTheme={myTheme}>
  <App />
</ThemeProvider>
```

### Custom Upload Handler

```typescript
const handleImageUpload = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });
  
  const data = await response.json();
  return data.url;
};

<CMSBlockEditor 
  onImageAdded={handleImageUpload}
  onVideoAdded={handleVideoUpload}
/>
```

## Technologies Used

- React 18
- TypeScript
- Vite
- CMS Block Editor
- Lexical

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Performance Tips

1. Use custom upload handlers for production
2. Compress images before upload
3. Use CDN for media files
4. Enable lazy loading for large content

## Troubleshooting

### Theme not applying
- Make sure ThemeProvider wraps your app
- Check that CSS is imported

### Upload not working
- Provide onImageAdded/onVideoAdded props
- Check console for errors
- Verify file types are supported

### Content not persisting
- Check localStorage permissions
- Verify storageKey is provided to ThemeProvider

## Learn More

- [Main Documentation](../README.md)
- [Theme Guide](../docs/THEME-GUIDE.md)
- [Video Guide](../docs/VIDEO-GUIDE.md)
- [Image Editing Guide](../docs/IMAGE-EDITING-GUIDE.md)

## License

MIT
