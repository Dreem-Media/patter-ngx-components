/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ChangeDetectionStrategy, Component, computed, ElementRef, EventEmitter, forwardRef, HostListener, Input, Output, signal, ViewChild } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { PtrOption, PtrOptionGroup } from '../../interfaces';
import { PtrDialogListComponent } from '../../shared/ptr-dialog-list/ptr-dialog-list.component';

@Component({
  selector: 'ptr-select',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PtrDialogListComponent
  ],
  templateUrl: './select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PtrSelectComponent),
      multi: true
    }
  ]
})
export class PtrSelectComponent {

  @Input() options: (PtrOption | PtrOptionGroup | string)[] | undefined;
  @Input() showSearch = true;
  @Input() placeholder? = 'Select an option';
  @Input() label? = '';
  @Output() selectionChange = new EventEmitter<string | null>();

  @ViewChild('selectButton') selectButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('dialogList') dialogList!: PtrDialogListComponent;

  value = signal<string | null>(null);
  isOpen = signal(false);

  displayValue = computed(() => {
    const currentValue = this.value();
    if (currentValue === null) return null;
    const allOptions = this.flattenOptions(this.options);
    const selectedOption = allOptions?.find(option => option.value === currentValue);
    return selectedOption ? selectedOption.label : null;
  });

  private componentId = Math.random().toString(36).substring(2);
  labelId = `${this.componentId}-label`;
  inputId = `${this.componentId}-input`;

  onChange: (value: string | null) => void = () => { };
  onTouched: () => void = () => { };

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.dialogList.dialog.nativeElement.contains(event.target as Node) &&
      !(event.target as HTMLElement).closest('.select-button') &&
      this.isOpen()) {
      this.dialogList.closeDialog();
      this.isOpen.set(false);
    }
  }

  toggleDialog() {
    if (this.isOpen()) {
      this.dialogList.closeDialog();
    } else {
      this.dialogList.openDialog();
    }
    this.isOpen.update(v => !v);
  }

  onOptionSelected(optionValue: string | null) {
    this.value.set(optionValue);
    this.onChange(optionValue);
    this.onTouched();
    this.selectionChange.emit(optionValue);
    this.isOpen.set(false);
  }

  writeValue(value: string): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (this.selectButton?.nativeElement) {
      this.selectButton.nativeElement.disabled = isDisabled;
    }
  }

  private flattenOptions(options: (PtrOption | PtrOptionGroup | string)[] | undefined): PtrOption[] {
    if (!options) return [];

    return options.flatMap(option => {
      if (typeof option === 'string') {
        return { value: option, label: option };
      } else if ('groupLabel' in option) {
        return option.options;
      } else {
        return option;
      }
    });
  }

}
