import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';

import type { Role } from '../../../../core/models/role.model';
import type {
  AuthAccount,
  CreateAccountPayload,
  UpdateAccountPayload,
} from '../../accounts/account-api';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ButtonModule, InputTextModule, MessageModule, ReactiveFormsModule, SelectModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm {
  private readonly formBuilder = inject(FormBuilder);

  readonly account = input<AuthAccount | null>(null);
  readonly roles = input<Role[]>([]);
  readonly saving = input(false);
  readonly saved = output<CreateAccountPayload | UpdateAccountPayload>();
  readonly cancelled = output<void>();
  readonly selectOverlayOptions = { autoZIndex: true, baseZIndex: 200 };

  readonly form = this.formBuilder.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
    password: ['', [Validators.required, Validators.minLength(12)]],
    role: ['', Validators.required],
  });

  constructor() {
    effect(() => {
      const account = this.account();
      this.form.reset({
        username: account?.username ?? '',
        email: account?.email ?? '',
        password: '',
        role: '',
      });

      if (account) {
        this.form.controls.password.clearValidators();
        this.form.controls.password.disable();
        this.form.controls.role.clearValidators();
        this.form.controls.role.disable();
      } else {
        this.form.controls.password.setValidators([Validators.required, Validators.minLength(12)]);
        this.form.controls.password.enable();
        this.form.controls.role.setValidators(Validators.required);
        this.form.controls.role.enable();
      }

      this.form.updateValueAndValidity();
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const username = value.username.trim();
    const email = value.email.trim();
    const account = this.account();

    if (account) {
      this.saved.emit({ username, email });
      return;
    }

    this.saved.emit({
      username,
      email,
      password: value.password,
      role: value.role,
    });
  }
}
