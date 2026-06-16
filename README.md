# Women's Sports Museum Website

A beautiful, responsive website celebrating women's achievements in sports throughout history.

## Project Structure

```
HistoryFinal2526/
├── home.html              # Main homepage with hero section and decade selection
├── artifact.html          # Artifact detail page (loads markdown content dynamically)
├── navbar.html            # Navigation bar (shared across pages)
├── css/
│   └── all.css           # Comprehensive styling with sports theme
├── js/
│   ├── load_nav.js       # Dynamically loads navbar into all pages
│   └── artifact-loader.js # Loads markdown artifacts and images dynamically
└── artifacts/
    ├── data/             # Markdown files for each decade
    │   ├── 40s.md       # 1940s artifacts content
    │   ├── 50s.md       # 1950s artifacts content
    │   ├── 60s.md       # 1960s artifacts content
    │   └── 70s.md       # 1970s+ artifacts content
    └── images/          # Optional images for each decade
        ├── 40s.jpg      # (optional) 1940s image
        ├── 50s.jpg      # (optional) 1950s image
        ├── 60s.jpg      # (optional) 1960s image
        └── 70s.jpg      # (optional) 1970s+ image
```

## Features

✨ **Beautiful Design**
- Women's sports themed color scheme (burgundy and red gradient)
- Responsive Bootstrap 5 layout
- Smooth animations and transitions
- Professional typography

🎨 **Dynamic Content**
- Markdown-based artifact content (uses marked.js)
- Automatic image loading and fallback
- Dynamic page titles
- Loading states and error handling

📱 **Fully Responsive**
- Mobile-friendly navigation
- Adaptive layouts for all screen sizes
- Touch-friendly buttons and menus

📚 **Easy to Extend**
- Add new decades by creating `decades.md` in `artifacts/data/`
- Add images by placing `decades.jpg` in `artifacts/images/`
- No code changes needed for content updates

## How to Use

### View the Website
1. Open `home.html` in a web browser
2. Browse the decade cards on the home page
3. Click any decade to view detailed artifact information

### Add New Artifacts
1. Create a new markdown file in `artifacts/data/` (e.g., `80s.md`)
2. Update the decade dropdown in `navbar.html` to include the new decade
3. (Optional) Add a corresponding image to `artifacts/images/` (e.g., `80s.jpg`)

### Update Artifact Content
- Edit the markdown files in `artifacts/data/` directly
- Changes appear automatically on reload
- Use markdown syntax for formatting (headings, bold, lists, etc.)

### Add Images
- Place JPG images in `artifacts/images/` with naming pattern: `{decade}.jpg`
- Images automatically load if they exist
- Images are optional - markdown content displays with or without them

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom styling with variables and animations
- **JavaScript** - Dynamic content loading
- **Bootstrap 5** - Responsive framework
- **Marked.js** - Markdown to HTML conversion

## Color Scheme

- **Primary**: #8B3A62 (Burgundy)
- **Secondary**: #C1272D (Red)
- **Accent**: #FFD700 (Gold)
- **Background**: #f8f9fa (Light Gray)

## Browser Support

Works on all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- The website uses client-side rendering for dynamic content
- All markdown files are loaded via fetch API
- No backend server required for basic functionality
- Images are served statically

---

Created for RidgeHacks - Women in Sports History Project
