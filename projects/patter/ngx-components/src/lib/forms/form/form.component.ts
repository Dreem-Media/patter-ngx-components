import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PtrConditionalRule, PtrFormConfig, PtrFormField } from '../interfaces';
import { PtrButtonComponent } from '../../ptr-button/ptr-button.component';
import { PtrSelectComponent } from "../input/ptr-select/select.component";
import { PtrInputComponent } from '../input/ptr-input/ptr-input.component';
import { PtrChipInputComponent } from '../input/ptr-chip-input/ptr-chip-input.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'ptr-form',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PtrButtonComponent,
        PtrSelectComponent,
        PtrInputComponent,
        PtrChipInputComponent
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

  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.buildForm();
    this.formGroupCreated.emit(this.formGroup);
    this.setupConditionalLogic();
  }

  buildForm(): void {
    const group: Record<string, unknown> = {};
    this.config.fields.forEach(field => {
      // Initialize array fields with empty arrays
      if (field.type === 'chips') {
        group[field.name] = [field.value || [], field.validators || []];
      } else {
        group[field.name] = [field.value || '', field.validators || []];
      }
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
      if (field.type === 'chips') {
        control?.setValue(field.value || [], { emitEvent: false });
      } else {
        control?.setValue(field.value || '', { emitEvent: false });
      }
    });
    this.cdr.markForCheck();
  }

  // Conditional logic
  setupConditionalLogic(): void {
    this.formGroup.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  isFieldVisible(field: PtrFormField): boolean {
    if (!field.conditional?.showWhen) {
      return true;
    }
    return this.evaluateConditionalRules(field.conditional.showWhen) as boolean;
  }

  getFieldLabel(field: PtrFormField): string {
    if (!field.conditional?.label) {
      return field.label;
    }
    const result = this.evaluateConditionalRules(field.conditional.label);
    return typeof result === 'string' ? result : field.label;
  }

  getFieldPlaceholder(field: PtrFormField): string {
    if (!field.conditional?.placeholder) {
      return field.placeholder || '';
    }
    const result = this.evaluateConditionalRules(field.conditional.placeholder);
    return typeof result === 'string' ? result : field.placeholder || '';
  }

  private evaluateConditionalRules(rules: PtrConditionalRule[]): string | boolean {
    for (const rule of rules) {
      const fieldValue = this.formGroup.get(rule.field)?.value;
      if (fieldValue === rule.value) {
        return rule.result;
      }
    }
    return false;
  }
}
