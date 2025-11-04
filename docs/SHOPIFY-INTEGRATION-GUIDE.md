# Silver Essence - Shopify Integration Guide

## 🔐 Security First - Revoke Your Credentials!

**URGENT**: The credentials you shared publicly need to be revoked immediately:

1. Go to your Shopify Admin: `https://your-store.myshopify.com/admin`
2. Navigate to **Settings** → **Apps and sales channels** → **Develop apps**
3. Find your app and **revoke** the current access token
4. Generate new credentials with the same scopes
5. Never share these credentials publicly again

---

## 📋 Prerequisites

Before starting, ensure you have:

- [x] Node.js 18+ installed
- [x] Shopify store admin access
- [x] Shopify CLI installed: `npm install -g @shopify/cli @shopify/theme`
- [x] Git installed
- [x] Code editor (VS Code recommended)

---

## 🏗️ Integration Architecture

Your Silver Essence React app can be integrated with Shopify in **two main approaches**:

### Option 1: Headless Shopify (Recommended)
- Keep your React app separate
- Use Shopify Storefront API for product data
- Host on Vercel/Netlify
- Use Shopify's checkout
- **Best for**: Full creative control, modern tech stack

### Option 2: Embedded Theme
- Convert React app to Shopify theme
- Use theme.liquid structure
- Host directly on Shopify
- **Best for**: Easier management, unified hosting

This guide covers **both approaches**.

---

## 🚀 Approach 1: Headless Shopify (Recommended)

### Step 1: Set Up Environment Variables

Create `.env.local` file in your project root:

```env
# Shopify Store Configuration
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_token_here

# Optional: Admin API (for product management)
SHOPIFY_ADMIN_API_TOKEN=your_admin_token_here
SHOPIFY_API_KEY=your_api_key_here
SHOPIFY_API_SECRET=your_api_secret_here
```

**Important**: Add `.env.local` to your `.gitignore`!

### Step 2: Create Storefront API Token

1. Go to Shopify Admin → **Settings** → **Apps and sales channels**
2. Click **Develop apps** → **Create an app**
3. Name it "Silver Essence Headless"
4. Go to **Configuration** → **Storefront API**
5. Enable these scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`
6. **Install app** and copy the Storefront Access Token
7. Paste it in your `.env.local` file

### Step 3: Install Dependencies

```bash
npm install @shopify/storefront-api-client graphql-request
```

### Step 4: Use the Shopify Service Files

The service files are already created in `/lib/shopify/` directory. Just update your `.env.local` with real credentials.

### Step 5: Update Product Data Source

Modify `/components/Store.tsx` to fetch from Shopify instead of local data:

```tsx
import { useShopifyProducts } from '../hooks/useShopifyProducts';

// Replace
// import { products } from '../data/products';

// With
const { products, loading } = useShopifyProducts();
```

### Step 6: Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# Project Settings → Environment Variables
```

---

## 🎨 Approach 2: Embedded Shopify Theme

### Step 1: Build React App

```bash
npm run build
```

This creates a `dist/` folder with your compiled app.

### Step 2: Create Shopify Theme Structure

Use the provided `/scripts/create-shopify-theme.js` script:

```bash
node scripts/create-shopify-theme.js
```

This will:
- Create a `theme/` directory
- Set up Liquid templates
- Copy your React build files to `assets/`
- Generate proper theme structure

### Step 3: Test Theme Locally

```bash
# Navigate to theme directory
cd theme

# Start Shopify development server
shopify theme dev --store=your-store.myshopify.com
```

### Step 4: Deploy to Shopify

```bash
# From theme directory
shopify theme push

# Or publish as new theme
shopify theme push --unpublished
```

---

## 📦 Product Data Migration

### Sync Products from Shopify

Your current products are in `/data/products.ts`. To sync with Shopify:

1. **Option A: Manual Upload**
   - Go to Shopify Admin → Products
   - Add each product manually
   - Match image URLs and descriptions

2. **Option B: CSV Import**
   - Export current products to CSV using the provided script
   - Import to Shopify Admin → Products → Import

3. **Option C: API Script**
   - Use the `/scripts/sync-products-to-shopify.js` script
   - Requires Admin API credentials

```bash
node scripts/sync-products-to-shopify.js
```

---

## 🛒 Cart & Checkout Integration

### Headless Approach
- Use Shopify Storefront API's `checkoutCreate` mutation
- Redirect to Shopify checkout URL
- Already implemented in `/lib/shopify/checkout.ts`

### Embedded Theme Approach
- Use Shopify's native cart system
- Form POST to `/cart/add.js`
- Redirect to `/checkout`

---

## 🔧 Custom Domain Setup

1. Purchase domain (e.g., silveressence.com)
2. **Headless**: Point to Vercel/Netlify
3. **Embedded**: Add in Shopify Admin → Settings → Domains

---

## 📊 Testing Checklist

Before going live:

- [ ] All products display correctly
- [ ] Cart add/remove works
- [ ] Checkout redirects properly
- [ ] Images load (use Shopify CDN)
- [ ] Mobile responsive
- [ ] SSL certificate active
- [ ] Analytics installed
- [ ] Payment methods tested
- [ ] Shipping rates configured
- [ ] Email notifications work

---

## 🐛 Common Issues & Solutions

### Issue: CORS Errors
**Solution**: Use Storefront API, not Admin API in frontend

### Issue: Images not loading
**Solution**: Upload images to Shopify → Content → Files, use CDN URLs

### Issue: Cart not syncing
**Solution**: Check Storefront API token scopes

### Issue: Slow performance
**Solution**: Implement lazy loading, optimize images, use CDN

---

## 📚 Additional Resources

- [Shopify Storefront API Docs](https://shopify.dev/docs/api/storefront)
- [Shopify Theme Development](https://shopify.dev/docs/themes)
- [Shopify CLI Reference](https://shopify.dev/docs/themes/tools/cli)
- [Headless Commerce Guide](https://shopify.dev/docs/custom-storefronts)

---

## 🆘 Support

For Shopify-specific issues:
- Shopify Community Forums
- Shopify Support (if on paid plan)
- Stack Overflow (tag: shopify)

For this app:
- Check `/docs/TROUBLESHOOTING.md`
- Review `/docs/API-REFERENCE.md`

---

**Next Steps**: Choose your approach (Headless vs Embedded) and follow the respective section above.
