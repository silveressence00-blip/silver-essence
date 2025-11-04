/**
 * React Hook for Shopify cart management
 * 
 * Usage:
 * const { checkout, addItem, removeItem, updateQuantity, redirectToCheckout } = useShopifyCart();
 */

import { useState, useCallback } from 'react';
import { CartItem } from '../types/product';
import { createCheckout, addToCheckout, updateCheckoutItem, removeFromCheckout } from '../shopify/cart';

interface UseShopifyCartResult {
  checkoutId: string | null;
  checkoutUrl: string | null;
  items: CartItem[];
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  redirectToCheckout: () => void;
}

export function useShopifyCart(): UseShopifyCartResult {
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback(async (item: CartItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });

    // If no checkout exists, create one
    if (!checkoutId) {
      const url = await createCheckout([item]);
      if (url) {
        setCheckoutUrl(url);
        // Extract checkout ID from URL or response
      }
    } else {
      // Add to existing checkout
      await addToCheckout(checkoutId, [item]);
    }
  }, [checkoutId]);

  const removeItem = useCallback(async (itemId: string) => {
    setItems(prev => prev.filter(i => i.id !== itemId));

    if (checkoutId) {
      await removeFromCheckout(checkoutId, [itemId]);
    }
  }, [checkoutId]);

  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
    setItems(prev => 
      prev.map(i => 
        i.id === itemId ? { ...i, quantity } : i
      )
    );

    if (checkoutId) {
      await updateCheckoutItem(checkoutId, itemId, quantity);
    }
  }, [checkoutId]);

  const clearCart = useCallback(() => {
    setItems([]);
    setCheckoutId(null);
    setCheckoutUrl(null);
  }, []);

  const redirectToCheckout = useCallback(() => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  }, [checkoutUrl]);

  return {
    checkoutId,
    checkoutUrl,
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    redirectToCheckout,
  };
}
