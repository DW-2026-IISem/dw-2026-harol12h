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

import {
  Collection,
  CollectionPayload,
} from '../../../core/models/collection.model';
import { NotificationService } from '../../../core/services/notification';
import { toApiMessage } from '../../../core/utils/api-error';
import { filterRows } from '../../../core/utils/filter-rows';
import { CollectionApi } from '../collection-api';
import { CollectionForm } from '../collection-form/collection-form';
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
    CollectionForm,
  ],
  providers: [ConfirmationService],
  selector: 'app-collection-list',
  styleUrl: './collection-list.css',
  templateUrl: './collection-list.html',
})
export class CollectionList {
  private readonly api = inject(CollectionApi);
  private readonly notifications = inject(NotificationService);
  private readonly confirmations = inject(ConfirmationService);

  readonly collections = signal<Collection[]>([]);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly search = signal('');
  readonly dialogVisible = signal(false);
  readonly selectedCollection = signal<Collection | null>(null);

  readonly filteredCollections = computed(() =>
    filterRows(this.collections(), this.search(), (collection) => [
      collection.id,
      collection.nombre,
      collection.descripcion,
    ]),
  );

  constructor() {
    this.loadCollections();
  }

  loadCollections(): void {
    this.loading.set(true);
    this.error.set('');

    this.api.list().subscribe({
      next: (collections) => {
        this.collections.set(collections);
        this.loading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.collections.set([]);
        this.error.set(toApiMessage(error));
        this.loading.set(false);
      },
    });
  }

  openCreate(): void {
    this.selectedCollection.set(null);
    this.dialogVisible.set(true);
  }

  openEdit(collection: Collection): void {
    this.selectedCollection.set(collection);
    this.dialogVisible.set(true);
  }

  saveCollection(payload: CollectionPayload): void {
    if (this.saving()) {
      return;
    }

    this.saving.set(true);
    const collection = this.selectedCollection();
    const request = collection
      ? this.api.update(collection.id, payload)
      : this.api.create(payload);

    request.subscribe({
      next: () => {
        this.saving.set(false);
        this.dialogVisible.set(false);
        this.selectedCollection.set(null);
        this.notifications.success(
          collection ? 'Colección actualizada' : 'Colección creada',
          collection
            ? 'Los cambios se guardaron correctamente.'
            : 'La colección se registró correctamente.',
        );
        this.loadCollections();
      },
      error: (error: HttpErrorResponse) => {
        this.saving.set(false);
        this.notifications.error(
          'No se pudo guardar la colección',
          toApiMessage(error),
        );
      },
    });
  }

  deactivate(collection: Collection): void {
    this.confirmations.confirm({
      header: 'Desactivar colección',
      message: `¿Deseas desactivar la colección "${collection.nombre}"?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Desactivar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.api.deactivate(collection.id).subscribe({
          next: () => {
            this.notifications.success(
              'Colección desactivada',
              'La colección se desactivó correctamente.',
            );
            this.loadCollections();
          },
          error: (error: HttpErrorResponse) => {
            this.notifications.error(
              'No se pudo desactivar la colección',
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
    this.selectedCollection.set(null);
  }
}
