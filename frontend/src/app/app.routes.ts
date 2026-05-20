import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/catalogue/catalogue.component')
      .then(m => m.CatalogueComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./components/auth/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./components/auth/register.component')
      .then(m => m.RegisterComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./components/cart/cart.component')
      .then(m => m.CartComponent),
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    loadComponent: () => import('./components/admin/admin.component')
      .then(m => m.AdminComponent),
    canActivate: [authGuard, adminGuard]
  },
  { path: '**', redirectTo: '' }
];
