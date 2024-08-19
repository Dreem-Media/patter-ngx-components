import { AsyncValidatorFn, ValidatorFn } from "@angular/forms";
import { Observable } from "rxjs";

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
  value?: unknown;
  size?: 'full' | 'half' | 'third';
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
}

export interface PtrFormConfig {
  title?: string;
  fields: PtrFormField[];
  formClass?: string;
  formValidators?: ValidatorFn[];
  submitText?: string;
}
