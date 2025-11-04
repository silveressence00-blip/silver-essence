# Troubleshooting Guide - Silver Essence

Common issues and solutions for Shopify integration.

---

## 🔒 Authentication & Credentials

### Issue: "Access denied" or "Unauthorized" errors

**Symptoms:**
- 401 Unauthorized responses
- GraphQL returns authentication errors

**Solutions:**

1. **Check your credentials in `.env.local`**
   ```bash
   # Verify these are set correctly
   VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_token
   ```

2. **Verify token scopes**
   - Go to Shopify Admin → Apps → Develop apps
   - Check that your app has required scopes:
     - `unauthenticated_read_product_listings`
     - `unauthenticated_write_checkouts`
     - etc.

3. **Regenerate access token**
   - If token was shared publicly, revoke and create new one
   - Update `.env.local` with new token
   - Restart dev server

4. **Check API version**
   - Ensure `VITE_SHOPIFY_API_VERSION` matches your API setup
   - Shopify deprecates old versions periodically

---

## 🛒 Products Not Loading

### Issue: Products array is empty

**Symptoms:**
- `useShopifyProducts()` returns empty array
- Console shows "No products found"

**Solutions:**

1. **Check if products exist in Shopify**
   ```bash
   # Test connection
   node -e "import('./lib/shopify/client.js').then(m => m.testShopifyConnection())"
   ```

2. **Verify product status**
   - Products must be published to "Online Store" channel
   - Check product availability in Shopify Admin

3. **Check metafields**
   - Ensure custom metafields are configured:
     - `custom.category`
     - `custom.jewelry_type`
     - `custom.rating`
     - `custom.reviews`

4. **Increase query limit**
   ```typescript
   // In products.ts, increase first parameter
   const data = await shopifyFetch(GET_PRODUCTS_QUERY, { first: 100 });
   ```

5. **Check GraphQL response**
   ```typescript
   const data = await shopifyFetch(GET_PRODUCTS_QUERY, { first: 10 });
   console.log(JSON.stringify(data, null, 2));
   ```

---

## 🛍️ Cart & Checkout Issues

### Issue: Cart not persisting / Checkout fails

**Symptoms:**
- Cart items disappear on refresh
- Checkout URL is null
- "Checkout not found" errors

**Solutions:**

1. **Store checkout ID in localStorage**
   ```typescript
   // After creating checkout
   localStorage.setItem('checkoutId', checkoutId);
   
   // On load
   const savedCheckoutId = localStorage.getItem('checkoutId');
   ```

2. **Check variant IDs**
   - Ensure you're using Shopify variant IDs, not product IDs
   - Variant IDs look like: `gid://shopify/ProductVariant/123456`

3. **Verify checkout scopes**
   - App needs `unauthenticated_write_checkouts` scope
   - Regenerate token if scope missing

4. **Handle expired checkouts**
   ```typescript
   // Checkouts expire after 24 hours
   if (checkoutError?.message.includes('not found')) {
     clearCart();
     createNewCheckout();
   }
   ```

---

## 🖼️ Images Not Loading

### Issue: Product images broken or missing

**Symptoms:**
- Broken image icons
- CORS errors in console
- Images work in Shopify but not in app

**Solutions:**

1. **Use Shopify CDN URLs**
   ```typescript
   // Correct: Shopify CDN
   https://cdn.shopify.com/s/files/1/...
   
   // Incorrect: External URLs
   https://unsplash.com/...
   ```

2. **Upload images to Shopify**
   - Shopify Admin → Content → Files
   - Upload images
   - Copy CDN URL
   - Update product images

3. **Check image permissions**
   - Ensure images are public
   - Verify no IP restrictions

4. **Use ImageWithFallback component**
   ```tsx
   import { ImageWithFallback } from './components/figma/ImageWithFallback';
   
   <ImageWithFallback src={image} alt={name} />
   ```

---

## 🌐 CORS Errors

### Issue: Cross-Origin Request Blocked

**Symptoms:**
- Console error: "CORS policy blocked"
- API calls fail from browser

**Solutions:**

1. **Use Storefront API (not Admin API)**
   ```typescript
   // ✅ Correct: Storefront API (CORS-enabled)
   https://your-store.myshopify.com/api/2024-01/graphql.json
   
   // ❌ Wrong: Admin API (no CORS)
   https://your-store.myshopify.com/admin/api/2024-01/graphql.json
   ```

2. **Admin API must be server-side**
   - Move Admin API calls to backend/scripts
   - Use Storefront API in React app

3. **Check proxy configuration**
   - If using a proxy, ensure proper headers:
   ```javascript
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
   ```

---

## 🔄 Build & Deployment Errors

### Issue: Build fails with import errors

