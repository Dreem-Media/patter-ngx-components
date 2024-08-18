import { ChangeDetectionStrategy, Component, computed, ElementRef, EventEmitter, forwardRef, HostListener, Input, Output, Signal, signal, ViewChild } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

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

  @Input() set options(value: string[]) {
    this._options.set(value);
  }
  @Input() placeholder: string = 'Select an option';
  @Output() selectionChange = new EventEmitter<string | null>();

  @ViewChild('selectDialog') selectDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  private _options = signal<string[]>([]);
  value = signal<string | null>(null);
  searchTerm = signal('');
  highlightedIndex = signal(-1);
  isOpen = signal(false);

  filteredOptions: Signal<string[]> = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this._options().filter(option =>
      option.toLowerCase().includes(term)
    );
  });

  private componentId = Math.random().toString(36).substring(2);
  labelId = `${this.componentId}-label`;
  listId = `${this.componentId}-list`;
  searchId = `${this.componentId}-search`;

  onChange: any = () => { };
  onTouched: any = () => { };

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
        this.highlightedIndex.update(i => Math.min(i + 1, this.filteredOptions().length - 1));
        this.focusOption();
        event.preventDefault();
        break;
      case 'Escape':
        this.closeDialog();
        event.preventDefault();
        break;
    }
  }

  onOptionKeyDown(event: KeyboardEvent, option: string) {
    switch (event.key) {
      case 'ArrowDown':
        this.highlightedIndex.update(i => Math.min(i + 1, this.filteredOptions().length - 1));
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
        this.selectOption(option);
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

  selectOption(option: string) {
    this.value.set(option);
    this.onChange(this.value());
    this.onTouched();
    this.selectionChange.emit(this.value());
    this.closeDialog();
  }

  writeValue(value: string): void {
    this.value.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implement if needed
  }

}
