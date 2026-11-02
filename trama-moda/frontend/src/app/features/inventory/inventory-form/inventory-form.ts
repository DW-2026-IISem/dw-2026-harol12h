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

import { Branch } from '../../../core/models/branch.model';
import { Inventory, InventoryPayload } from '../../../core/models/inventory.model';
import { Product } from '../../../core/models/product.model';
import { Variant } from '../../../core/models/variant.model';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  selector: 'app-inventory-form',
  styleUrl: './inventory-form.css',
  templateUrl: './inventory-form.html',
})
export class InventoryForm implements OnChanges {
  private readonly fb = inject(FormBuilder);

  @Input() inventory: Inventory | null = null;
  @Input() branches: Branch[] = [];
  @Input() variants: Variant[] = [];
  @Input() products: Product[] = [];
  @Input() catalogsLoading = false;
  @Input() catalogsError = '';
  @Input() saving = false;

  @Output() save = new EventEmitter<InventoryPayload>();
  @Output() cancel = new EventEmitter<void>();

  readonly form = this.fb.group({
    branchId: [null as number | null, [Validators.required]],
    variantId: [null as number | null, [Validators.required]],
    stock: [
      0 as number | null,
      [
        Validators.required,
        Validators.min(0),
        Validators.pattern(/^\d+$/),
      ],
    ],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['inventory']) {
      this.form.reset({
        branchId: this.inventory?.branchId ?? null,
        variantId: this.inventory?.variantId ?? null,
        stock: this.inventory?.stock ?? 0,
      });
    }
  }

  hasBranch(id: number): boolean {
    return this.branches.some((branch) => branch.id === id);
  }

  hasVariant(id: number): boolean {
    return this.variants.some((variant) => variant.id === id);
  }

  variantLabel(variant: Variant): string {
    const product =
      variant.product_id === null
        ? null
        : this.products.find((item) => item.id === variant.product_id);

    return product
      ? `${variant.nombre} — ${product.nombre}`
      : variant.nombre;
  }

  submit(): void {
    if (
      this.form.invalid ||
      this.saving ||
      this.catalogsLoading ||
      this.catalogsError
    ) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const stock = value.stock;

    if (
      value.branchId === null ||
      value.variantId === null ||
      stock === null ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      this.form.markAllAsTouched();
      return;
    }

    this.save.emit({
      branchId: value.branchId,
      variantId: value.variantId,
      stock,
    });
  }
}
