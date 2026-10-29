
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
  Category,
  CategoryPayload,
} from '../../../core/models/category.model';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './category-form.html',
  styleUrl: './category-form.css',
})
export class CategoryForm implements OnChanges {
  private readonly fb = inject(FormBuilder);

  @Input() category: Category | null = null;
  @Input() saving = false;

  @Output() save = new EventEmitter<CategoryPayload>();
  @Output() cancel = new EventEmitter<void>();

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    description: ['', [Validators.maxLength(255)]],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['category']) {
      this.form.reset({
        name: this.category?.name ?? '',
        description: this.category?.description ?? '',
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
    const description = value.description?.trim() ?? '';

    if (!name || name.length > 120) {
      this.form.controls.name.markAsTouched();
      return;
    }

    const payload: CategoryPayload = {
      name,
      description: description || undefined,
      is_active: this.category?.is_active ?? true,
    };

    this.save.emit(payload);
  }
}
