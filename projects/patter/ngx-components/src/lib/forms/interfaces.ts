import { AsyncValidatorFn, ValidatorFn } from "@angular/forms";
import { Observable } from "rxjs";

export interface PtrConditionalRule {
  field: string;
  value: string | number | boolean;
  result: string;
}

export interface PtrConditionalConfig {
  showWhen?: PtrConditionalRule[];
  label?: PtrConditionalRule[];
  placeholder?: PtrConditionalRule[];
}


export interface PtrOption {
  label: string;
  value: string;
}

export interface PtrOptionGroup {
  groupLabel: string;
  options: PtrOption[];
}

export type OptionInputs = (string | PtrOption)[] | PtrOptionGroup[];

export interface PtrFormField {
  type: 'text' | 'textarea' | 'number' | 'email' | 'password' | 'search' | 'select' | 'date' | 'hidden';
  name: string;
  label: string;
  description?: string;
  value?: unknown;
  size?: 'full' | 'half' | 'third' | 'one-sixth' | 'quarter' | 'three-quarters' | 'two-third';
  placeholder?: string;
  validators?: ValidatorFn[];
  autocomplete?: string;
  asyncValidators?: AsyncValidatorFn[];
  validationMessages?: Record<string, string>;

  // Select specific
  options?: OptionInputs;
  dialogHelpText?: string;

  // Async search
  searchFn?: (term: string) => Observable<string[]>;

  // Conditional fields
  conditional?: PtrConditionalConfig;
}

export interface PtrFormConfig {
  title?: string;
  fields: PtrFormField[];
  formClass?: string;
  formValidators?: ValidatorFn[];
  submitText?: string;
  submitFullWidth?: boolean;
  labelPosition?: 'top' | 'inline';
}
