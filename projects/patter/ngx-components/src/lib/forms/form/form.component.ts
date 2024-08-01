import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PtrFormConfig, PtrFormFieldConfig } from '../interfaces';

@Component({
  selector: 'ptr-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtrFormComponent {

  @Input() config!: PtrFormConfig;
  @Input() loading = false;

  @Output() formChanges = new EventEmitter<AbstractControl<any>>();
  @Output() formSubmit = new EventEmitter<AbstractControl<any>>();

  form!: FormGroup;
  processedFields: PtrFormFieldConfig[] = [];

  fb = inject(FormBuilder);
  cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.form = this.fb.group({});
    this.processedFields = this.config.fields.map(field => this.processField(field));
    this.processedFields.forEach(field => {
      this.form.addControl(field.id, this.fb.control(field.value || '', field.required ? Validators.required : null));
    });

    this.form.valueChanges.subscribe(values => {
      this.formChanges.emit(values);
    });
  }

  private processField(field: PtrFormFieldConfig): PtrFormFieldConfig {
    const classes = ['gfield'];
    if (field.size) classes.push(`gfield--width-${field.size}`);
    if (field.type === 'hidden') classes.push('gform_hidden');
    if (field.class) classes.push(field.class);

    return {
      ...field,
      class: classes.join(' ')
    };
  }

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      console.log('Form is invalid');
    }
  }

  resetForm() {
    if (this.form) {
      this.form.reset();
      this.config.fields.forEach(field => {
        this.form.get(field.id)?.setValue(field.value || null);
      });
      this.cdr.markForCheck();
    }
  }

}
