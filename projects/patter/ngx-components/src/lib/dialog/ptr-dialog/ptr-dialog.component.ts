import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { PtrButtonComponent } from '../../ptr-button/ptr-button.component';

@Component({
  selector: 'ptr-dialog',
  standalone: true,
  imports: [
    CommonModule,
    PtrButtonComponent
  ],
  templateUrl: './ptr-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtrDialogComponent {

  @ViewChild('dialogElement') dialogElement!: ElementRef<HTMLDialogElement>;

  @Input() message: string = '';
  @Input() buttonText: string = 'Confirm';
  @Input() buttonStyle: 'normal' | 'error' | 'secondary' = 'normal';

  @Output() closed = new EventEmitter<boolean | null>();

  ngAfterViewInit() {
    this.dialogElement.nativeElement.showModal();
  }

  close() {
    this.dialogElement.nativeElement.close();
  }

  confirm() {
    this.closed.emit(true);
    this.close();
  }

  onClose() {
    this.closed.emit(null);
  }

}