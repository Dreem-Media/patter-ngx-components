import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import { PtrButtonComponent } from '../../ptr-button/ptr-button.component';
import { CommonModule } from '@angular/common';

export interface DialogResult<T = unknown> {
  result: boolean;
  data: T | null;
}

@Component({
    selector: 'ptr-dialog',
    imports: [
        PtrButtonComponent,
        CommonModule
    ],
    templateUrl: './ptr-dialog.component.html',
    styleUrls: ["./ptr-dialog.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtrDialogComponent<T = unknown> implements AfterViewInit {

  @ViewChild('dialogElement') dialogElement!: ElementRef<HTMLDialogElement>;

  @Input() title = '';
  @Input() message = '';
  @Input() buttonText = 'Confirm';
  @Input() buttonStyle: 'normal' | 'error' | 'secondary' = 'normal';
  @Input() contentTemplate: TemplateRef<unknown> | null = null;
  @Input() hasDefaultContent = true;
  @Input() data: T | null = null;

  @Output() closed = new EventEmitter<DialogResult<T>>();

  ngAfterViewInit() {
    this.dialogElement.nativeElement.showModal();
  }

  close() {
    this.dialogElement.nativeElement.close();
  }

  confirm() {
    this.closed.emit({result: true, data: this.data});
    this.close();
  }

  onClose() {
    this.closed.emit({result: false, data: this.data});
  }

  setData(data: T) {
    this.data = data;
  }
}
