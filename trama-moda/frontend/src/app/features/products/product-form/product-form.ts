import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
  signal,
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { HttpErrorResponse } from '@angular/common/http';

import { Product, ProductPayload } from '../../../core/models/product.model';
import { Category } from '../../../core/models/category.model';
import { Supplier } from '../../../core/models/supplier.model';

import { CategoryApi } from '../../categories/category-api';
import { SupplierApi } from '../../suppliers/supplier-api';

import { toApiMessage } from '../../../core/utils/api-error';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm implements OnChanges {
  private readonly fb = inject(FormBuilder);
  private readonly categoryApi = inject(CategoryApi);
  private readonly supplierApi = inject(SupplierApi);

  @Input() product: Product | null = null;
  @Input() saving = false;

  @Output() save = new EventEmitter<ProductPayload>();
  @Output() cancel = new EventEmitter<void>();

  readonly categories = signal<Category[]>([]);
  readonly suppliers = signal<Supplier[]>([]);
  readonly loadingRelations = signal(false);
  readonly relationError = signal('');

  readonly form = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(120)]],
    descripcion: ['', [Validators.maxLength(500)]],
    precio: [0, [Validators.required, Validators.min(0.01)]],
    stock: [
      0,
      [
        Validators.required,
        Validators.min(0),
        Validators.pattern(/^\d+$/),
      ],
    ],
    category_id: [null as number | null],
    supplier_id: [null as number | null],
  });

  constructor() {
    this.loadRelations();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']) {
      this.form.reset({
        nombre: this.product?.nombre ?? '',
        descripcion: this.product?.descripcion ?? '',
        precio: Number(this.product?.precio ?? 0),
        stock: this.product?.stock ?? 0,
        category_id: this.product?.category_id ?? null,
        supplier_id: this.product?.supplier_id ?? null,
      });
    }
  }

  loadRelations(): void {
    this.loadingRelations.set(true);
    this.relationError.set('');

    let completed = 0;

    const finishLoading = (): void => {
      completed++;

      if (completed === 2) {
        this.loadingRelations.set(false);
      }
    };

    this.categoryApi.list().subscribe({
      next: (categories) => {
        this.categories.set(
          categories.filter((category) => category.is_active),
        );
        finishLoading();
      },
      error: (error: HttpErrorResponse) => {
        this.relationError.set(toApiMessage(error));
        finishLoading();
      },
    });

    this.supplierApi.list().subscribe({
      next: (suppliers) => {
        this.suppliers.set(
          suppliers.filter((supplier) => supplier.is_active),
        );
        finishLoading();
      },
      error: (error: HttpErrorResponse) => {
        this.relationError.set(toApiMessage(error));
        finishLoading();
      },
    });
  }

  submit(): void {
    if (this.form.invalid || this.saving) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    const nombre = (value.nombre ?? '').trim();
    const descripcion = value.descripcion?.trim() ?? '';

    if (!nombre) {
      this.form.controls.nombre.markAsTouched();
      return;
    }

    const payload: ProductPayload = {
      nombre,
      descripcion: descripcion || null,
      precio: Number(value.precio),
      stock: Number(value.stock),
      category_id: value.category_id,
      supplier_id: value.supplier_id,
    };

    this.save.emit(payload);
  }
}