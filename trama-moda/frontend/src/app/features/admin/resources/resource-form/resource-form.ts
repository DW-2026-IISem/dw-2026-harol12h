import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

import type { HttpMethod, Resource, ResourcePayload } from '../../../../core/models/resource.model';

const HTTP_METHODS: HttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

@Component({
  selector: 'app-resource-form',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    MessageModule,
    ReactiveFormsModule,
    SelectModule,
    TextareaModule,
  ],
  styleUrl: './resource-form.css',
  templateUrl: './resource-form.html',
})
export class ResourceForm {
  private readonly formBuilder = inject(FormBuilder);

  readonly resource = input<Resource | null>(null);
  readonly resources = input<Resource[]>([]);
  readonly saving = input(false);
  readonly saved = output<ResourcePayload>();
  readonly cancelled = output<void>();
  readonly duplicateError = signal('');

  readonly methods = HTTP_METHODS;
  readonly form = this.formBuilder.nonNullable.group({
    method: ['GET', Validators.required],
    path: [
      '',
      [
        Validators.required,
        Validators.maxLength(255),
        Validators.pattern(
          /^\/(?:[A-Za-z0-9._~-]+|:[A-Za-z][A-Za-z0-9_]*)(?:\/(?:[A-Za-z0-9._~-]+|:[A-Za-z][A-Za-z0-9_]*))*$/,
        ),
      ],
    ],
    description: [''],
  });

  constructor() {
    effect(() => {
      const resource = this.resource();
      this.duplicateError.set('');
      this.form.reset({
        method: resource?.method ?? 'GET',
        path: resource?.path ?? '',
        description: resource?.description ?? '',
      });
    });
  }

  submit(): void {
    this.duplicateError.set('');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const method = HTTP_METHODS.find((candidate) => candidate === value.method);
    const path = value.path.trim();
    if (!method) {
      this.duplicateError.set('Selecciona uno de los métodos HTTP permitidos.');
      return;
    }
    const duplicate = this.resources().some(
      (resource) =>
        resource.id !== this.resource()?.id && resource.method === method && resource.path === path,
    );
    if (duplicate) {
      this.duplicateError.set('Ya existe un recurso con el mismo método y ruta.');
      return;
    }

    this.saved.emit({
      method,
      path,
      description: value.description.trim() || null,
    });
  }
}
