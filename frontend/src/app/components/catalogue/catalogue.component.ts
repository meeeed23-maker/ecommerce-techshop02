import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/models';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery = '';
  loading = true;
  showToast = false;
  toastMessage = '';

  constructor(
    private productService: ProductService,
    public cartService: CartService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.productService.getAll().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  onSearch() {
    const q = this.searchQuery.toLowerCase().trim();
    this.filteredProducts = q
      ? this.products.filter(p =>
          p.nom.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q))
      : this.products;
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.toastMessage = `${product.nom} ajouté au panier !`;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 2500);
  }

  onImgError(event: any) {
    event.target.src = 'https://via.placeholder.com/400x300/1e1e2e/6366f1?text=Produit';
  }
}
