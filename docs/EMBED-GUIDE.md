# Embed Guide

The CMS Block Editor now supports embedding content from popular social media and video platforms with a single click.

## Supported Platforms

✅ **YouTube** - Video embeds
✅ **Facebook** - Posts and videos  
✅ **Instagram** - Posts and reels
✅ **Twitter/X** - Tweets
✅ **TikTok** - Videos
✅ **Vimeo** - Videos
✅ **Spotify** - Tracks, albums, playlists, podcasts
✅ **SoundCloud** - Tracks and playlists
✅ **Generic** - Any other embeddable content

## How to Use

### Insert an Embed

1. Click the **video library icon** (📹) in the toolbar
2. Paste the URL from any supported platform
3. Click "Insert Embed"
4. The embed appears in your content

### Resize Embeds

For video embeds (YouTube, Vimeo, Spotify, SoundCloud):
1. Click on the embed to select it
2. Drag the resize handles (corners)
3. Maintains aspect ratio automatically
4. Minimum size: 280px width

### Platform-Specific Features

#### YouTube
- Automatically detects video ID
- Supports watch URLs and short URLs (youtu.be)
- 16:9 aspect ratio
- Resizable

**Example URLs:**
```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
https://youtu.be/dQw4w9WgXcQ
```

#### Facebook
- Supports post URLs
- Supports video URLs
- Responsive iframe embed
- Minimum height: 500px

**Example URLs:**
```
https://www.facebook.com/username/posts/123456789
https://www.facebook.com/username/videos/123456789
https://fb.watch/abc123
```

#### Instagram
- Supports post URLs
- Supports reel URLs
- Uses Instagram's embed API
- Centered display
- Max width: 540px

**Example URLs:**
```
https://www.instagram.com/p/ABC123xyz/
https://www.instagram.com/reel/ABC123xyz/
```

#### Twitter/X
- Supports tweet URLs
- Uses Twitter's embed API
- Responsive display
- Max width: 550px

**Example URLs:**
```
https://twitter.com/username/status/1234567890
https://x.com/username/status/1234567890
```

#### TikTok
- Supports video URLs
- Uses TikTok's embed API
- Responsive display
- Max width: 605px

**Example URLs:**
```
https://www.tiktok.com/@username/video/1234567890
https://vm.tiktok.com/abc123/
```

#### Vimeo
- Automatically detects video ID
- 16:9 aspect ratio
- Resizable
- High-quality playback

**Example URLs:**
```
https://vimeo.com/123456789
https://player.vimeo.com/video/123456789
```

#### Spotify
- Supports tracks, albums, playlists, podcasts
- Automatically converts to embed format
- Resizable
- Default height: 380px

**Example URLs:**
```
https://open.spotify.com/track/abc123
https://open.spotify.com/album/abc123
https://open.spotify.com/playlist/abc123
https://open.spotify.com/episode/abc123
```

#### SoundCloud
- Supports track and playlist URLs
- Automatically converts to embed format
- Resizable
- Default height: 166px

**Example URLs:**
```
https://soundcloud.com/artist/track-name
https://soundcloud.com/artist/sets/playlist-name
```

## Features

### Automatic Detection
- Paste any URL and the editor automatically detects the platform
- No need to specify the platform type
- Intelligent URL parsing

### Responsive Design
- All embeds are fully responsive
- Scales down on mobile devices
- Maintains aspect ratios
- Optimized for all screen sizes

### Resize Controls
- Video embeds (YouTube, Vimeo, Spotify, SoundCloud) can be resized
- Drag corner handles to resize
- Maintains aspect ratio
- Visual feedback during resize

### Selection State
- Click to select an embed
- Blue border indicates selection
- Resize handles appear when selected
- Click outside to deselect

## Rendering

### In the Editor
- Full interactive embeds
- Resize and reposition
- Visual selection feedback
- Real-time preview

### In the Renderer
- Clean, professional display
- Preserved dimensions
- Responsive scaling
- No editing controls

## Best Practices

### Choosing Embeds

1. **Use Native Embeds**
   - Better performance
   - Official platform support
   - Automatic updates

2. **Consider Load Time**
   - Embeds add page weight
   - Use sparingly
   - Consider lazy loading

3. **Mobile Experience**
   - Test on mobile devices
   - Ensure embeds are readable
   - Check loading times

### Sizing

1. **Default Sizes**
   - YouTube/Vimeo: 560×315px
   - Spotify: 300×380px
   - SoundCloud: 100%×166px
   - Social media: Auto height

2. **Resize Guidelines**
   - Don't make too small (min 280px)
   - Consider mobile screens
   - Maintain readability

3. **Responsive Behavior**
   - Embeds scale down on mobile
   - Aspect ratios maintained
   - Never overflow container

### Content Strategy

1. **Embed Placement**
   - Use embeds to enhance content
   - Don't overuse
   - Place strategically

2. **Context**
   - Provide context around embeds
   - Explain what viewers will see
   - Add captions if needed

