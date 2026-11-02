import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Auth } from '../../../core/services/auth';
import { toApiMessage } from '../../../core/utils/api-error';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  host: { class: 'block' },
})
export class Login {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);

  readonly loading = signal(false);
  readonly errorMessage = signal('');
  readonly logoutMessage = signal('');
  readonly form = this.fb.group({
    username: ['', [Validators.required, Validators.pattern(/\S/)]],
    password: ['', [Validators.required]],
  });

  constructor() {
    if (this.route.snapshot.queryParamMap.get('logout') === 'local') {
      this.logoutMessage.set(
        'La sesión local se cerró, pero el servidor no confirmó la revocación.',
      );
    }
  }

  submit(): void {
    if (this.loading()) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    this.loading.set(true);
    this.errorMessage.set('');

    this.auth.login({
      username: value.username?.trim() ?? '',
      password: value.password ?? '',
    }).subscribe({
      next: () => {
        this.loading.set(false);
        void this.router.navigateByUrl(this.safeReturnUrl());
      },
      error: (error: unknown) => {
        this.loading.set(false);
        this.errorMessage.set(toApiMessage(error));
      },
    });
  }

  private safeReturnUrl(): string {
    const requested = this.route.snapshot.queryParamMap.get('returnUrl');
    if (
      !requested ||
      !requested.startsWith('/') ||
      requested.startsWith('//') ||
      requested.includes('\\') ||
      requested === '/login' ||
      requested.startsWith('/login?')
    ) {
      return '/dashboard';
    }

    return requested;
  }
}
