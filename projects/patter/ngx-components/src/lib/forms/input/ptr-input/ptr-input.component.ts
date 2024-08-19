/* eslint-disable @typescript-eslint/no-empty-function */
import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, Input, signal, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { PtrDialogListComponent } from '../../shared/ptr-dialog-list/ptr-dialog-list.component';
import { Observable, Subject } from 'rxjs';
import { PtrOption } from '../../interfaces';

@Component({
  selector: 'ptr-input',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PtrDialogListComponent
  ],
  templateUrl: './ptr-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PtrInputComponent),
      multi: true
    }
  ]
})
export class PtrInputComponent implements ControlValueAccessor {

  @Input() type: 'text' | 'number' | 'email' | 'password' | 'search' | 'hidden' | 'date' = 'text';
  @Input() label = '';
  @Input() placeholder? = '';
  @Input() autocomplete? = '';
  @Input() searchFn?: (term: string) => Observable<string[] | PtrOption[]>;

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  private componentId = Math.random().toString(36).substring(2);
  inputId = `${this.componentId}-input`;

  inputValue = signal('');
  private minChars = 2;

  private searchTerms = new Subject<string>();

  onChange: (value: string) => void = () => { };
  onTouched: () => void = () => { };

  onInputChange(value: string) {
    this.inputValue.set(value);
    this.onChange(value);
    if (this.searchFn && value.length >= this.minChars) {
      this.searchTerms.next(value);
    }
  }

  onFocus() {
    if (this.searchFn && this.inputValue().length >= this.minChars) {
      this.searchTerms.next(this.inputValue());
    }
  }

  onBlur() {
    this.onTouched();
  }

  writeValue(value: string): void {
    this.inputValue.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if(this.input?.nativeElement) {
      this.input.nativeElement.disabled = isDisabled;
    }
  }

}
