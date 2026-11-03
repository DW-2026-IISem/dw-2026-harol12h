import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { TextareaModule } from 'primeng/textarea';

import type { Role, RolePayload, RoleUpdatePayload } from '../../../../core/models/role.model';

export type RoleFormPayload = RolePayload | RoleUpdatePayload;

@Component({
  selector: 'app-role-form',
  standalone: true,
  imports: [ButtonModule, InputTextModule, MessageModule, ReactiveFormsModule, TextareaModule],
  styleUrl: './role-form.css',
  templateUrl: './role-form.html',
})
export class RoleForm {
  private readonly formBuilder = inject(FormBuilder);

  readonly role = input<Role | null>(null);
  readonly saving = input(false);
  readonly saved = output<RoleFormPayload>();
  readonly cancelled = output<void>();

  readonly form = this.formBuilder.nonNullable.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(80),
        Validators.pattern(/^[A-Za-z][A-Za-z0-9_]{1,79}$/),
      ],
    ],
    description: [''],
  });

  constructor() {
    effect(() => {
      const role = this.role();
      this.form.reset({
        name: role?.name ?? '',
        description: role?.description ?? '',
      });
      if (role) {
        this.form.controls.name.disable();
      } else {
        this.form.controls.name.enable();
      }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const description = value.description.trim() || null;
    if (this.role()) {
      this.saved.emit({ description });
      return;
    }

    this.saved.emit({
      name: value.name.trim().toUpperCase(),
      description,
    });
  }
}
