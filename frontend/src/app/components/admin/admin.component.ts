import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/models';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  products: Product[] = [];
  showModal = false;
  editingProduct: Product | null = null;
  isSaving = false;
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  modalError = '';

  form: Product = this.emptyForm();

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll().subscribe(p => this.products = p);
  }

  emptyForm(): Product {
    return { nom: '', description: '', prix: 0, imageUrl: '', stock: 0 };
  }

  openModal(product?: Product) {
    this.modalError = '';
    if (product) {
      this.editingProduct = product;
      this.form = { ...product };
    } else {
      this.editingProduct = null;
      this.form = this.emptyForm();
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingProduct = null;
    this.form = this.emptyForm();
    this.modalError = '';
  }

  saveProduct() {
    if (!this.form.nom || !this.form.prix) {
      this.modalError = 'Veuillez remplir tous les champs obligatoires';
      return;
    }
    this.isSaving = true;
    this.modalError = '';

    const request = this.editingProduct?.id
      ? this.productService.update(this.editingProduct.id!, this.form)
      : this.productService.create(this.form);

    request.subscribe({
      next: () => {
        this.isSaving = false;
        this.closeModal();
        this.loadProducts();
        this.showNotification(
          this.editingProduct?.id ? 'Produit modifié !' : 'Produit créé !', 'success'
        );
      },
      error: (err) => {
        this.isSaving = false;
        this.modalError = err.error?.message || 'Erreur lors de la sauvegarde';
      }
    });
  }

  deleteProduct(product: Product) {
    if (!confirm(`Supprimer "${product.nom}" ?`)) return;

    this.productService.delete(product.id!).subscribe({
      next: () => {
        this.loadProducts();
        this.showNotification('Produit supprimé', 'success');
      },
      error: () => this.showNotification('Erreur lors de la suppression', 'error')
    });
  }

  showNotification(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
  }

  onImgError(event: any) {
    event.target.src = 'https://via.placeholder.com/48/1e1e2e/6366f1?text=P';
  }
}
