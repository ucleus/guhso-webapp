# 📤 Hostinger Image Upload Guide - GUHSO

## 🚨 Important: You can't upload images to your local React project and expect them to appear on the live site!

The directory `https://guhso.com/images/thumbnails/` is on your **Hostinger server**, not in your local React project.

---

## 🎯 **Method 1: cPanel File Manager (Easiest)**

### Step 1: Access cPanel
1. **Login to Hostinger** dashboard
2. **Click "cPanel"** or "File Manager"
3. **Navigate to**: `public_html/`

### Step 2: Create Directory Structure
If not exists, create:
```
public_html/
├── images/
│   └── thumbnails/
```

### Step 3: Upload Images
1. **Navigate to**: `public_html/images/thumbnails/`
2. **Click "Upload"** button
3. **Select your image files**
4. **Wait for upload to complete**

### Step 4: Test Upload
Visit: `https://guhso.com/images/thumbnails/your-image.jpg`

---

## 🎯 **Method 2: FTP Client**

### Step 1: Get FTP Credentials
From Hostinger dashboard:
- **FTP Host**: Usually `guhso.com` or `ftp.guhso.com`
- **Username**: Your hosting username
- **Password**: Your hosting password
- **Port**: 21 (FTP) or 22 (SFTP)

### Step 2: Connect with FTP Client
**Popular FTP Clients:**
- **FileZilla** (Free, cross-platform)
- **WinSCP** (Windows)
- **Cyberduck** (Mac)
- **VS Code Extensions**: FTP-Sync, SFTP

### Step 3: Upload Files
1. **Connect to FTP**
2. **Navigate to**: `/public_html/images/thumbnails/`
3. **Drag and drop** image files
4. **Wait for upload**

---

## 🎯 **Method 3: Terminal/Command Line**

### Using SCP (if SSH access available):
```bash
# Upload single file
scp your-image.jpg username@guhso.com:/public_html/images/thumbnails/

# Upload multiple files
scp *.jpg username@guhso.com:/public_html/images/thumbnails/
```

### Using rsync:
```bash
rsync -avz ./thumbnails/ username@guhso.com:/public_html/images/thumbnails/
```

---

## 📋 **Required Images for GUHSO**

### Essential Files:
```bash
# Create these first for proper fallbacks
default.jpg          # 400x300px, <80KB
hero-featured.jpg    # 1200x600px, <300KB
```

### Episode Examples:
```bash
episode-1.jpg        # 400x300px
episode-1-small.jpg  # 200x150px  
episode-1-large.jpg  # 800x600px
welcome-to-guhso.jpg # Using slug
```

---

## 🛠️ **Troubleshooting Upload Issues**

### Problem: "Upload Failed"
**Solutions:**
- Check file size limits (usually 64MB max)
- Verify file format (JPG, PNG, WebP)
- Ensure stable internet connection
- Try smaller batches

### Problem: "Permission Denied"
**Solutions:**
- Check FTP credentials
- Verify directory permissions (755 for folders)
- Contact Hostinger support

### Problem: "Directory Not Found"
**Solutions:**
- Create directory structure first
- Check you're in `public_html/` not root
- Use cPanel File Manager to create folders

---

## ✅ **Verification Steps**

### After Upload:
1. **Check file exists**: `https://guhso.com/images/thumbnails/your-image.jpg`
2. **Test in browser**: Should display image directly
3. **Check file permissions**: 644 for files, 755 for directories
4. **Test in React app**: Images should now load

### If Images Still Don't Load:
- **Clear browser cache**
- **Check file name case sensitivity** (Linux servers are case-sensitive)
- **Verify file path matches exactly**
- **Check for typos in filenames**

---

## 🚀 **Quick Start Commands**

### Create Sample Images Locally:
```bash
# Navigate to your project
cd /Users/seanb/Documents/Sites/guhso-webapp/guhso-podcast-react

# Create sample images (placeholder script)
node -e "
const fs = require('fs');
const path = 'public/images/thumbnails/';
console.log('Sample images needed:');
console.log('- default.jpg (400x300)');  
console.log('- hero-featured.jpg (1200x600)');
console.log('Upload these to: https://guhso.com/images/thumbnails/');
"
```

### Test Upload Success:
```bash
# Test if default image exists
curl -I https://guhso.com/images/thumbnails/default.jpg

# Should return: HTTP/1.1 200 OK
```

---

## 📞 **Need Help?**

### Hostinger Support:
- **Live Chat**: Available 24/7
- **Help Center**: help.hostinger.com
- **Common Issue**: "How to upload files via cPanel File Manager"

### Local Development:
- Images in `public/images/thumbnails/` work locally
- But production needs server upload
- Use placeholder system for missing images

---

## 🎨 **Image Optimization Before Upload**

### Recommended Tools:
- **TinyJPG/TinyPNG**: Online compression
- **ImageOptim**: Mac app
- **Squoosh**: Google's web app

### Command Line (if you have Sharp):
```bash
npm install -g sharp-cli

# Optimize image
sharp input.jpg -o optimized.jpg --jpeg-quality 85 --resize 400 300
```

---

**Remember**: The React app is just the frontend. Images must be uploaded to the **Hostinger server** to be accessible at `https://guhso.com/images/thumbnails/`!