/* eslint-disable @typescript-eslint/no-empty-function */
import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, HostListener, Input, OnInit, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { PtrButtonComponent } from '../../../ptr-button/ptr-button.component';
import { PtrDialogListComponent } from '../../shared/ptr-dialog-list/ptr-dialog-list.component';
import { PtrOption, PtrOptionGroup } from '../../interfaces';

@Component({
  selector: 'ptr-chip-input',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PtrButtonComponent,
    PtrDialogListComponent
],
  templateUrl: './ptr-chip-input.component.html',
  styleUrls: ['./ptr-chip-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PtrChipInputComponent),
      multi: true
    }
  ]
})
export class PtrChipInputComponent implements ControlValueAccessor, OnInit {
  @Input() label = '';
  @Input() placeholder?: string | null = 'Add item...';
  @Input() description? = '';
  @Input() labelPosition?: 'top' | 'inline' = 'top';
  @Input() maxItems?: number;
  @Input() suggestions: (PtrOption | PtrOptionGroup | string)[] | undefined;
  /**
   * Auto reopen the suggestions dialog after adding/selecting a chip (default true)
   * as long as maxItems has not been reached.
   */
  @Input() autoReopenAfterSelect = true;

  @ViewChild('chipInput') chipInput!: ElementRef<HTMLInputElement>;
  @ViewChild('dialogList') dialogList?: PtrDialogListComponent;

  private componentId = Math.random().toString(36).substring(2);
  inputId = `${this.componentId}-input`;

  inputValue = signal('');
  chipItems = signal<string[]>([]);
  isDisabled = signal(false);

  tempInputControl = new FormControl('');

  onChange: (value: string[]) => void = () => { };
  onTouched: () => void = () => { };

  ngOnInit(): void {
    this.tempInputControl.valueChanges.subscribe(value => {
      this.inputValue.set(value || '');
    });
  }

  addChip(): void {
    const value = this.inputValue().trim();
    if (value && (!this.maxItems || this.chipItems().length < this.maxItems)) {
      // Don't add duplicates
      if (!this.chipItems().includes(value)) {
        const newChips = [...this.chipItems(), value];
        this.chipItems.set(newChips);
        this.onChange(newChips);
      }
      this.tempInputControl.setValue('');
      this.chipInput.nativeElement.focus();
  this.maybeReopenDialog();
    }
  }

  removeChip(index: number): void {
    const newChips = [...this.chipItems()];
    newChips.splice(index, 1);
    this.chipItems.set(newChips);
    this.onChange(newChips);
  }

  onKeyDown(event: KeyboardEvent): void {
    // Re-open dialog when typing if closed
    if (!this.dialogList?.isOpen?.() && this.hasSuggestions() && event.key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey) {
      this.openDialog();
    }
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      this.addChip();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.openDialog();
    } else if (event.key === 'Escape') {
      this.closeDialog();
    } else if (event.key === 'Backspace' && !this.inputValue() && this.chipItems().length > 0) {
      // Remove the last chip when backspace is pressed and input is empty
      this.removeChip(this.chipItems().length - 1);
    }
  }

  onBlur(): void {
    // Add the chip when the input loses focus if there's a value
    // but only if the suggestions dialog isn't open
    if (!this.dialogList?.isOpen?.() && this.inputValue().trim()) {
      this.addChip();
    }
    this.onTouched();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as Node;
    const dialogEl = this.dialogList?.dialog?.nativeElement as HTMLElement | undefined;
    const inputEl = this.chipInput?.nativeElement as HTMLElement | undefined;
    if (
      this.dialogList?.isOpen?.() &&
      dialogEl && !dialogEl.contains(target) &&
      inputEl && !inputEl.contains(target)
    ) {
      this.closeDialog();
    }
  }

  openDialog(): void {
  if (this.isDisabled() || (this.maxItems !== undefined && this.chipItems().length >= this.maxItems)) return;
  if (!this.suggestions || this.suggestions.length === 0) return;
    this.dialogList?.openDialog?.();
  }

  closeDialog(): void {
    this.dialogList?.closeDialog?.();
  }

  onSuggestionSelected(optionValue: string | null) {
    if (!optionValue) {
      this.closeDialog();
      return;
    }
    this.closeDialog();
    this.addChipFromValue(optionValue);
  this.maybeReopenDialog();
  }

  private addChipFromValue(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (this.maxItems !== undefined && this.chipItems().length >= this.maxItems) return;
    if (!this.chipItems().includes(trimmed)) {
      const newChips = [...this.chipItems(), trimmed];
      this.chipItems.set(newChips);
      this.onChange(newChips);
    }
    // Clear input and refocus for quick entry
    this.tempInputControl.setValue('');
    this.chipInput?.nativeElement.focus();
  }

  private maybeReopenDialog() {
    if (
      this.autoReopenAfterSelect &&
      !this.isDisabled() &&
      (!this.maxItems || this.chipItems().length < this.maxItems) &&
      this.hasSuggestions()
    ) {
      queueMicrotask(() => this.openDialog());
    }
  }

  private hasSuggestions(): boolean {
    return !!(this.suggestions && this.suggestions.length > 0);
  }

  writeValue(value: string[]): void {
    this.chipItems.set(value || []);
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
    if (isDisabled) {
      this.tempInputControl.disable();
    } else {
      this.tempInputControl.enable();
    }
  }
}
