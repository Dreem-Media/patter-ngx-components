/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ChangeDetectionStrategy, Component, computed, ElementRef, EventEmitter, forwardRef, HostListener, Input, Output, signal, ViewChild } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { PtrOption, PtrOptionGroup } from '../../interfaces';

interface ProcessedOption {
  type: 'option' | 'group';
  label: string;
  value?: string;
  options?: ProcessedOption[];
}

@Component({
  selector: 'ptr-select',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
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

  @Input() set options(value: (PtrOption | PtrOptionGroup)[] | undefined) {
    this._options.set(this.processOptions(value));
  }
  @Input() placeholder? = 'Select an option';
  @Output() selectionChange = new EventEmitter<string | null>();

  @ViewChild('selectButton') selectButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('selectDialog') selectDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  private _options = signal<ProcessedOption[]>([]);
  value = signal<string | null>(null);
  searchTerm = signal('');
  highlightedIndex = signal(-1);
  isOpen = signal(false);

  filteredOptions = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this._options().flatMap(item => {
      if (item.type === 'group') {
        const filteredOptions = item.options!.filter(option =>
          option.label.toLowerCase().includes(term)
        );
        return filteredOptions.length > 0 ? [{ ...item, options: filteredOptions }] : [];
      } else {
        return item.label.toLowerCase().includes(term) ? [item] : [];
      }
    });
  });

  displayValue = computed(() => {
    const currentValue = this.value();
    if (currentValue === null) return null;
    const flatOptions = this._options().flatMap(item =>
      item.type === 'group' ? item.options! : [item]
    );
    const selectedOption = flatOptions.find(option => option.value === currentValue);
    return selectedOption ? selectedOption.label : null;
  });

  private componentId = Math.random().toString(36).substring(2);
  labelId = `${this.componentId}-label`;
  listId = `${this.componentId}-list`;

  onChange: (value: string | null) => void = () => { };
  onTouched: () => void = () => { };

  isOptionGroup(option: PtrOption | PtrOptionGroup): option is PtrOptionGroup {
    return 'groupLabel' in option && 'options' in option;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.selectDialog.nativeElement.contains(event.target as Node) &&
      !(event.target as HTMLElement).closest('.select-button') &&
      this.isOpen()) {
      this.closeDialog();
    }
  }

  toggleDialog() {
    this.isOpen() ? this.closeDialog() : this.openDialog();
  }

  openDialog() {
    this.selectDialog.nativeElement.show();
    this.isOpen.set(true);
  }

  closeDialog() {
    this.selectDialog.nativeElement.close();
    this.isOpen.set(false);
    this.searchTerm.set('');
    this.highlightedIndex.set(-1);
  }

  updateSearchTerm(term: string) {
    this.searchTerm.set(term);
    this.highlightedIndex.set(-1);
  }

  onInputKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
        this.highlightedIndex.update(i => Math.min(i + 1, this.getTotalOptionsCount() - 1));
        this.focusOption();
        event.preventDefault();
        break;
      case 'Escape':
        this.closeDialog();
        event.preventDefault();
        break;
    }
  }

  onOptionKeyDown(event: KeyboardEvent, optionValue: string) {
    switch (event.key) {
      case 'ArrowDown':
        this.highlightedIndex.update(i => Math.min(i + 1, this.getTotalOptionsCount() - 1));
        this.focusOption();
        event.preventDefault();
        break;
      case 'ArrowUp':
        this.highlightedIndex.update(i => Math.max(i - 1, -1));
        this.focusOption();
        event.preventDefault();
        break;
      case 'Enter':
      case ' ':
        this.selectOption(optionValue);
        event.preventDefault();
        break;
    }
  }

  onDialogKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeDialog();
      event.preventDefault();
    }
  }

  focusOption() {
    if (this.highlightedIndex() >= 0) {
      const options = this.selectDialog.nativeElement.querySelectorAll('li[role="option"]');
      (options[this.highlightedIndex()] as HTMLElement).focus();
    }
  }

  selectOption(optionValue: string) {
    this.value.set(optionValue);
    this.onChange(optionValue);
    this.onTouched();
    this.selectionChange.emit(optionValue);
    this.closeDialog();
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
    this.selectButton.nativeElement.disabled = isDisabled;
  }

  private getTotalOptionsCount(): number {
    return this.filteredOptions().reduce((count, item) => {
      if (item.type === 'group') {
        return count + item.options!.length;
      }
      return count + 1;
    }, 0);
  }

  private processOptions(options: (PtrOption | PtrOptionGroup)[] | undefined): ProcessedOption[] {
    if (!options) return [];
    return options.map(option => {
      if ('groupLabel' in option) {
        return {
          type: 'group',
          label: option.groupLabel,
          options: option.options.map(subOption => ({
            type: 'option',
            label: subOption.label,
            value: subOption.value
          }))
        };
      } else {
        return {
          type: 'option',
          label: option.label,
          value: option.value
        };
      }
    });
  }

}
