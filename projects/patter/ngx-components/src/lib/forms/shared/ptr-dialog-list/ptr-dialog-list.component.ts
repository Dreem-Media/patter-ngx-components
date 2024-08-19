import { ChangeDetectionStrategy, Component, computed, ElementRef, EventEmitter, Input, Output, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PtrOption, PtrOptionGroup } from '../../interfaces';

interface ProcessedOption {
  type: 'option' | 'group';
  label: string;
  value?: string;
  options?: ProcessedOption[];
}

@Component({
  selector: 'ptr-dialog-list',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './ptr-dialog-list.component.html',
  styleUrls: ['./ptr-dialog-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtrDialogListComponent {

  @Input() set options(value: (PtrOption | PtrOptionGroup | string)[] | undefined) {
    this._options.set(this.processOptions(value));
  }
  @Input() showSearch = false;
  @Input() searchPlaceholder = 'Search...';

  @Output() selectionChange = new EventEmitter<string | null>();
  @Output() dialogClosed = new EventEmitter<void>();
  @Output() searchTermChanged = new EventEmitter<string>();

  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;

  private _options = signal<ProcessedOption[]>([]);
  value = signal<string | null>(null);
  searchTerm = signal('');
  highlightedIndex = signal(-1);
  isOpen = signal(false);
  private componentId = Math.random().toString(36).substring(2);
  listId = `${this.componentId}-list`;

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

  openDialog() {
    this.dialog.nativeElement.show();
    this.isOpen.set(true);
  }

  closeDialog() {
    this.dialog.nativeElement.close();
    this.isOpen.set(false);
    this.searchTerm.set('');
    this.highlightedIndex.set(-1);
    this.dialogClosed.emit();
  }

  updateSearchTerm(term: string) {
    this.searchTerm.set(term);
    this.highlightedIndex.set(-1);
    this.searchTermChanged.emit(term);
  }

  onDialogKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeDialog();
      event.preventDefault();
    }
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

  focusOption() {
    if (this.highlightedIndex() >= 0) {
      const options = this.dialog.nativeElement.querySelectorAll('li[role="option"]');
      (options[this.highlightedIndex()] as HTMLElement).focus();
    }
  }

  selectOption(optionValue: string) {
    this.value.set(optionValue);
    this.selectionChange.emit(optionValue);
    this.closeDialog();
  }

  private getTotalOptionsCount(): number {
    return this.filteredOptions().reduce((count, item) => {
      if (item.type === 'group') {
        return count + item.options!.length;
      }
      return count + 1;
    }, 0);
  }

  private processOptions(options: (PtrOption | PtrOptionGroup | string)[] | undefined): ProcessedOption[] {
    if (!options) return [];
    return options.map(option => {
      if (typeof option === 'string') {
        return {
          type: 'option',
          label: option,
          value: option
        };
      } else if ('groupLabel' in option) {
        return {
          type: 'group',
          label: option.groupLabel,
          options: option.options.map(subOption => ({
            type: 'option',
            label: typeof subOption === 'string' ? subOption : subOption.label,
            value: typeof subOption === 'string' ? subOption : subOption.value
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
