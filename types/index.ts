export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  stock: number;
  unit: string;
  description?: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number;
  image: string;
  validUntil: string;
  category?: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  items: CartItem[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  loyaltyPoints?: number;
}