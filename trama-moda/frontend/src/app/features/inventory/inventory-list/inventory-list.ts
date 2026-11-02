import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

import { Branch } from '../../../core/models/branch.model';
import { Inventory, InventoryPayload } from '../../../core/models/inventory.model';
import { Product } from '../../../core/models/product.model';
import { Variant } from '../../../core/models/variant.model';
import { NotificationService } from '../../../core/services/notification';
import { toApiMessage } from '../../../core/utils/api-error';
import { filterRows } from '../../../core/utils/filter-rows';
import { BranchApi } from '../../branches/branch-api';
import { ProductApi } from '../../products/product-api';
import { VariantApi } from '../../variants/variant-api';
import { InventoryApi } from '../inventory-api';
import { InventoryForm } from '../inventory-form/inventory-form';
import { HasPermission } from '../../../shared/directives/has-permission';

@Component({
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    ConfirmDialog,
    DialogModule,
    InputTextModule,
    HasPermission,
    TableModule,
    ToastModule,
    InventoryForm,
  ],
  providers: [ConfirmationService],
  selector: 'app-inventory-list',
  styleUrl: './inventory-list.css',
  templateUrl: './inventory-list.html',
})
export class InventoryList {
  private readonly api = inject(InventoryApi);
  private readonly branchApi = inject(BranchApi);
  private readonly variantApi = inject(VariantApi);
  private readonly productApi = inject(ProductApi);
  private readonly notifications = inject(NotificationService);
  private readonly confirmations = inject(ConfirmationService);

  readonly inventories = signal<Inventory[]>([]);
  readonly branches = signal<Branch[]>([]);
  readonly variants = signal<Variant[]>([]);
  readonly products = signal<Product[]>([]);
  readonly loading = signal(false);
  readonly branchesLoading = signal(false);
  readonly variantsLoading = signal(false);
  readonly productsLoading = signal(false);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly branchesError = signal('');
  readonly variantsError = signal('');
  readonly productsError = signal('');
  readonly search = signal('');
  readonly branchFilter = signal<number | null>(null);
  readonly dialogVisible = signal(false);
  readonly selectedInventory = signal<Inventory | null>(null);

  readonly filteredInventories = computed(() => {
    const branchNames = new Map(
      this.branches().map((branch) => [branch.id, branch.nombre]),
    );
    const variantsById = new Map(
      this.variants().map((variant) => [variant.id, variant]),
    );
    const productNames = new Map(
      this.products().map((product) => [product.id, product.nombre]),
    );

    return filterRows(
      this.inventories().filter(
        (inventory) =>
          this.branchFilter() === null ||
          inventory.branchId === this.branchFilter(),
      ),
      this.search(),
      (inventory) => {
        const variant = variantsById.get(inventory.variantId);
        const productName =
          variant?.product_id == null
            ? ''
            : (productNames.get(variant.product_id) ?? '');

        return [
          inventory.id,
          branchNames.get(inventory.branchId) ??
            `Sucursal #${inventory.branchId}`,
          variant?.nombre ?? `Variante #${inventory.variantId}`,
          variant?.descripcion ?? '',
          productName,
          inventory.stock,
        ];
      },
    );
  });

  constructor() {
    this.loadInventories();
    this.loadBranches();
    this.loadVariants();
    this.loadProducts();
  }

  loadInventories(): void {
    this.loading.set(true);
    this.error.set('');

    this.api.list().subscribe({
      next: (inventories) => {
        this.inventories.set(inventories);
        this.loading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.inventories.set([]);
        this.error.set(toApiMessage(error));
        this.loading.set(false);
      },
    });
  }

  loadBranches(): void {
    this.branchesLoading.set(true);
    this.branchesError.set('');

    this.branchApi.list().subscribe({
      next: (branches) => {
        this.branches.set(branches);
        this.branchesLoading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.branches.set([]);
        this.branchesError.set(toApiMessage(error));
        this.branchesLoading.set(false);
      },
    });
  }

