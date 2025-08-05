# Deployment Guide - GUHSO Podcast React App

## 🚀 Hostinger Deployment Setup

### Prerequisites
- Hostinger shared hosting account
- Domain configured: `guhso.com`
- FTP/cPanel access
- Node.js app built for production

### Build Process

1. **Build the React app for production:**
   ```bash
   npm run build
   ```

2. **Upload files to Hostinger:**
   - Upload contents of `build/` folder to `public_html/`
   - Ensure `index.html` is in the root of `public_html/`

### Directory Structure on Hostinger
```
public_html/
├── index.html                   # Main React app entry point
├── static/                      # React build assets
│   ├── css/
│   ├── js/
│   └── media/
├── images/                      # Thumbnail storage
│   └── thumbnails/
│       ├── default.jpg          # Default fallback (400x300)
│       ├── hero-featured.jpg    # Hero section default (1200x600)
│       ├── episode-1.jpg        # Episode thumbnails (400x300)
│       ├── episode-1-small.jpg  # Small thumbnails (200x150)
│       ├── episode-1-large.jpg  # Large thumbnails (800x600)
│       └── ...
├── api/                         # Backend API (if separate)
└── .htaccess                    # URL rewriting rules
```

### Required .htaccess Configuration

Create `/public_html/.htaccess`:
```apache
# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Set cache headers
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/gif "access plus 1 month"
    ExpiresByType image/svg+xml "access plus 1 month"
</IfModule>

# React Router support - redirect all requests to index.html
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # Handle Angular and React routes
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

## 📁 Thumbnail Management

### Upload Thumbnails via FTP/cPanel

1. **Connect to FTP** or use cPanel File Manager
2. **Navigate to** `public_html/images/thumbnails/`
3. **Upload optimized images** following naming convention:

#### Required Default Images:
```
default.jpg          # 400x300px, <80KB
hero-featured.jpg    # 1200x600px, <300KB
```

#### Episode Thumbnails (example):
```
episode-1.jpg        # 400x300px, <80KB
episode-1-small.jpg  # 200x150px, <30KB  
episode-1-large.jpg  # 800x600px, <200KB
welcome-to-guhso.jpg # Using slug-based naming
```

### Image Optimization Before Upload

**Recommended Tools:**
- **Online:** TinyJPG, TinyPNG, Squoosh
- **Desktop:** ImageOptim (Mac), PNGGauntlet (Windows)
- **Command Line:** `sharp-cli`, `imagemagick`

**Example with Sharp CLI:**
```bash
# Install sharp-cli
npm install -g sharp-cli

# Optimize and resize
sharp -i original.jpg -o episode-1.jpg --width 400 --height 300 --quality 85
sharp -i original.jpg -o episode-1-small.jpg --width 200 --height 150 --quality 85
sharp -i original.jpg -o episode-1-large.jpg --width 800 --height 600 --quality 90
```

## 🔧 Environment Configuration

### Environment Variables

Create `.env.production` in your local project:
```env
REACT_APP_API_URL=https://guhso.com/api/v1
REACT_APP_CDN_URL=https://guhso.com
```

### API Configuration

If using a separate backend API, ensure:
- API endpoints are accessible from `guhso.com/api/`
- CORS headers allow requests from `guhso.com`
- SSL certificates are properly configured

## 📊 Performance Optimization

### Implemented Features:
- ✅ Lazy loading for thumbnails
- ✅ Image fallback system
- ✅ Responsive image sizes
- ✅ Compressed CSS/JS bundles
- ✅ Browser caching headers

### Additional Optimizations:
- Consider WebP format for modern browsers
- Implement service worker for offline support
- Use CDN for static assets (future)
- Monitor Core Web Vitals

## 🚦 Testing Deployment

### Pre-deployment Checklist:
- [ ] Build runs without errors (`npm run build`)
- [ ] All required thumbnails uploaded
- [ ] `.htaccess` configured correctly
- [ ] Domain points to Hostinger
- [ ] SSL certificate active

### Post-deployment Testing:
```bash
# Test main site
curl -I https://guhso.com

# Test thumbnail loading
curl -I https://guhso.com/images/thumbnails/default.jpg

# Test React routing
curl -I https://guhso.com/episodes

# Test API endpoints (if applicable)
curl -I https://guhso.com/api/v1/episodes
```

### Browser Testing:
- [ ] Homepage loads correctly
- [ ] Episode thumbnails display properly
- [ ] Fallback images work when thumbnails missing
- [ ] Mobile responsiveness works
- [ ] Navigation routing functions
- [ ] Player controls work

## 🔄 Update Process

### Regular Updates:
1. **Build locally:** `npm run build`
2. **Upload changed files** via FTP
3. **Add new thumbnails** as needed
4. **Clear browser cache** if CSS/JS changed

### Adding New Episodes:
1. **Create thumbnails** (3 sizes recommended)
2. **Upload to** `/public_html/images/thumbnails/`
3. **Update backend API** with new episode data
4. **Test thumbnail loading**

## 🛠️ Troubleshooting

### Common Issues:

**1. Thumbnails not loading:**
- Check file permissions (755 for directories, 644 for files)
- Verify file names match exactly (case-sensitive)
- Ensure files are in correct directory

**2. React routing not working:**
- Verify `.htaccess` is uploaded and configured
- Check Apache mod_rewrite is enabled

**3. Build assets not loading:**
- Clear browser cache
- Check file paths in `index.html`
- Verify static files uploaded correctly

**4. Performance issues:**
- Optimize large images
- Enable compression in `.htaccess`
- Check network requests in browser dev tools

### Monitoring:
- Use Google PageSpeed Insights
- Monitor error logs in cPanel
- Set up uptime monitoring
- Track Core Web Vitals

## 📞 Support

- **Hostinger Support:** Help with hosting configuration
- **Development Issues:** Check console logs and network tab
- **Thumbnail Issues:** Verify image formats and sizes
- **Performance:** Use Lighthouse audits

---

**Production URL:** https://guhso.com  
**Thumbnail Base URL:** https://guhso.com/images/thumbnails/  
**Last Updated:** [Current Date]