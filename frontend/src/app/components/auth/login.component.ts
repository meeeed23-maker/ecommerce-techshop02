import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  isLoading = false;
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    if (!this.username || !this.password) return;
    this.isLoading = true;
    this.errorMessage = '';

    this.auth.login({ username: this.username, password: this.password }).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.role === 'ROLE_ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Identifiants incorrects. Veuillez réessayer.';
      }
    });
  }
}
