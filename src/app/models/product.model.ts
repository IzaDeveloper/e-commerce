export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category?: string;
  tags?: string[];
  offer?: boolean;
  offerPrice?: number;
  stock?: number;
  brand?: string;
}

export interface CartItem extends Product {
  quantity: number;
}