# API Reference - Silver Essence Shopify Integration

## Overview

This document describes the Shopify integration APIs used in the Silver Essence application.

---

## Table of Contents

1. [Shopify Client](#shopify-client)
2. [Products API](#products-api)
3. [Cart & Checkout API](#cart--checkout-api)
4. [React Hooks](#react-hooks)
5. [Type Definitions](#type-definitions)

---

## Shopify Client

### `shopifyFetch<T>(query: string, variables?: object): Promise<T>`

Execute a GraphQL query against Shopify Storefront API.

**Example:**
```typescript
import { shopifyFetch } from './lib/shopify/client';

const data = await shopifyFetch(`
  query {
    shop {
      name
    }
  }
`);
```

### `testShopifyConnection(): Promise<boolean>`

Test connection to Shopify store.

**Returns:** `true` if connection successful

**Example:**
```typescript
import { testShopifyConnection } from './lib/shopify/client';

const isConnected = await testShopifyConnection();
if (isConnected) {
  console.log('Connected to Shopify!');
}
```

---

## Products API

### `fetchShopifyProducts(): Promise<Product[]>`

Fetch all products from Shopify and map to local Product type.

**Returns:** Array of Product objects

**Example:**
```typescript
import { fetchShopifyProducts } from './lib/shopify/products';

const products = await fetchShopifyProducts();
console.log(`Loaded ${products.length} products`);
```

**GraphQL Query Used:**
```graphql
query GetProducts($first: Int!) {
  products(first: $first) {
    edges {
      node {
        id
        title
        handle
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              priceV2 {
                amount
                currencyCode
              }
              availableForSale
              selectedOptions {
                name
                value
              }
            }
          }
        }
        availableForSale
        tags
        metafields(identifiers: [...]) {
          key
          value
        }
      }
    }
  }
}
```

### `fetchProductByHandle(handle: string): Promise<Product | null>`

Fetch a single product by its handle (URL-safe ID).

**Parameters:**
- `handle`: Product handle (e.g., "celestial-diamond-pendant")

**Returns:** Product object or null if not found

---

## Cart & Checkout API

### `createCheckout(items: CartItem[]): Promise<string | null>`

Create a new checkout with initial cart items.

**Parameters:**
- `items`: Array of CartItem objects

**Returns:** Checkout web URL for redirect

**Example:**
```typescript
import { createCheckout } from './lib/shopify/cart';

const checkoutUrl = await createCheckout([
  {
    id: 'variant-id-123',
    quantity: 2,
    // ... other product fields
  }
]);

if (checkoutUrl) {
  window.location.href = checkoutUrl;
}
```

### `addToCheckout(checkoutId: string, items: CartItem[]): Promise<boolean>`

Add items to existing checkout.

**Parameters:**
- `checkoutId`: Existing checkout ID
- `items`: Items to add

**Returns:** `true` if successful

### `updateCheckoutItem(checkoutId: string, lineItemId: string, quantity: number): Promise<boolean>`

Update quantity of a line item in checkout.

**Parameters:**
- `checkoutId`: Checkout ID
- `lineItemId`: Line item ID to update
- `quantity`: New quantity

**Returns:** `true` if successful

### `removeFromCheckout(checkoutId: string, lineItemIds: string[]): Promise<boolean>`

Remove line items from checkout.

**Parameters:**
- `checkoutId`: Checkout ID
- `lineItemIds`: Array of line item IDs to remove

**Returns:** `true` if successful

---

## React Hooks

### `useShopifyProducts()`

Hook for fetching products with automatic fallback to local data.

**Returns:**
```typescript
{
  products: Product[],
  loading: boolean,
  error: Error | null
}
```

**Example:**
```typescript
import { useShopifyProducts } from './hooks/useShopifyProducts';

function ProductList() {
  const { products, loading, error } = useShopifyProducts();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

**Behavior:**
- Checks for Shopify credentials in environment
- Falls back to local products if not configured
- Caches results to avoid redundant API calls

### `useShopifyCart()`

Hook for managing Shopify checkout.

**Returns:**
```typescript
{
  checkoutId: string | null,
  checkoutUrl: string | null,
  items: CartItem[],
  addItem: (item: CartItem) => Promise<void>,
  removeItem: (itemId: string) => Promise<void>,
  updateQuantity: (itemId: string, quantity: number) => Promise<void>,
  clearCart: () => void,
  redirectToCheckout: () => void
}
```

**Example:**
```typescript
import { useShopifyCart } from './hooks/useShopifyCart';

function Cart() {
  const { items, addItem, removeItem, redirectToCheckout } = useShopifyCart();
  
  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          {item.name} - Qty: {item.quantity}
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <button onClick={redirectToCheckout}>Checkout</button>
    </div>
  );
}
```

---

## Type Definitions

### Product

```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  category: 'women' | 'men';
  jewelryType: 'rings' | 'earrings' | 'bracelets' | 'necklaces';
  materials: MaterialType[];
  sizes: SizeType[];
  inStock: boolean;
  rating: number;
  reviews: number;
}
```

### CartItem

```typescript
interface CartItem extends Product {
  quantity: number;
  selectedMaterial: MaterialType;
  selectedSize: SizeType;
}
```

### MaterialType

```typescript
type MaterialType = 'Silver' | 'Gold' | 'Rose Gold';
```

### SizeType

```typescript
type SizeType = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
```

---

## Error Handling

All API functions handle errors gracefully:

```typescript
try {
  const products = await fetchShopifyProducts();
} catch (error) {
  console.error('Shopify API error:', error);
  // Fallback to local data or show error message
}
```

Common error scenarios:
- **Invalid credentials**: Check environment variables
- **Rate limiting**: Implement retry logic with exponential backoff
- **Network errors**: Show user-friendly message
- **GraphQL errors**: Check query syntax and API version

---

## Rate Limits

Shopify Storefront API limits:
- **Standard**: 50 requests per second
- **Plus**: 100 requests per second

Best practices:
- Cache responses when possible
- Batch requests using GraphQL
- Implement debouncing for search
- Use pagination for large datasets

---

## Environment Variables

Required for production:

```env
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_token
VITE_SHOPIFY_API_VERSION=2024-01
```

Optional for development:

```env
SHOPIFY_ADMIN_API_TOKEN=admin_token
SHOPIFY_API_KEY=api_key
SHOPIFY_API_SECRET=api_secret
```

---

## Testing

Test your integration:

```typescript
import { testShopifyConnection } from './lib/shopify/client';

async function testIntegration() {
  console.log('Testing Shopify connection...');
  const connected = await testShopifyConnection();
  
  if (connected) {
    console.log('✅ Integration working!');
  } else {
    console.log('❌ Integration failed - check credentials');
  }
}
```

---

## Further Reading

- [Shopify Storefront API Docs](https://shopify.dev/docs/api/storefront)
- [Shopify GraphQL Explorer](https://shopify.dev/docs/api/storefront/graphiql)
- [Headless Commerce Best Practices](https://shopify.dev/docs/custom-storefronts/building-with-the-storefront-api/getting-started)
