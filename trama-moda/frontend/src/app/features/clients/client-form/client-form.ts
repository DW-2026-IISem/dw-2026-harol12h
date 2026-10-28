import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Client, ClientPayload } from '../../../core/models/client.model';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './client-form.html',
  styleUrl: './client-form.css',
})
export class ClientForm implements OnChanges {
  private readonly fb = inject(FormBuilder);

  @Input() client: Client | null = null;
  @Input() saving = false;

  @Output() save = new EventEmitter<ClientPayload>();
  @Output() cancel = new EventEmitter<void>();

  readonly form = this.fb.group({
    tipo_documento: ['', [Validators.required]],
    numero_documento: [
      '',
      [Validators.required, Validators.maxLength(30)],
    ],
    nombre: ['', [Validators.required, Validators.maxLength(120)]],
    telefono: ['', [Validators.maxLength(30)]],
    email: ['', [Validators.email, Validators.maxLength(150)]],
    status: ['active' as 'active' | 'inactive', [Validators.required]],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['client']) {
      this.form.reset({
        tipo_documento: this.client?.tipo_documento ?? '',
        numero_documento: this.client?.numero_documento ?? '',
        nombre: this.client?.nombre ?? '',
        telefono: this.client?.telefono ?? '',
        email: this.client?.email ?? '',
        status: this.client?.status ?? 'active',
      });
    }
  }

  submit(): void {
    if (this.form.invalid || this.saving) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    const tipoDocumento = value.tipo_documento?.trim() ?? '';
    const numeroDocumento = value.numero_documento?.trim() ?? '';
    const nombre = value.nombre?.trim() ?? '';
    const telefono = value.telefono?.trim() ?? '';
    const email = value.email?.trim() ?? '';
    const status = value.status ?? 'active';

    if (!tipoDocumento || !numeroDocumento || !nombre) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: ClientPayload = {
      tipo_documento: tipoDocumento,
      numero_documento: numeroDocumento,
      nombre,
      telefono: telefono || null,
      email: email || null,
      status,
    };

    this.save.emit(payload);
  }
}
