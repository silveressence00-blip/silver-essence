# Deployment Guide - Silver Essence

## 🚀 Deployment Options

Choose the deployment method that best fits your needs:

1. **Headless (Recommended)**: Deploy React app separately + use Shopify for backend
2. **Embedded Theme**: Deploy as Shopify theme
3. **Hybrid**: Use both approaches

---

## Option 1: Headless Deployment (Vercel + Shopify)

### Prerequisites
- Vercel account (free tier available)
- Shopify store with Storefront API access
- Your environment variables ready

### Steps

#### 1. Install Vercel CLI
```bash
npm install -g vercel
```

#### 2. Login to Vercel
```bash
vercel login
```

#### 3. Deploy to Vercel
```bash
# From your project root
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Link to existing project? No
# - Project name: silver-essence
# - Directory: ./
# - Override settings? No
```

#### 4. Add Environment Variables in Vercel

Go to your Vercel dashboard → Project → Settings → Environment Variables

Add these variables:
- `VITE_SHOPIFY_STORE_DOMAIN`
- `VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN`
- `VITE_SHOPIFY_API_VERSION`

#### 5. Redeploy
```bash
vercel --prod
```

#### 6. Custom Domain (Optional)
- Go to Vercel dashboard → Domains
- Add your custom domain
- Update DNS records as instructed

### Benefits
- ✅ Faster performance
- ✅ Better SEO (with SSR)
- ✅ Full React ecosystem
- ✅ Free hosting on Vercel
- ✅ Automatic deployments from Git

---

## Option 2: Shopify Theme Deployment

### Prerequisites
- Shopify CLI installed
- Theme development store or paid Shopify plan
- Built React app

### Steps

#### 1. Build Your React App
```bash
npm run build
```

#### 2. Create Shopify Theme Structure
```bash
node scripts/create-shopify-theme.js
```

This creates a `/theme` directory with Shopify-compatible structure.

#### 3. Test Locally
```bash
cd theme
shopify theme dev --store=your-store.myshopify.com
```

Opens a preview URL like: https://your-store.myshopify.com?preview_theme_id=XXXXX

#### 4. Deploy to Shopify
```bash
# Deploy as unpublished theme
shopify theme push --unpublished

# Or publish immediately
shopify theme push --live
```

#### 5. Activate Theme
- Go to Shopify Admin → Online Store → Themes
- Find your uploaded theme
- Click "Publish" to make it live

### Benefits
- ✅ Single platform management
- ✅ Use Shopify's CDN
- ✅ Native cart/checkout
- ✅ No external hosting needed

---

## Option 3: Netlify Deployment

### Steps

#### 1. Create `netlify.toml`
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

#### 2. Deploy via Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

#### 3. Or Deploy via Git
- Push code to GitHub
- Connect repository in Netlify dashboard
- Add environment variables
- Deploy automatically on push

---

## 🔒 Security Checklist

Before deploying to production:

- [ ] All API keys in environment variables
- [ ] `.env.local` added to `.gitignore`
- [ ] No hardcoded credentials in code
- [ ] SSL certificate active (HTTPS)
- [ ] CORS configured properly
- [ ] Rate limiting implemented
- [ ] Error logging set up
- [ ] Analytics integrated

---

## 📊 Post-Deployment

### 1. Test Everything
- [ ] Homepage loads
- [ ] Product pages work
- [ ] Cart functionality
- [ ] Checkout process
- [ ] Mobile responsiveness
- [ ] Forms submit correctly
- [ ] Images load

### 2. Set Up Analytics
```tsx
// Add to App.tsx
import { useEffect } from 'react';

useEffect(() => {
  // Google Analytics
  if (import.meta.env.VITE_GOOGLE_ANALYTICS_ID) {
    // Initialize GA
  }
}, []);
```

### 3. Configure SEO
- Add meta tags
- Set up sitemap
- Configure robots.txt
- Add Open Graph images
- Set up structured data

### 4. Performance Optimization
- Enable Vercel/Netlify analytics
- Configure caching headers
- Optimize images (use Shopify CDN)
- Enable compression
- Monitor Core Web Vitals

---

## 🔄 Continuous Deployment

### GitHub Actions (Example)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          VITE_SHOPIFY_STORE_DOMAIN: ${{ secrets.SHOPIFY_STORE_DOMAIN }}
          VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN: ${{ secrets.SHOPIFY_TOKEN }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Shopify API Errors
- Check credentials are correct
- Verify API scopes
- Check rate limits
- Review API version compatibility

### Images Not Loading
- Use Shopify CDN URLs
- Check CORS settings
- Verify image paths
- Optimize image sizes

---

## 📞 Support

- **Vercel**: https://vercel.com/support
- **Shopify**: https://help.shopify.com
- **Netlify**: https://www.netlify.com/support

---

**Ready to deploy?** Start with the headless approach for best results!
