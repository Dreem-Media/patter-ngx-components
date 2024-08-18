import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, AfterViewInit } from '@angular/core';
import { PtrButtonComponent } from '../../ptr-button/ptr-button.component';

@Component({
  selector: 'ptr-dialog',
  standalone: true,
  imports: [
    PtrButtonComponent
  ],
  templateUrl: './ptr-dialog.component.html',
  styleUrls: ["./ptr-dialog.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtrDialogComponent implements AfterViewInit {

  @ViewChild('dialogElement') dialogElement!: ElementRef<HTMLDialogElement>;

  @Input() message = '';
  @Input() buttonText = 'Confirm';
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
