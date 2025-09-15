/* eslint-disable @typescript-eslint/no-empty-function */
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, forwardRef, HostListener, inject, Input, OnInit, signal, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { PtrDialogListComponent } from '../../shared/ptr-dialog-list/ptr-dialog-list.component';
import { debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'ptr-input',
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
export class PtrInputComponent implements ControlValueAccessor, OnInit {

  @Input() type: 'text' | 'number' | 'email' | 'password' | 'search' | 'hidden' | 'date' | 'time' | 'textarea' = 'text';
  @Input() label = '';
  @Input() placeholder?: string | null = '';
  @Input() autocomplete? = '';
  @Input() description? = '';
  @Input() dialogHelpText? = '';
  @Input() searchFn?: (term: string) => Observable<string[]>;
  @Input() labelPosition?: 'top' | 'inline' = 'top';

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  @ViewChild('dialogList') dialogList!: PtrDialogListComponent;

  private destroyRef = inject(DestroyRef);

  private componentId = Math.random().toString(36).substring(2);
  private minChars = 3;
  private searchTerms = new Subject<string>();
  private hasSelectedOption = false;

  inputId = `${this.componentId}-input`;
  inputValue = signal('');
  searchResultOptions = signal<string[]>([]);
  onChange: (value: string) => void = () => { };
  onTouched: () => void = () => { };

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.searchFn) {
      if (!this.dialogList?.dialog.nativeElement.contains(event.target as Node) && this.dialogList?.isOpen()) {
        this.dialogList.closeDialog();
      }
    }
  }

  ngOnInit(): void {
    this.setupSearch();
  }

  private setupSearch() {
    if (this.searchFn) {
      this.searchTerms.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(term => term.length >= this.minChars ? this.searchFn!(term) : of([])),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(results => {
        this.searchResultOptions.set(results);
        if (results.length > 0 && this.dialogList) {
          this.dialogList.openDialogSilent();
        } else {
          this.dialogList.closeDialog();
        }
      });
    }
  }

  onInputChange(value: string) {
    this.inputValue.set(value);
    this.onChange(value);
    if (!this.hasSelectedOption && this.searchFn && value.length >= this.minChars) {
      this.searchTerms.next(value);
    }
    this.hasSelectedOption = false;
  }

  onOptionSelected(optionValue: string | null) {
    this.hasSelectedOption = true;

    this.inputValue.set(optionValue ?? '');
    this.onChange(optionValue ?? '');
    if (this.dialogList) {
      this.dialogList.closeDialog();
    }
  }

  onFocus() {
    if (this.searchResultOptions().length > 0 && this.dialogList && !this.hasSelectedOption) {
      this.dialogList.openDialogSilent();
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
    if (this.input?.nativeElement) {
      this.input.nativeElement.disabled = isDisabled;
    }
  }

}
