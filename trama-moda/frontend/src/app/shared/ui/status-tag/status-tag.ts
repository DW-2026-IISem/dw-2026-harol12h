import { Component, computed, input } from '@angular/core';
import { Status } from '../../../core/models/api.model';

@Component({
  selector: 'app-status-tag',
  imports: [],
  templateUrl: './status-tag.html',
  styleUrl: './status-tag.css',
})
export class StatusTag {
  readonly status = input.required<Status>();

  readonly label = computed(() =>
    this.status() === 'active' ? 'Activo' : 'Inactivo',
  );

  readonly classes = computed(() =>
    this.status() === 'active'
      ? 'bg-green-100 text-green-800'
      : 'bg-slate-100 text-slate-700',
  );
}
