export const ROLES = {
  CUSTOMER: "CUSTOMER",
  SELLER: "SELLER",
  ADMIN: "ADMIN",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ORDER_STATUSES = {
  PLACED: "PLACED",
  PROCESSING: "PROCESSING",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
} as const;

export type OrderStatus = (typeof ORDER_STATUSES)[keyof typeof ORDER_STATUSES];

export interface Category {
  id: number;
  name: string;
}

export interface Review {
  id: number;
  rating: number;
  comment: string | null;
  customerId: number;
  customer?: {
    id: number;
    name: string;
  };
  createdAt: string;
}

export interface Medicine {
  id: number; 
  name: string;
  description: string;
  price: number;
  stock: number;
  manufacturer: string;
  category: Category; 
  reviews?: Review[]; 
  imageUrl?: string;
}

export interface CartItem {
  medicine: Medicine;
  quantity: number;
}