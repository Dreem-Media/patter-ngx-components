export interface PtrFormFieldOption {
  label: string;
  value: string;
}

export interface PtrFormFieldOptionGroup {
  label: string;
  options: PtrFormFieldOption[];
}

export interface PtrFormFieldConfig {
  id: string;
  name?: string;
  required?: boolean;
  type: 'text' | 'textarea' | 'select' | 'date' | 'hidden';
  simpleOptions?: PtrFormFieldOption[];
  groupedOptions?: PtrFormFieldOptionGroup[];
  size?: 'full' | 'half' | 'third';
  value?: string;
  class?: string;
  maxlength?: number;
}

export interface PtrFormConfig {
  title?: string;
  fields: PtrFormFieldConfig[];
  submitName: string;
  submitValue: string;
  formClass?: string;
}