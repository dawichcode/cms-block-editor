# Video Upload Guide

Complete guide to using video upload and playback features in CMS Block Editor.

## Overview

The CMS Block Editor supports native HTML5 video playback with:

- **Drag & Drop Upload**: Drag video files directly into the editor
- **Slash Command**: Type `/video` to insert videos
- **Custom Upload Handler**: Upload videos to your server
- **Playback Controls**: Autoplay, loop, mute, and controls settings
- **Responsive Sizing**: Resize videos with drag handles
- **Multiple Formats**: MP4, WebM, OGG, and more

## Supported Video Formats

### Recommended Formats

- **MP4 (H.264)**: Best browser compatibility
- **WebM (VP8/VP9)**: Good quality, smaller file sizes
- **OGG (Theora)**: Open source format

### Browser Support

| Format | Chrome | Firefox | Safari | Edge |
|--------|--------|---------|--------|------|
| MP4    | ✅     | ✅      | ✅     | ✅   |
| WebM   | ✅     | ✅      | ❌     | ✅   |
| OGG    | ✅     | ✅      | ❌     | ✅   |

**Recommendation**: Use MP4 (H.264) for maximum compatibility.

## Adding Videos

### Method 1: Drag and Drop

1. Drag a video file from your computer
2. Drop it into the editor
3. The video will be inserted at the drop location

### Method 2: Slash Command

1. Type `/video` in the editor
2. Select "Video" from the menu
3. Choose a video file from your computer
4. The video will be inserted at the cursor

### Method 3: Programmatic

```typescript
import { VideoNode } from 'cms-block-editor';

editor.update(() => {
  const selection = $getSelection();
  if ($isRangeSelection(selection)) {
    const videoNode = new VideoNode('video-url.mp4');
    selection.insertNodes([videoNode]);
  }
});
```

## Custom Video Upload

### Server-Side Upload

Upload videos to your server instead of using object URLs:

```typescript
import { CMSBlockEditor } from 'cms-block-editor';

function Editor() {
  const [content, setContent] = useState('');

  const handleVideoUpload = async (file: File): Promise<string> => {
    // Upload to your server
    const formData = new FormData();
    formData.append('video', file);
    
    const response = await fetch('/api/upload-video', {
      method: 'POST',
      body: formData,
    });
    
    const data = await response.json();
    return data.url; // Return the uploaded video URL
  };

  return (
    <CMSBlockEditor 
      value={content}
      onChange={(state) => setContent(JSON.stringify(state))}
      onVideoAdded={handleVideoUpload}
      useBase64Url={false}
    />
  );
}
```

### With Progress Tracking

```typescript
const handleVideoUpload = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    // Track upload progress
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        const percentComplete = (e.loaded / e.total) * 100;
        console.log(`Upload progress: ${percentComplete}%`);
      }
    });
    
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        resolve(data.url);
      } else {
        reject(new Error('Upload failed'));
      }
    });
    
    xhr.addEventListener('error', () => {
      reject(new Error('Upload failed'));
    });
    
    const formData = new FormData();
    formData.append('video', file);
    
    xhr.open('POST', '/api/upload-video');
    xhr.send(formData);
  });
};
```

## Video Settings

### Accessing Settings

1. Click on a video to select it
2. Click the "⚙️ Settings" button
3. Adjust playback options

### Available Settings

**Show Controls** (default: on)
- Displays play/pause, volume, and timeline controls
- Recommended: Keep enabled for user control

**Autoplay** (default: off)
- Video starts playing automatically
- Note: Most browsers require muted for autoplay

**Loop** (default: off)
- Video repeats continuously
- Useful for background videos

**Muted** (default: off)
- Video plays without sound
- Required for autoplay in most browsers

### Settings Example

```typescript
// Create video with custom settings
const videoNode = new VideoNode(
  'video.mp4',     // src
  640,             // width
  360,             // height
  true,            // autoplay
  true,            // loop
  true,            // muted
  false            // controls (hidden for background video)
);
```

## Resizing Videos

### Using Resize Handles

1. Click on a video to select it
2. Drag the corner handles to resize
3. Aspect ratio is maintained automatically

### Programmatic Resizing

```typescript
editor.update(() => {
  const node = editor.getEditorState()._nodeMap.get(nodeKey);
  if (node && node instanceof VideoNode) {
    const writable = node.getWritable();
    writable.__width = 800;
    writable.__height = 450;
  }
});
```

## Best Practices

### File Size Optimization

**Compress Videos**
- Use tools like HandBrake or FFmpeg
- Target bitrate: 1-5 Mbps for web
- Resolution: 1080p max, 720p recommended

**Example FFmpeg Command**
```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output.mp4
```

### Performance Tips

1. **Use CDN**: Host videos on a CDN for faster delivery
2. **Lazy Loading**: Load videos only when visible
3. **Poster Images**: Add thumbnail images for faster perceived load
4. **Adaptive Streaming**: Use HLS or DASH for large videos

### Accessibility

1. **Provide Captions**: Add subtitle tracks
2. **Include Transcripts**: Provide text alternatives
3. **Keyboard Controls**: Ensure controls are keyboard accessible
4. **Audio Descriptions**: For visually impaired users

## Advanced Usage

### Adding Captions

```typescript
// HTML5 video with captions
<video controls>
  <source src="video.mp4" type="video/mp4" />
  <track 
    kind="subtitles" 
    src="captions-en.vtt" 
    srclang="en" 
    label="English" 
    default 
  />
</video>
```

### Multiple Video Sources

