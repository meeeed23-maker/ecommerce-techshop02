import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { CartItem } from '../../models/models';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  isLoading = false;
  errorMessage = '';
  orderConfirmed = false;
  confirmationMessage = '';
  orderId: number | null = null;
  orderTotal = 0;

  constructor(public cartService: CartService, private orderService: OrderService) {}

  get items(): CartItem[] {
    return this.cartService.items;
  }

  increment(item: CartItem) {
    this.cartService.updateQuantity(item.product.id!, item.quantite + 1);
  }

  decrement(item: CartItem) {
    this.cartService.updateQuantity(item.product.id!, item.quantite - 1);
  }

  remove(item: CartItem) {
    this.cartService.removeFromCart(item.product.id!);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  validateOrder() {
    if (this.items.length === 0) return;

    this.isLoading = true;
    this.errorMessage = '';

    const orderRequest = {
      items: this.items.map(i => ({
        productId: i.product.id!,
        quantite: i.quantite
      }))
    };

    this.orderService.placeOrder(orderRequest).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.orderConfirmed = true;
        this.confirmationMessage = response.message;
        this.orderId = response.id;
        this.orderTotal = response.total;
        this.cartService.clearCart();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.error || 'Erreur lors de la commande. Veuillez réessayer.';
      }
    });
  }

  onImgError(event: any) {
    event.target.src = 'https://via.placeholder.com/80/1e1e2e/6366f1?text=IMG';
  }
}
