
import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

import { Category, CategoryPayload } from '../../../core/models/category.model';
import { NotificationService } from '../../../core/services/notification';
import { toApiMessage } from '../../../core/utils/api-error';
import { filterRows } from '../../../core/utils/filter-rows';
import { CategoryApi } from '../category-api';
import { CategoryForm } from '../category-form/category-form';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    ConfirmDialog,
    DialogModule,
    InputTextModule,
    TableModule,
    ToastModule,
    CategoryForm,
  ],
  providers: [ConfirmationService],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
})
export class CategoryList {
  private readonly api = inject(CategoryApi);
  private readonly notifications = inject(NotificationService);
  private readonly confirmations = inject(ConfirmationService);

  readonly categories = signal<Category[]>([]);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly search = signal('');
  readonly dialogVisible = signal(false);
  readonly selectedCategory = signal<Category | null>(null);

  readonly filteredCategories = computed(() =>
    filterRows(this.categories(), this.search(), (category) => [
      category.name,
      category.description,
    ]),
  );

  constructor() {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading.set(true);
    this.error.set('');

    this.api.list().subscribe({
      next: (categories) => {
        this.categories.set(categories);
        this.loading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.categories.set([]);
        this.error.set(toApiMessage(error));
        this.loading.set(false);
      },
    });
  }

  openCreate(): void {
    this.selectedCategory.set(null);
    this.dialogVisible.set(true);
  }

  openEdit(category: Category): void {
    this.selectedCategory.set(category);
    this.dialogVisible.set(true);
  }

  saveCategory(payload: CategoryPayload): void {
    this.saving.set(true);

    const request = this.selectedCategory()
      ? this.api.update(this.selectedCategory()!.id, payload)
      : this.api.create(payload);

    request.subscribe({
      next: () => {
        this.saving.set(false);
        this.dialogVisible.set(false);
        this.notifications.success(
          this.selectedCategory()
            ? 'Categoría actualizada correctamente.'
            : 'Categoría creada correctamente.',
        );
        this.loadCategories();
      },
      error: (error: HttpErrorResponse) => {
        this.saving.set(false);
        this.notifications.error(toApiMessage(error));
      },
    });
  }

  deactivate(category: Category): void {
    this.confirmations.confirm({
      header: 'Desactivar categoría',
      message: `¿Deseas desactivar la categoría "${category.name}"?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, desactivar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.api.deactivate(category.id).subscribe({
          next: () => {
            this.notifications.success('Categoría desactivada correctamente.');
            this.loadCategories();
          },
          error: (error: HttpErrorResponse) => {
            this.notifications.error(toApiMessage(error));
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
    this.selectedCategory.set(null);
  }
}
