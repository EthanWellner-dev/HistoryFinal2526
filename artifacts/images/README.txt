# Artifact Images Guide

To add images for each decade's artifacts, place JPG image files in this directory with the following naming convention:

- `40s.jpg` - Image for 1940s artifacts
- `50s.jpg` - Image for 1950s artifacts
- `60s.jpg` - Image for 1960s artifacts
- `70s.jpg` - Image for 1970s+ artifacts

## Image Requirements

- **Format**: JPG/JPEG recommended
- **Size**: Recommended minimum width of 800px
- **Aspect Ratio**: Any aspect ratio works, but 16:9 or 4:3 are ideal
- **File Size**: Keep under 500KB for optimal loading

## How It Works

The artifact-loader.js script will automatically:
1. Check if an image file exists for the current decade
2. Display the image above the markdown content if found
3. Scale responsively based on screen size
4. Show just the markdown if no image is available

You can add or remove images without changing any code - the system handles missing images gracefully.
