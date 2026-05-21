export interface Product {
  id?: number;
  nom: string;
  description: string;
  prix: number;
  imageUrl: string;
  stock: number;
}

export interface User {
  id?: number;
  username: string;
  role: 'ROLE_USER' | 'ROLE_ADMIN';
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  username: string;
  role: string;
}

export interface CartItem {
  product: Product;
  quantite: number;
}

export interface OrderRequest {
  items: { productId: number; quantite: number }[];
}

export interface OrderResponse {
  id: number;
  date: string;
  total: number;
  statut: string;
  message: string;
}
