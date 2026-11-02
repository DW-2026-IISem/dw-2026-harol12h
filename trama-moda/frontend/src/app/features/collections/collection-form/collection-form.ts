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

import {
  Collection,
  CollectionPayload,
} from '../../../core/models/collection.model';
import { HasPermission } from '../../../shared/directives/has-permission';

@Component({
  standalone: true,
  imports: [HasPermission, ReactiveFormsModule],
  selector: 'app-collection-form',
  styleUrl: './collection-form.css',
  templateUrl: './collection-form.html',
})
export class CollectionForm implements OnChanges {
  private readonly fb = inject(FormBuilder);

  @Input() collection: Collection | null = null;
  @Input() saving = false;

  @Output() save = new EventEmitter<CollectionPayload>();
  @Output() cancel = new EventEmitter<void>();

  readonly form = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(/\S/)]],
    descripcion: [''],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['collection']) {
      this.form.reset({
        nombre: this.collection?.nombre ?? '',
        descripcion: this.collection?.descripcion ?? '',
      });
    }
  }

  submit(): void {
    if (this.form.invalid || this.saving) {
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
    const payload: CollectionPayload = {
      nombre,
      descripcion: descripcion || undefined,
    };

    this.save.emit(payload);
  }
}