**Symptoms:**
```
Error: Cannot find module 'graphql-request'
Module not found: Can't resolve './lib/shopify'
```

**Solutions:**

1. **Install missing dependencies**
   ```bash
   npm install graphql-request graphql
   ```

2. **Check file extensions**
   ```typescript
   // Include .ts extension in imports
   import { shopifyFetch } from './lib/shopify/client';
   ```

3. **Clear cache and rebuild**
   ```bash
   rm -rf node_modules dist .vite
   npm install
   npm run build
   ```

4. **Check TypeScript config**
   - Ensure `tsconfig.json` includes lib/shopify directory
   - Verify `moduleResolution: "bundler"`

### Issue: Environment variables not working in production

**Symptoms:**
- Works locally but fails in production
- Undefined environment variables

**Solutions:**

1. **Add variables in hosting platform**
   - **Vercel**: Dashboard → Settings → Environment Variables
   - **Netlify**: Dashboard → Site settings → Environment variables
   - **Shopify**: Use theme settings instead

2. **Use `VITE_` prefix for client-side variables**
   ```env
   # ✅ Correct: Accessible in browser
   VITE_SHOPIFY_STORE_DOMAIN=...
   
   # ❌ Wrong: Only available in Node.js
   SHOPIFY_STORE_DOMAIN=...
   ```

3. **Rebuild after adding variables**
   ```bash
   # Vercel
   vercel --prod
   
   # Netlify
   netlify deploy --prod
   ```

---

## ⚡ Performance Issues

### Issue: Slow loading times

**Symptoms:**
- Long wait for products to load
- Laggy interactions
- High bounce rate

**Solutions:**

1. **Implement caching**
   ```typescript
   const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
   let cachedProducts = null;
   let cacheTime = 0;
   
   if (Date.now() - cacheTime < CACHE_DURATION && cachedProducts) {
     return cachedProducts;
   }
   ```

2. **Use pagination**
   ```graphql
   query GetProducts($first: Int!, $after: String) {
     products(first: $first, after: $after) {
       edges {
         cursor
         node { ... }
       }
       pageInfo {
         hasNextPage
         endCursor
       }
     }
   }
   ```

3. **Lazy load images**
   ```tsx
   <img src={image} loading="lazy" />
   ```

4. **Reduce initial bundle size**
   ```typescript
   // Use dynamic imports
   const Globe = lazy(() => import('./components/InteractiveGlobe'));
   ```

---

## 📱 Mobile Issues

### Issue: Layout broken on mobile

**Symptoms:**
- Elements overflow screen
- Text unreadable
- Touch targets too small

**Solutions:**

1. **Test responsive design**
   ```bash
   # Open dev server
   npm run dev
   
   # Use browser DevTools → Toggle device toolbar
   # Test on iPhone, Android, iPad
   ```

2. **Check viewport meta tag**
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```

3. **Use Tailwind responsive classes**
   ```tsx
   <div className="px-4 md:px-8 lg:px-12">
   ```

4. **Test touch interactions**
   - Ensure buttons are at least 44x44px
   - Add appropriate touch feedback

---

## 🔍 Debugging Tools

### Enable detailed logging

```typescript
// In client.ts
export async function shopifyFetch<T>(query: string, variables?: any): Promise<T> {
  console.log('📤 Shopify Request:', { query, variables });
  
  const data = await shopifyClient.request<T>(query, variables);
  
  console.log('📥 Shopify Response:', data);
  return data;
}
```

### Use GraphQL explorer

Test queries in Shopify's GraphQL explorer:
1. Go to: https://shopify.dev/docs/api/storefront/graphiql
2. Add your store domain and access token
3. Test queries before implementing

### Browser DevTools

- **Network tab**: Check API requests/responses
- **Console tab**: View errors and logs
- **Application tab**: Check localStorage, session storage
- **Performance tab**: Identify bottlenecks

---

## 📞 Getting Help

Still stuck? Try these resources:

1. **Shopify Community**: https://community.shopify.com
2. **Stack Overflow**: Tag with `shopify` and `storefront-api`
3. **Shopify Support**: Available on paid plans
4. **Documentation**: https://shopify.dev/docs

---

## ✅ Prevention Checklist

Avoid issues by following these best practices:

- [ ] Always use environment variables for credentials
- [ ] Never commit `.env.local` to Git
- [ ] Use Storefront API for client-side, Admin API for server-side
- [ ] Implement error boundaries in React
- [ ] Add loading states for async operations
- [ ] Cache API responses where appropriate
- [ ] Test on multiple devices/browsers
- [ ] Monitor error logs in production
- [ ] Keep dependencies updated
- [ ] Use TypeScript for type safety

---

**Need more help?** Check the other documentation files in `/docs`.
