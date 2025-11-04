# Silver Essence - Luxury Jewelry E-Commerce

A premium, cinematic luxury jewelry e-commerce store built with React, featuring futuristic metallic design, full shopping cart functionality, and Shopify integration capabilities.

![Silver Essence](./public/logo.png)

## ✨ Features

- 🎨 **Cinematic Design**: Futuristic metallic glow theme with teal (#008080) and cream white (#FAF9F6) brand colors
- 🛒 **Full E-Commerce**: Complete shopping cart, checkout flow, and product management
- 🌍 **Interactive Globe**: 3D globe showing worldwide shipping countries
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- 🔒 **Shopify Ready**: Built-in integration with Shopify Storefront API
- ⚡ **High Performance**: Optimized React components with Vite build system
- 🎭 **Premium UX**: Luxury spacing, smooth interactions, and polished animations

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/silver-essence.git
cd silver-essence
npm install
```

### 2. Set Up Environment

```bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local with your Shopify credentials
# See docs/SHOPIFY-INTEGRATION-GUIDE.md for details
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
silver-essence/
├── components/           # React components
│   ├── ui/              # Shadcn UI components
│   ├── Store.tsx        # Main store component
│   ├── Cart.tsx         # Shopping cart
│   ├── ProductCard.tsx  # Product display
│   └── ...
├── lib/                 # Library code
│   └── shopify/         # Shopify API integration
│       ├── client.ts    # GraphQL client
│       ├── products.ts  # Product fetching
│       └── cart.ts      # Cart & checkout
├── hooks/               # React hooks
│   ├── useShopifyProducts.ts
│   └── useShopifyCart.ts
├── data/                # Static data
│   └── products.ts      # Product catalog
├── types/               # TypeScript types
├── styles/              # Global styles
├── scripts/             # Build & deploy scripts
├── docs/                # Documentation
│   ├── SHOPIFY-INTEGRATION-GUIDE.md
│   ├── DEPLOYMENT.md
│   ├── API-REFERENCE.md
│   └── TROUBLESHOOTING.md
└── public/              # Static assets
```

## 🛍️ Product Catalog

Currently includes **36 luxury jewelry pieces**:

### Women's Collection (24 items)
- 6 Necklaces
- 6 Earrings
- 6 Bracelets
- 6 Rings

### Men's Collection (12 items)
- 6 Rings
- 6 Bracelets

All products feature:
- Multiple material options (Silver, Gold, Rose Gold)
- Various sizes
- High-quality images
- Detailed descriptions
- Customer ratings & reviews

## 🔌 Shopify Integration

This app supports two integration approaches:

### Option 1: Headless (Recommended)

Deploy React app separately and use Shopify Storefront API:

```bash
# Install GraphQL dependencies
npm install graphql-request graphql

# Configure environment variables
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_token

# Deploy to Vercel
npm install -g vercel
vercel
```

### Option 2: Embedded Theme

Convert to Shopify theme structure:

```bash
# Build React app
npm run build

# Create Shopify theme
npm run shopify:theme

# Deploy to Shopify
cd theme
shopify theme push
```

**See [docs/SHOPIFY-INTEGRATION-GUIDE.md](./docs/SHOPIFY-INTEGRATION-GUIDE.md) for detailed instructions.**

## 📦 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run shopify:theme` | Create Shopify theme structure |
| `npm run shopify:sync` | Sync products to Shopify |

## 🎨 Design System

### Brand Colors

- **Cream White**: `#FAF9F6` - Primary background
- **Teal**: `#008080` - Primary accent
- **Black**: `#000000` - Background & text
- **Metallic Effects**: Silver gradients & glows

### Typography

Custom typography system with premium spacing:
- Defined in `styles/globals.css`
- Museum-quality spacing (tripled throughout)
- Responsive font sizes

### Components

Built with Shadcn UI components:
- Accessible & customizable
- Fully typed with TypeScript
- Located in `/components/ui`

## 🚢 Deployment

### Vercel (Recommended)

```bash
vercel --prod
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Shopify Theme

```bash
cd theme
shopify theme push --live
```

**See [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) for complete deployment guide.**

## 📚 Documentation

- **[Shopify Integration Guide](./docs/SHOPIFY-INTEGRATION-GUIDE.md)**: Complete setup instructions
- **[Deployment Guide](./docs/DEPLOYMENT.md)**: Deploy to various platforms
- **[API Reference](./docs/API-REFERENCE.md)**: Shopify API usage
- **[Troubleshooting](./docs/TROUBLESHOOTING.md)**: Common issues & solutions

## 🔐 Security

**Important**: Never commit sensitive credentials!

- Always use `.env.local` for credentials
- Never share Admin API tokens publicly
- Use Storefront API for client-side code
- Revoke and regenerate tokens if exposed

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite 5
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Shadcn UI
- **Icons**: Lucide React
- **3D Globe**: react-globe.gl
- **Forms**: React Hook Form
- **Toast Notifications**: Sonner
- **E-Commerce Backend**: Shopify Storefront API

## 📄 License

MIT License - See [LICENSE](./LICENSE-Code-component-107-37.txt) file for details.

## 🤝 Contributing

This is a private project, but suggestions and feedback are welcome!

## 📞 Support

For issues or questions:

1. Check [docs/TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)
2. Review [docs/API-REFERENCE.md](./docs/API-REFERENCE.md)
3. Contact Silver Essence support

## 🎯 Next Steps

After installation:

1. ✅ Set up environment variables (`.env.local`)
2. ✅ Configure Shopify store connection
3. ✅ Sync products to Shopify (optional)
4. ✅ Customize brand colors & styling
5. ✅ Test checkout flow
6. ✅ Deploy to production

---

**Built with ❤️ for luxury jewelry retail**

Silver Essence - Where Elegance Meets Technology
