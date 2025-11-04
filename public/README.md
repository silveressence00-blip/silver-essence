# Public Assets

This folder contains all static images used in the Silver Essence store.

## Required Images

Replace these placeholder files with your actual images:

### 1. logo.png
- **Description**: Silver Essence logo with interlocking geometric design
- **Recommended size**: 500x500px (transparent background)
- **Format**: PNG with transparency
- **Usage**: Header, footer, intro sequence

### 2. world-map.png
- **Description**: World map showing shipping countries
- **Recommended size**: 1200x600px
- **Format**: PNG or JPG
- **Usage**: Shipping section

### 3. model-asian.png
- **Description**: Model wearing jewelry (Heritage Collection)
- **Recommended size**: 800x1200px (portrait)
- **Format**: PNG or JPG
- **Usage**: Jewelry showcase carousel

### 4. jewelry-set.png
- **Description**: Jewelry set product photo (Celestial Star)
- **Recommended size**: 800x800px
- **Format**: PNG or JPG
- **Usage**: Jewelry showcase carousel

### 5. model-white.png
- **Description**: Model wearing jewelry (Modern Luxe)
- **Recommended size**: 800x1200px (portrait)
- **Format**: PNG or JPG
- **Usage**: Jewelry showcase carousel

## Image Guidelines

- **Quality**: Use high-resolution images (300 DPI for print quality)
- **Optimization**: Compress images for web (use tools like TinyPNG)
- **Format**: PNG for logos/transparency, JPG for photos
- **Size**: Keep files under 1MB each for faster loading
- **Naming**: Use exact names as listed above (lowercase, hyphens)

## Adding More Images

To add additional product images:
1. Place them in this `/public` folder
2. Reference them in code as `/your-image.png`
3. Update product data in `/data/products.ts`

## Example Usage

```tsx
// In React component
<img src="/logo.png" alt="Silver Essence" />

// In CSS
background-image: url('/world-map.png');
```

---

**Note**: The current placeholder files are just guides. Replace them with your actual brand assets.
