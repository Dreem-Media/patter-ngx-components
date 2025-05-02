/* eslint-disable @typescript-eslint/no-empty-function */
import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, Input, OnInit, signal, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PtrButtonComponent } from '../../../ptr-button/ptr-button.component';

@Component({
  selector: 'ptr-chip-input',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PtrButtonComponent
  ],
  templateUrl: './ptr-chip-input.component.html',
  styleUrls: ['./ptr-chip-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  @ViewChild('chipInput') chipInput!: ElementRef<HTMLInputElement>;

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
    }
  }

  removeChip(index: number): void {
    const newChips = [...this.chipItems()];
    newChips.splice(index, 1);
    this.chipItems.set(newChips);
    this.onChange(newChips);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      this.addChip();
    } else if (event.key === 'Backspace' && !this.inputValue() && this.chipItems().length > 0) {
      // Remove the last chip when backspace is pressed and input is empty
      this.removeChip(this.chipItems().length - 1);
    }
  }

  onBlur(): void {
    // Add the chip when the input loses focus if there's a value
    if (this.inputValue().trim()) {
      this.addChip();
    }
    this.onTouched();
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
