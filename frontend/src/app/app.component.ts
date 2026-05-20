import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav class="navbar">
      <div class="nav-container">
        <a routerLink="/" class="nav-brand">
          <span class="brand-icon">⚡</span>
          <span class="brand-text">TechShop</span>
        </a>

        <div class="nav-links">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
            Catalogue
          </a>
          <a *ngIf="auth.isAdmin" routerLink="/admin" routerLinkActive="active">
            Admin
          </a>
        </div>

        <div class="nav-actions">
          <a *ngIf="auth.isLoggedIn" routerLink="/cart" class="cart-btn">
            🛒 <span class="cart-count" *ngIf="cartCount > 0">{{ cartCount }}</span>
          </a>

          <ng-container *ngIf="!auth.isLoggedIn">
            <a routerLink="/login" class="btn-outline">Connexion</a>
            <a routerLink="/register" class="btn-primary">Inscription</a>
          </ng-container>

          <ng-container *ngIf="auth.isLoggedIn">
            <span class="user-info">
              <span class="user-role" [class.admin]="auth.isAdmin">
                {{ auth.isAdmin ? '👑' : '👤' }}
              </span>
              {{ auth.currentUser?.username }}
            </span>
            <button (click)="logout()" class="btn-outline">Déconnexion</button>
          </ng-container>
        </div>
      </div>
    </nav>

    <main>
      <router-outlet />
    </main>
  `,
  styles: [`
    :host { display: block; }

    .navbar {
      background: #0f0f1a;
      border-bottom: 1px solid rgba(99, 102, 241, 0.3);
      position: sticky;
      top: 0;
      z-index: 100;
      backdrop-filter: blur(10px);
    }

    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
      display: flex;
      align-items: center;
      height: 64px;
      gap: 2rem;
    }

    .nav-brand {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      font-size: 1.3rem;
      font-weight: 700;
    }

    .brand-icon { font-size: 1.4rem; }

    .brand-text {
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .nav-links {
      display: flex;
      gap: 1.5rem;
      flex: 1;
    }

    .nav-links a {
      color: #94a3b8;
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.2s;
    }

    .nav-links a:hover, .nav-links a.active {
      color: #6366f1;
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .cart-btn {
      position: relative;
      font-size: 1.3rem;
      text-decoration: none;
      padding: 0.4rem;
    }

    .cart-count {
      position: absolute;
      top: -4px;
      right: -4px;
      background: #6366f1;
      color: white;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      font-size: 0.65rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
    }

    .user-info {
      color: #94a3b8;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .user-role.admin { color: #f59e0b; }

    .btn-outline {
      border: 1px solid rgba(99, 102, 241, 0.5);
      color: #6366f1;
      background: transparent;
      padding: 0.4rem 1rem;
      border-radius: 6px;
      font-size: 0.85rem;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.2s;
    }

    .btn-outline:hover {
      background: rgba(99, 102, 241, 0.1);
    }

    .btn-primary {
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: white;
      padding: 0.4rem 1rem;
      border-radius: 6px;
      font-size: 0.85rem;
      text-decoration: none;
      transition: opacity 0.2s;
    }

    .btn-primary:hover { opacity: 0.9; }

    main {
      min-height: calc(100vh - 64px);
      background: #0a0a14;
    }
  `]
})
export class AppComponent implements OnInit {
  cartCount = 0;

  constructor(public auth: AuthService, private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartService.items$.subscribe(items => {
      this.cartCount = items.reduce((sum, i) => sum + i.quantite, 0);
    });
  }

  logout() {
    this.auth.logout().subscribe({
      next: () => this.router.navigate(['/']),
      error: () => {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/']);
      }
    });
  }
}