```typescript
// Provide multiple formats for compatibility
const videoHTML = `
  <video controls>
    <source src="video.mp4" type="video/mp4" />
    <source src="video.webm" type="video/webm" />
    <source src="video.ogv" type="video/ogg" />
    Your browser doesn't support HTML5 video.
  </video>
`;
```

### Background Videos

```typescript
// Create a looping background video
const backgroundVideo = new VideoNode(
  'background.mp4',
  1920,
  1080,
  true,   // autoplay
  true,   // loop
  true,   // muted (required for autoplay)
  false   // no controls
);
```

### Video Thumbnails

```typescript
// Add poster image for better UX
<video 
  poster="thumbnail.jpg"
  controls
>
  <source src="video.mp4" type="video/mp4" />
</video>
```

## Server-Side Implementation

### Node.js/Express Example

```javascript
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Configure storage
const storage = multer.diskStorage({
  destination: './uploads/videos/',
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only MP4, WebM, and OGG are allowed.'));
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

// Upload endpoint
app.post('/api/upload-video', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  const videoUrl = `/uploads/videos/${req.file.filename}`;
  res.json({ url: videoUrl });
});

app.listen(3000);
```

### AWS S3 Example

```typescript
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

async function uploadToS3(file: File): Promise<string> {
  const params = {
    Bucket: 'your-bucket-name',
    Key: `videos/${Date.now()}-${file.name}`,
    Body: file,
    ContentType: file.type,
    ACL: 'public-read',
  };
  
  const result = await s3.upload(params).promise();
  return result.Location;
}
```

### Cloudinary Example

```typescript
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(file: File): Promise<string> {
  const result = await cloudinary.uploader.upload(file.path, {
    resource_type: 'video',
    folder: 'cms-videos',
  });
  
  return result.secure_url;
}
```

## Troubleshooting

### Video Won't Play

**Problem**: Video doesn't play in browser
- **Solution**: Check video format compatibility
- **Solution**: Ensure video is properly encoded
- **Solution**: Check CORS headers if video is on different domain

### Autoplay Not Working

**Problem**: Video doesn't autoplay
- **Solution**: Enable muted option (browsers require muted for autoplay)
- **Solution**: Check browser autoplay policies
- **Solution**: User interaction may be required

### Large File Sizes

**Problem**: Videos are too large
- **Solution**: Compress videos before upload
- **Solution**: Use appropriate resolution (720p or 1080p)
- **Solution**: Adjust bitrate settings

### Upload Fails

**Problem**: Video upload fails
- **Solution**: Check file size limits on server
- **Solution**: Verify file type is allowed
- **Solution**: Check network connection
- **Solution**: Increase server timeout for large files

### Performance Issues

**Problem**: Page loads slowly with videos
- **Solution**: Use lazy loading
- **Solution**: Add poster images
- **Solution**: Host videos on CDN
- **Solution**: Use adaptive streaming for large videos

## Security Considerations

### File Validation

```typescript
const validateVideo = (file: File): boolean => {
  // Check file type
  const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg'];
  if (!allowedTypes.includes(file.type)) {
    return false;
  }
  
  // Check file size (100MB max)
  const maxSize = 100 * 1024 * 1024;
  if (file.size > maxSize) {
    return false;
  }
  
  return true;
};
```

### Server-Side Validation

```javascript
// Validate file type on server
const validateMimeType = (file) => {
  const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg'];
  return allowedTypes.includes(file.mimetype);
};

// Scan for malware (example with ClamAV)
const scanFile = async (filePath) => {
  // Implement virus scanning
  // Return true if clean, false if infected
};
```

### Access Control

```typescript
// Implement access control for video uploads
const checkPermissions = (user: User): boolean => {
  return user.role === 'admin' || user.role === 'editor';
};
```

## Examples

### Example 1: Basic Video Upload

```typescript
<CMSBlockEditor 
  value={content}
  onChange={setContent}
  onVideoAdded={async (file) => {
    const formData = new FormData();
    formData.append('video', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    return data.url;
  }}
/>
```

### Example 2: Background Video Section

```typescript
// Create a section with background video
const createVideoSection = () => {
  editor.update(() => {
    const videoNode = new VideoNode(
      'background.mp4',
      1920,
      1080,
      true,  // autoplay
      true,  // loop
      true,  // muted
      false  // no controls
    );
    
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      selection.insertNodes([videoNode]);
    }
  });
};
```

### Example 3: Video Gallery

```typescript
const videos = [
  { url: 'video1.mp4', title: 'Video 1' },
  { url: 'video2.mp4', title: 'Video 2' },
  { url: 'video3.mp4', title: 'Video 3' },
];

videos.forEach(video => {
  const videoNode = new VideoNode(video.url);
  // Insert into editor
});
```

## Future Enhancements

Planned features for future releases:

- [ ] Video trimming and editing
- [ ] Thumbnail generation
- [ ] Subtitle/caption editor
- [ ] Video filters and effects
- [ ] Adaptive streaming support (HLS/DASH)
- [ ] Video compression in browser
- [ ] Batch video upload
- [ ] Video analytics
- [ ] Picture-in-picture mode
- [ ] 360° video support

## Related Guides

- [Image Upload Guide](./IMAGE-GUIDE.md)
- [Image Editing Guide](./IMAGE-EDITING-GUIDE.md)
- [Embed Guide](./EMBED-GUIDE.md)
- [Responsive Guide](./RESPONSIVE-GUIDE.md)

## Support

For issues or questions about video upload:

- Check this guide first
- Review browser console for errors
- Test with different video formats
- Verify server upload configuration
- Report bugs on GitHub Issues

---

**Happy Video Editing!** 🎬
