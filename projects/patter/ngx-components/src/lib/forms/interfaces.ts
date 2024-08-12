import { AsyncValidatorFn, ValidatorFn } from "@angular/forms";
import { Observable } from "rxjs";

export interface PtrOption {
  label: string;
  value: any;
}

export interface PtrOptionGroup {
  groupLabel: string;
  options: PtrOption[];
}

export interface PtrFormField {
  type: 'text' | 'textarea' | 'number' | 'email' | 'password' | 'select' | 'date' | 'hidden';
  name: string;
  label: string;
  value?: any;
  options?: PtrOption[] | PtrOptionGroup[] | Observable<PtrOption[] | PtrOptionGroup[]>;
  size?: 'full' | 'half' | 'third';
  placeholder?: string;
  validators?: ValidatorFn[];
  autocomplete?: string;
  asyncValidators?: AsyncValidatorFn[];
  validationMessages?: { [key: string]: string };
}

export interface PtrFormConfig {
  title?: string;
  fields: PtrFormField[];
  formClass?: string;
  formValidators?: ValidatorFn[];
  submitText: string;
}
