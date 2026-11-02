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

import { Product } from '../../../core/models/product.model';
import {
  Variant,
  VariantPayload,
} from '../../../core/models/variant.model';
import { HasPermission } from '../../../shared/directives/has-permission';

@Component({
  standalone: true,
  imports: [HasPermission, ReactiveFormsModule],
  selector: 'app-variant-form',
  styleUrl: './variant-form.css',
  templateUrl: './variant-form.html',
})
export class VariantForm implements OnChanges {
  private readonly fb = inject(FormBuilder);

  @Input() variant: Variant | null = null;
  @Input() products: Product[] = [];
  @Input() productsLoading = false;
  @Input() productsError = '';
  @Input() saving = false;

  @Output() save = new EventEmitter<VariantPayload>();
  @Output() cancel = new EventEmitter<void>();

  readonly form = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(/\S/)]],
    descripcion: [''],
    product_id: [null as number | null],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['variant']) {
      this.form.reset({
        nombre: this.variant?.nombre ?? '',
        descripcion: this.variant?.descripcion ?? '',
        product_id: this.variant?.product_id ?? null,
      });
    }
  }

  hasProduct(id: number): boolean {
    return this.products.some((product) => product.id === id);
  }

  submit(): void {
    if (this.form.invalid || this.saving || this.productsLoading) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const nombre = value.nombre?.trim() ?? '';

    if (!nombre) {
      this.form.controls.nombre.markAsTouched();
      return;
    }

    const descripcion = value.descripcion?.trim() ?? '';
    const payload: VariantPayload = {
      nombre,
      descripcion: descripcion || undefined,
      product_id: value.product_id ?? null,
    };

    this.save.emit(payload);
  }
}
