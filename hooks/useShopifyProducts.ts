/**
 * React Hook for fetching Shopify products
 * 
 * Usage:
 * const { products, loading, error } = useShopifyProducts();
 */

import { useState, useEffect } from 'react';
import { Product } from '../types/product';
import { fetchShopifyProducts } from '../shopify/products';
import { products as localProducts } from '../data/products';

interface UseShopifyProductsResult {
  products: Product[];
  loading: boolean;
  error: Error | null;
}

export function useShopifyProducts(): UseShopifyProductsResult {
  const [products, setProducts] = useState<Product[]>(localProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Check if Shopify credentials are configured
    const hasShopifyConfig = 
      import.meta.env.VITE_SHOPIFY_STORE_DOMAIN && 
      import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

    if (!hasShopifyConfig) {
      console.log('ℹ️ Using local product data. Configure Shopify credentials to use live data.');
      return;
    }

    // Fetch from Shopify
    async function loadProducts() {
      setLoading(true);
      try {
        const shopifyProducts = await fetchShopifyProducts();
        
        if (shopifyProducts.length > 0) {
          setProducts(shopifyProducts);
          console.log(`✅ Loaded ${shopifyProducts.length} products from Shopify`);
        } else {
          console.log('ℹ️ No products found in Shopify, using local data');
        }
      } catch (err) {
        setError(err as Error);
        console.error('❌ Error loading Shopify products, falling back to local data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return { products, loading, error };
}
