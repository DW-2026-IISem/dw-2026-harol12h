import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  host: { class: 'block' },
})
export class Login {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  username = '';
  password = '';

  readonly loading = signal(false);
  readonly errorMessage = signal('');

  submit(): void {
    if (this.loading()) return;

    if (!this.username.trim() || !this.password) {
      this.errorMessage.set('Ingresa tu usuario y contraseña.');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    this.auth.login({
      username: this.username.trim(),
      password: this.password,
    }).subscribe({
      next: () => {
        this.loading.set(false);
        void this.router.navigateByUrl('/construir');
      },
      error: (error: unknown) => {
        this.loading.set(false);

        const message =
          error && typeof error === 'object' && 'error' in error
            ? (error as { error?: { message?: string; detail?: string } }).error
            : null;

        this.errorMessage.set(
          message?.message ||
          message?.detail ||
          'No se pudo iniciar sesión. Verifica tus datos e inténtalo de nuevo.',
        );
      },
    });
  }
}
