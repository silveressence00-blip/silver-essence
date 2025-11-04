# Quick Start Guide - Silver Essence

Get up and running in 5 minutes!

## 🎯 Goal

This guide will help you:
1. Run the app locally
2. Connect to Shopify (optional)
3. Deploy to production

---

## 📋 Prerequisites

Before starting, make sure you have:

- [x] Node.js 18+ installed ([Download](https://nodejs.org/))
- [x] npm or yarn package manager
- [x] Code editor (VS Code recommended)
- [x] Git installed
- [ ] Shopify store (optional, for live data)

---

## Step 1: Installation (2 minutes)

### Clone the Repository

```bash
# Option A: If you have the code locally
cd silver-essence

# Option B: If cloning from Git
git clone https://github.com/yourusername/silver-essence.git
cd silver-essence
```

### Install Dependencies

```bash
npm install
```

This will install all required packages (~2 minutes).

---

## Step 2: Run Locally (30 seconds)

### Start Development Server

```bash
npm run dev
```

You should see:

```
  VITE v5.1.4  ready in 523 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Open in Browser

Open [http://localhost:5173](http://localhost:5173)

You should see the Silver Essence luxury jewelry store! 🎉

---

## Step 3: Explore the App (1 minute)

Try these features:

1. **Browse Products**: Click "Women" or "Men" tabs
2. **Filter by Category**: Select Rings, Earrings, Bracelets, or Necklaces
3. **View Details**: Click any product card
4. **Add to Cart**: Select material, size, and add to cart
5. **View Cart**: Click the cart icon (top right)
6. **Interactive Globe**: Scroll down to see shipping countries

---

## Step 4: Connect to Shopify (Optional)

Want to use real Shopify products instead of mock data?

### 4.1 Create Storefront API Token

1. Go to your Shopify Admin
2. Navigate to **Settings** → **Apps and sales channels**
3. Click **Develop apps** → **Create an app**
4. Name it "Silver Essence Storefront"
5. Go to **Configuration** → **Storefront API**
6. Enable these scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_write_checkouts`
7. Click **Install app**
8. Copy the **Storefront Access Token**

### 4.2 Set Up Environment Variables

```bash
# Copy the example file
cp .env.example .env.local
```

Edit `.env.local` and add your credentials:

```env
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=paste_your_token_here
VITE_SHOPIFY_API_VERSION=2024-01
```

### 4.3 Restart Dev Server

```bash
# Stop the server (Ctrl+C)
# Start again
npm run dev
```

Now your app will fetch real products from Shopify! 🚀

---

## Step 5: Deploy to Production

### Option A: Deploy to Vercel (Easiest)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow the prompts (defaults are fine)
```

When prompted, add your environment variables from `.env.local`.

**Done!** Your site is now live at `https://your-project.vercel.app`

### Option B: Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### Option C: Deploy as Shopify Theme

```bash
# Build the app
npm run build

# Create Shopify theme structure
npm run shopify:theme

# Deploy to Shopify
cd theme
shopify theme push
```

---

## ✅ Success Checklist

You're all set if you can:

- [x] See the app running at localhost:5173
- [x] Browse products
- [x] Add items to cart
- [x] View cart with correct totals
- [x] (Optional) See Shopify products if connected
- [x] (Optional) Deployed to production

---

## 🎨 Customization

Want to customize the app?

### Change Brand Colors

Edit `/styles/globals.css`:

```css
:root {
  --color-cream: #FAF9F6;  /* Change this */
  --color-teal: #008080;   /* And this */
}
```

### Add Your Logo

Replace `/public/logo.png` with your logo image.

### Modify Products

Edit `/data/products.ts` to add, remove, or modify products.

---

## 📚 Learn More

- **[Full Integration Guide](./SHOPIFY-INTEGRATION-GUIDE.md)**: Detailed Shopify setup
- **[Deployment Guide](./DEPLOYMENT.md)**: All deployment options
- **[API Reference](./API-REFERENCE.md)**: Shopify API usage
- **[Troubleshooting](./TROUBLESHOOTING.md)**: Common issues

---

## 🆘 Having Issues?

### App Won't Start

```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npm run dev
```

### Products Not Loading

Check browser console (F12) for errors. Most common:
- Missing environment variables
- Invalid Shopify credentials
- Network/CORS issues

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for solutions.

### Need Help?

1. Check the [Troubleshooting Guide](./TROUBLESHOOTING.md)
2. Review error messages in browser console
3. Verify environment variables are set correctly

---

## 🎉 You're Ready!

You now have a fully functional luxury jewelry e-commerce store running!

**Next steps**:
1. Customize colors and branding
2. Add your products (or sync from Shopify)
3. Configure payment methods in Shopify
4. Set up shipping rates
5. Launch! 🚀

---

**Questions?** Check the [full documentation](./SHOPIFY-INTEGRATION-GUIDE.md) or [API reference](./API-REFERENCE.md).