3. **Accessibility**
   - Provide alternative text
   - Describe embedded content
   - Ensure keyboard navigation

## Troubleshooting

### Embed Not Displaying

**Problem**: Embed shows as link instead of embedded content

**Solutions:**
- Verify URL is correct and complete
- Check platform is supported
- Ensure URL is publicly accessible
- Try copying URL directly from platform

### Resize Not Working

**Problem**: Can't resize the embed

**Solutions:**
- Click to select the embed first
- Only video embeds are resizable
- Social media embeds have fixed sizes
- Check if resize handles are visible

### Social Media Embeds Not Loading

**Problem**: Instagram, Twitter, or TikTok embeds not showing

**Solutions:**
- These use oEmbed APIs
- May require API keys for production
- Check browser console for errors
- Verify URL format is correct

### Facebook Embed Issues

**Problem**: Facebook content not displaying

**Solutions:**
- Ensure post is public
- Check URL is complete
- Facebook may require app configuration
- Try different post URL

## Advanced Usage

### Custom Embed Sizes

While editing, you can resize embeds to custom dimensions:

1. Select the embed
2. Drag corner handles
3. Release to set size
4. Size is saved with content

### Multiple Embeds

You can add multiple embeds in a single document:

- Mix different platforms
- Combine with other content
- Create rich media experiences
- Maintain performance

### Embed in Sections

Embeds work great in sections:

1. Create a section
2. Insert embed inside
3. Apply section styling
4. Add background/padding

## Platform Limitations

### YouTube
- Requires public videos
- Age-restricted content may not embed
- Some videos disable embedding

### Facebook
- Requires public posts
- Private content won't embed
- May require Facebook app setup

### Instagram
- Requires public posts
- Private accounts won't embed
- May require Instagram API access

### Twitter/X
- Requires public tweets
- Protected accounts won't embed
- Deleted tweets won't display

### TikTok
- Requires public videos
- Private accounts won't embed
- Some regions may have restrictions

### Spotify
- Requires Spotify account to play
- Some content may be region-locked
- Podcasts may have restrictions

## Performance

### Load Times

**Impact:**
- Each embed adds ~100-500KB
- Social media embeds load external scripts
- Video embeds are generally lighter

**Optimization:**
- Limit embeds per page
- Consider lazy loading
- Use native embeds when possible

### Best Practices

1. **Limit Quantity**
   - 3-5 embeds per page maximum
   - More embeds = slower page

2. **Lazy Loading**
   - Embeds below fold load on scroll
   - Improves initial page load
   - Better user experience

3. **Caching**
   - Embed code is cached
   - Reduces repeated loads
   - Faster subsequent visits

## Browser Support

All embed features work in:
- ✅ Chrome/Edge (desktop & mobile)
- ✅ Firefox (desktop & mobile)
- ✅ Safari (desktop & mobile)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Privacy & Security

### Data Collection

- Embedded content may track users
- Platforms collect analytics
- Consider privacy policies
- Inform users if required

### Security

- All embeds use HTTPS
- Sandboxed iframes
- No direct script execution
- Safe for user content

### GDPR Compliance

- Embeds may require consent
- Consider cookie policies
- Provide opt-out options
- Check platform policies

## Examples

### Blog Post with Video

```
[Paragraph introducing topic]

[YouTube embed: Tutorial video]

[Paragraph discussing video]
```

### Social Proof Section

```
[Section with testimonials]

[Twitter embed: Customer tweet]
[Instagram embed: Customer post]

[Call to action]
```

### Music Showcase

```
[Heading: Latest Release]

[Spotify embed: New album]
[SoundCloud embed: Single track]

[Description and links]
```

### Event Promotion

```
[Hero section: Event details]

[TikTok embed: Event teaser]
[Facebook embed: Event page]

[Registration CTA]
```

## API Reference

### EmbedNode

```typescript
class EmbedNode {
  url: string;           // The embed URL
  type: EmbedType;       // Platform type
  width?: number;        // Custom width
  height?: number;       // Custom height
}
```

### Supported Types

```typescript
type EmbedType = 
  | 'youtube'
  | 'facebook'
  | 'instagram'
  | 'twitter'
  | 'tiktok'
  | 'vimeo'
  | 'spotify'
  | 'soundcloud'
  | 'generic';
```

### Creating Embeds Programmatically

```typescript
import { $createEmbedNode } from '@cms/cms-block-editor';

editor.update(() => {
  const embed = $createEmbedNode(
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'youtube',
    560,
    315
  );
  selection.insertNodes([embed]);
});
```

## Summary

The Embed feature provides:

✅ 8+ platform support
✅ Automatic URL detection
✅ Responsive embeds
✅ Resize controls
✅ Clean rendering
✅ Mobile optimized
✅ Easy to use
✅ Professional results

**Perfect for:** Blog posts, portfolios, social media content, video tutorials, music showcases, and any content that benefits from rich media!

---

**Pro Tip:** Always test embeds on mobile devices and consider page load times when using multiple embeds! 📱🎥
