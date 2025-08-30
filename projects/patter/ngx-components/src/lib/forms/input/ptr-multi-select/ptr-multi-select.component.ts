/* eslint-disable @typescript-eslint/no-empty-function */
import { ChangeDetectionStrategy, Component, computed, ElementRef, EventEmitter, forwardRef, HostListener, Input, Output, signal, ViewChild } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { PtrOption, PtrOptionGroup } from '../../interfaces';
import { PtrMultiDialogListComponent } from '../../shared/ptr-multi-dialog-list/ptr-multi-dialog-list.component';

@Component({
  selector: 'ptr-multi-select',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PtrMultiDialogListComponent
  ],
  templateUrl: './ptr-multi-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./ptr-multi-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PtrMultiSelectComponent),
      multi: true
    }
  ]
})
export class PtrMultiSelectComponent {

  @Input() options: (PtrOption | PtrOptionGroup | string)[] | undefined;
  @Input() showSearch = true;
  @Input() placeholder?: string | null = 'Select options';
  @Input() label? = '';
  @Input() description? = '';
  @Input() labelPosition?: 'top' | 'inline' = 'top';
  @Input() maxSelections?: number;
  @Input() showSelectAll = true;

  @Output() selectionChange = new EventEmitter<string[]>();

  @ViewChild('selectButton') selectButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('dialogList') dialogList!: PtrMultiDialogListComponent;

  value = signal<string[]>([]);

  selectedOptions = computed(() => {
    const currentValues = this.value();
    if (currentValues.length === 0) return [];
    const allOptions = this.flattenOptions(this.options);
    return allOptions.filter(option => currentValues.includes(option.value));
  });

  displayText = computed(() => {
    const selected = this.selectedOptions();
    if (selected.length === 0) return this.effectivePlaceholder();
    if (selected.length === 1) return selected[0].label;
    return `${selected.length} options selected`;
  });

  effectivePlaceholder = computed(() => {
    return this.placeholder?.trim() || 'Select options';
  });

  private componentId = Math.random().toString(36).substring(2);
  labelId = `${this.componentId}-label`;
  inputId = `${this.componentId}-input`;

  onChange: (value: string[]) => void = () => { };
  onTouched: () => void = () => { };

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.dialogList.dialog.nativeElement.contains(event.target as Node) &&
      !(event.target as HTMLElement).closest('.multi-select-button') &&
      this.dialogList.isOpen()) {
      this.dialogList.closeDialog();
    }
  }

  toggleDialog() {
    if (this.dialogList.isOpen()) {
      this.dialogList.closeDialog();
    } else {
      this.dialogList.openDialog();
    }
  }

  onSelectionChanged(selectedValues: string[]) {
    this.value.set(selectedValues);
    this.onChange(selectedValues);
    this.onTouched();
    this.selectionChange.emit(selectedValues);
  }

  removeSelectedItem(valueToRemove: string) {
    const currentValues = this.value();
    const updatedValues = currentValues.filter(value => value !== valueToRemove);
    this.onSelectionChanged(updatedValues);
  }

  writeValue(value: string[]): void {
    this.value.set(value || []);
  }

  registerOnChange(fn: (value: string[]) => void): void {
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
