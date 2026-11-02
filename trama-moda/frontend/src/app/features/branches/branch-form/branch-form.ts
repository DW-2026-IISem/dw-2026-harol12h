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
import { Branch, BranchPayload } from '../../../core/models/branch.model';

@Component({
  selector: 'app-branch-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './branch-form.html',
  styleUrl: './branch-form.css',
})
export class BranchForm implements OnChanges {
  private readonly fb = inject(FormBuilder);

  @Input() branch: Branch | null = null;
  @Input() saving = false;

  @Output() save = new EventEmitter<BranchPayload>();
  @Output() cancel = new EventEmitter<void>();

  readonly form = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(120)]],
    direccion: ['', [Validators.maxLength(255)]],
    telefono: ['', [Validators.maxLength(30)]],
    is_active: [true],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['branch']) {
      this.form.reset({
        nombre: this.branch?.nombre ?? '',
        direccion: this.branch?.direccion ?? '',
        telefono: this.branch?.telefono ?? '',
        is_active: this.branch?.is_active ?? true,
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
    const direccion = value.direccion?.trim() ?? '';
    const telefono = value.telefono?.trim() ?? '';
    const isActive = value.is_active ?? true;

    if (!nombre) {
      this.form.controls.nombre.markAsTouched();
      return;
    }

    const payload: BranchPayload = {
      nombre,
      direccion: direccion || null,
      telefono: telefono || null,
      is_active: isActive,
    };

    this.save.emit(payload);
  }
}
