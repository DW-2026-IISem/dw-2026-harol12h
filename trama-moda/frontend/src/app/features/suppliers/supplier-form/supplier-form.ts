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
import { Supplier, SupplierPayload } from '../../../core/models/supplier.model';

@Component({
  selector: 'app-supplier-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './supplier-form.html',
  styleUrl: './supplier-form.css',
})
export class SupplierForm implements OnChanges {
  private readonly fb = inject(FormBuilder);

  @Input() supplier: Supplier | null = null;
  @Input() saving = false;

  @Output() save = new EventEmitter<SupplierPayload>();
  @Output() cancel = new EventEmitter<void>();

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    contact_name: ['', [Validators.maxLength(120)]],
    email: ['', [Validators.email, Validators.maxLength(150)]],
    phone: ['', [Validators.maxLength(30)]],
    address: ['', [Validators.maxLength(255)]],
    is_active: [true],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['supplier']) {
      this.form.reset({
        name: this.supplier?.name ?? '',
        contact_name: this.supplier?.contact_name ?? '',
        email: this.supplier?.email ?? '',
        phone: this.supplier?.phone ?? '',
        address: this.supplier?.address ?? '',
        is_active: this.supplier?.is_active ?? true,
      });
    }
  }

  submit(): void {
    if (this.form.invalid || this.saving) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    const name = value.name?.trim() ?? '';
    const contactName = value.contact_name?.trim() ?? '';
    const email = value.email?.trim() ?? '';
    const phone = value.phone?.trim() ?? '';
    const address = value.address?.trim() ?? '';
    const isActive = value.is_active ?? true;

    if (!name) {
      this.form.controls.name.markAsTouched();
      return;
    }

    const payload: SupplierPayload = {
      name,
      contact_name: contactName || null,
      email: email || null,
      phone: phone || null,
      address: address || null,
      is_active: isActive,
    };

    this.save.emit(payload);
  }
}
