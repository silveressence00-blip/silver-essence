export type MaterialType = 'silver' | 'gold' | 'rose-gold';
export type SizeType = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'not-applicable';
export type JewelryCategory = 'rings' | 'earrings' | 'bracelets' | 'necklaces';

export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  modelImage?: string;
  description: string;
  craftsmanship?: string;
  category: 'women' | 'men';
  jewelryType: JewelryCategory;
  materials: MaterialType[];
  sizes: SizeType[];
  inStock: boolean;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedMaterial: MaterialType;
  selectedSize: SizeType;
}
