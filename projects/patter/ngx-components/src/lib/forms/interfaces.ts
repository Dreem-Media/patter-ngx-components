import { AsyncValidatorFn, ValidatorFn } from "@angular/forms";

export interface PtrOption {
  label: string;
  value: string;
}

export interface PtrOptionGroup {
  groupLabel: string;
  options: PtrOption[];
}

export type OptionInput = (string | PtrOption)[] | PtrOptionGroup[];

export interface PtrFormField {
  type: 'text' | 'textarea' | 'number' | 'email' | 'password' | 'select' | 'date' | 'hidden';
  name: string;
  label: string;
  value?: unknown;
  options?: PtrOption[] | PtrOptionGroup[];
  size?: 'full' | 'half' | 'third';
  placeholder?: string;
  validators?: ValidatorFn[];
  autocomplete?: string;
  asyncValidators?: AsyncValidatorFn[];
  validationMessages?: Record<string, string>;
}

export interface PtrFormConfig {
  title?: string;
  fields: PtrFormField[];
  formClass?: string;
  formValidators?: ValidatorFn[];
  submitText: string;
}
