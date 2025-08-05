# Thumbnail Storage - guhso.com

This directory stores all podcast episode thumbnails for the GUHSO podcast website.

## Directory Structure
```
public/images/thumbnails/
├── README.md                    # This file
├── default.jpg                  # Default fallback thumbnail (400x300)
├── hero-featured.jpg           # Default hero section thumbnail (1200x600)
├── episode-1.jpg               # Episode 1 thumbnail (400x300)
├── episode-1-small.jpg         # Episode 1 small thumbnail (200x150)
├── episode-1-large.jpg         # Episode 1 large thumbnail (800x600)
├── episode-2.jpg               # Episode 2 thumbnail (400x300)
├── episode-2-small.jpg         # Episode 2 small thumbnail (200x150)
├── episode-2-large.jpg         # Episode 2 large thumbnail (800x600)
└── ...
```

## Naming Convention

### Standard Episodes
- **Medium (default)**: `{episode-slug}.jpg` or `{episode-id}.jpg` (400x300px)
- **Small**: `{episode-slug}-small.jpg` or `{episode-id}-small.jpg` (200x150px)
- **Large**: `{episode-slug}-large.jpg` or `{episode-id}-large.jpg` (800x600px)

### Special Thumbnails
- **Default fallback**: `default.jpg` (400x300px)
- **Hero section**: `hero-featured.jpg` (1200x600px)
- **Custom hero per episode**: `{episode-slug}-hero.jpg` (1200x600px)

## Image Specifications

### Dimensions
- **Small**: 200x150px (4:3 aspect ratio)
- **Medium**: 400x300px (4:3 aspect ratio) 
- **Large**: 800x600px (4:3 aspect ratio)
- **Hero**: 1200x600px (2:1 aspect ratio)

### Format Requirements
- **Format**: JPEG (.jpg) preferred, PNG (.png) acceptable
- **Quality**: 85-95% JPEG quality
- **File Size**: 
  - Small: < 30KB
  - Medium: < 80KB
  - Large: < 200KB
  - Hero: < 300KB

### Content Guidelines
- High contrast for readability
- Avoid small text (won't be readable at small sizes)
- Use consistent branding colors (#FF6B35, #F7931E)
- Ensure thumbnails work on dark backgrounds

## Upload Process

1. **Optimize images** using tools like:
   - ImageOptim (Mac)
   - TinyPNG/TinyJPG (Web)
   - Sharp (Node.js)

2. **Upload via FTP/cPanel** to:
   ```
   public_html/images/thumbnails/
   ```

3. **Verify uploads** by visiting:
   ```
   https://guhso.com/images/thumbnails/your-image.jpg
   ```

## Auto-Generated Thumbnails

The system will automatically try to load thumbnails in this order:

1. **Custom thumbnail** (if specified in episode data)
2. **Size-specific file** (`episode-1-small.jpg` for small size)
3. **Default size file** (`episode-1.jpg`)
4. **Fallback thumbnail** (`default.jpg`)

## Development Notes

- Thumbnails are lazy-loaded for performance
- WebP format support can be added later for better compression
- CDN integration (Cloudinary/CloudFront) can be added for scaling
- Images are cached by browsers - use versioning for updates

## Examples

```javascript
// Episode data should include:
{
  id: 1,
  slug: "welcome-to-guhso",
  title: "Welcome to GUHSO",
  thumbnail: "welcome-to-guhso.jpg", // Optional custom path
  // ... other episode data
}
```

This will attempt to load:
1. `/images/thumbnails/welcome-to-guhso.jpg`
2. `/images/thumbnails/default.jpg` (if first fails)

## Maintenance

- Review and optimize images monthly
- Remove unused thumbnails
- Monitor file sizes and loading performance
- Consider implementing automated optimization pipeline