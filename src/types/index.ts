

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