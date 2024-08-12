import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PtrFormConfig, PtrOption, PtrOptionGroup } from '../interfaces';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { PtrButtonComponent } from '../../ptr-button/ptr-button.component';

@Component({
  selector: 'ptr-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PtrButtonComponent
  ],
  templateUrl: './form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtrFormComponent implements OnInit {

  @Input() config!: PtrFormConfig;
  @Input() loading = false;
  @Input() error: string | null = null;

  @Output() formSubmit = new EventEmitter<any>();
  @Output() formGroupCreated = new EventEmitter<FormGroup>();

  formGroup!: FormGroup;
  flatOptions: { [key: string]: PtrOption[] } = {};
  groupedOptions: { [key: string]: PtrOptionGroup[] } = {};

  fb = inject(FormBuilder);
  cdr = inject(ChangeDetectorRef);
  destroyRef = inject(DestroyRef)

  ngOnInit(): void {
    this.buildForm();
    this.formGroupCreated.emit(this.formGroup);

    this.config.fields.forEach(field => {
      if (field.type === 'select' && field.options instanceof Observable) {
        field.options
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(options => {
            this.processOptions(field.name, options);
            this.cdr.markForCheck(); // Trigger change detection after options are loaded
          });
      } else if (field.type === 'select' && Array.isArray(field.options)) {
        this.processOptions(field.name, field.options);
      }
    });
  }

  buildForm(): void {
    const group: any = {};
    this.config.fields.forEach(field => {
      group[field.name] = [field.value || '', field.validators || []];
    });
    this.formGroup = this.fb.group(group);
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



  private processOptions(fieldName: string, options: PtrOption[] | PtrOptionGroup[]): void {
    if (options.length > 0 && 'options' in options[0]) {
      this.groupedOptions[fieldName] = options as PtrOptionGroup[];
    } else {
      this.flatOptions[fieldName] = options as PtrOption[];
    }
  }
}