  loadVariants(): void {
    this.variantsLoading.set(true);
    this.variantsError.set('');

    this.variantApi.list().subscribe({
      next: (variants) => {
        this.variants.set(variants);
        this.variantsLoading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.variants.set([]);
        this.variantsError.set(toApiMessage(error));
        this.variantsLoading.set(false);
      },
    });
  }

  loadProducts(): void {
    this.productsLoading.set(true);
    this.productsError.set('');

    this.productApi.list().subscribe({
      next: (products) => {
        this.products.set(products);
        this.productsLoading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.products.set([]);
        this.productsError.set(toApiMessage(error));
        this.productsLoading.set(false);
      },
    });
  }

  refresh(): void {
    this.loadInventories();
    this.loadBranches();
    this.loadVariants();
    this.loadProducts();
  }

  branchName(id: number): string {
    return (
      this.branches().find((branch) => branch.id === id)?.nombre ??
      `Sucursal #${id}`
    );
  }

  variantName(id: number): string {
    return (
      this.variants().find((variant) => variant.id === id)?.nombre ??
      `Variante #${id}`
    );
  }

  productName(variantId: number): string {
    const variant = this.variants().find((item) => item.id === variantId);
    if (variant?.product_id == null) {
      return 'Sin producto asociado';
    }

    return (
      this.products().find((product) => product.id === variant.product_id)
        ?.nombre ?? `Producto #${variant.product_id}`
    );
  }

  openCreate(): void {
    this.selectedInventory.set(null);
    this.dialogVisible.set(true);
  }

  openEdit(inventory: Inventory): void {
    this.selectedInventory.set(inventory);
    this.dialogVisible.set(true);
  }

  saveInventory(payload: InventoryPayload): void {
    if (this.saving()) {
      return;
    }

    if (this.loading() || this.error()) {
      this.notifications.error(
        'No se pudo validar la combinación',
        'Recarga correctamente el inventario antes de registrar o editar existencias.',
      );
      return;
    }

    const current = this.selectedInventory();
    const duplicate = this.inventories().find(
      (inventory) =>
        inventory.is_active &&
        inventory.branchId === payload.branchId &&
        inventory.variantId === payload.variantId &&
        inventory.id !== current?.id,
    );

    if (current && duplicate) {
      this.notifications.error(
        'Combinación ya registrada',
        'La sucursal y variante seleccionadas ya pertenecen a otro registro de inventario.',
      );
      return;
    }

    this.saving.set(true);
    const existing = current ?? duplicate ?? null;
    const request = existing
      ? this.api.update(existing.id, payload)
      : this.api.create(payload);

    request.subscribe({
      next: () => {
        this.saving.set(false);
        this.dialogVisible.set(false);
        this.selectedInventory.set(null);
        this.notifications.success(
          existing ? 'Inventario actualizado' : 'Inventario registrado',
          duplicate
            ? 'La combinación ya existía; se actualizó su cantidad.'
            : 'Los datos se guardaron correctamente.',
        );
        this.loadInventories();
      },
      error: (error: HttpErrorResponse) => {
        this.saving.set(false);
        this.notifications.error(
          'No se pudo guardar el inventario',
          toApiMessage(error),
        );
      },
    });
  }

  deactivate(inventory: Inventory): void {
    this.confirmations.confirm({
      header: 'Desactivar inventario',
      message: `¿Deseas desactivar el registro de ${this.variantName(inventory.variantId)} en ${this.branchName(inventory.branchId)}?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Desactivar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.api.remove(inventory.id).subscribe({
          next: () => {
            this.notifications.success(
              'Inventario desactivado',
              'El registro se desactivó correctamente.',
            );
            this.loadInventories();
          },
          error: (error: HttpErrorResponse) => {
            this.notifications.error(
              'No se pudo desactivar el inventario',
              toApiMessage(error),
            );
          },
        });
      },
    });
  }

  closeDialog(): void {
    if (this.saving()) {
      return;
    }

    this.dialogVisible.set(false);
    this.selectedInventory.set(null);
  }
}
