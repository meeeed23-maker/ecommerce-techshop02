import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, Product } from '../models/models';

@Injectable({ providedIn: 'root' })
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>(this.loadFromStorage());
  items$ = this.itemsSubject.asObservable();

  private loadFromStorage(): CartItem[] {
    try {
      const stored = sessionStorage.getItem('cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  private saveToStorage(items: CartItem[]): void {
    sessionStorage.setItem('cart', JSON.stringify(items));
  }

  get items(): CartItem[] {
    return this.itemsSubject.value;
  }

  get totalItems(): number {
    return this.items.reduce((sum, item) => sum + item.quantite, 0);
  }

  get total(): number {
    const sum = this.items.reduce((acc, item) => acc + item.product.prix * item.quantite, 0);
    return Math.round(sum * 100) / 100;
  }

  addToCart(product: Product, quantite: number = 1): void {
    const current = [...this.items];
    const existingIndex = current.findIndex(i => i.product.id === product.id);

    if (existingIndex >= 0) {
      const newQty = current[existingIndex].quantite + quantite;
      current[existingIndex] = {
        ...current[existingIndex],
        quantite: Math.min(newQty, product.stock)
      };
    } else {
      current.push({ product, quantite: Math.min(quantite, product.stock) });
    }

    this.itemsSubject.next(current);
    this.saveToStorage(current);
  }

  removeFromCart(productId: number): void {
    const updated = this.items.filter(i => i.product.id !== productId);
    this.itemsSubject.next(updated);
    this.saveToStorage(updated);
  }

  updateQuantity(productId: number, quantite: number): void {
    if (quantite <= 0) {
      this.removeFromCart(productId);
      return;
    }
    const updated = this.items.map(item =>
      item.product.id === productId
        ? { ...item, quantite: Math.min(quantite, item.product.stock) }
        : item
    );
    this.itemsSubject.next(updated);
    this.saveToStorage(updated);
  }

  clearCart(): void {
    this.itemsSubject.next([]);
    sessionStorage.removeItem('cart');
  }
}
