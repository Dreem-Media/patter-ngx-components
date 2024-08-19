import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PtrFormConfig } from '../interfaces';
import { PtrButtonComponent } from '../../ptr-button/ptr-button.component';
import { PtrSelectComponent } from "../input/select/select.component";
import { PtrInputComponent } from '../input/ptr-input/ptr-input.component';

@Component({
  selector: 'ptr-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    PtrButtonComponent,

    PtrSelectComponent,
    PtrInputComponent
],
  templateUrl: './form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtrFormComponent implements OnInit {

  @Input() config!: PtrFormConfig;
  @Input() loading = false;
  @Input() error: string | null = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formGroupCreated = new EventEmitter<FormGroup>();

  formGroup!: FormGroup;

  fb = inject(FormBuilder);
  cdr = inject(ChangeDetectorRef);
  destroyRef = inject(DestroyRef)

  ngOnInit(): void {
    this.buildForm();
    this.formGroupCreated.emit(this.formGroup);
  }

  buildForm(): void {
    const group: Record<string, unknown> = {};
    this.config.fields.forEach(field => {
      group[field.name] = [field.value || '', field.validators || []];
    });

    this.formGroup = this.fb.group(group, this.config.formValidators ? { validators: this.config.formValidators } : null);
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.formSubmit.emit(this.formGroup.value);
    }
  }

  public resetForm(): void {
    this.formGroup.reset();
    this.config.fields.forEach(field => {
      const control = this.formGroup.get(field.name);
      control?.setValue(field.value || '', { emitEvent: false });
    });
    this.cdr.markForCheck();
  }

}
