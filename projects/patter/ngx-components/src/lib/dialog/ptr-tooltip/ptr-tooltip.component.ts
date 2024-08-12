import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'ptr-tooltip',
  standalone: true,
  imports: [],
  templateUrl: './ptr-tooltip.component.html',
  styleUrls: ["./ptr-tooltip.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtrTooltipComponent {

  @Input() content: string = '';

  @ViewChild('tooltipDialog') tooltipDialog!: ElementRef<HTMLDialogElement>;

  private tooltipTimer: any;

  showTooltip() {
    clearTimeout(this.tooltipTimer);
    this.tooltipTimer = setTimeout(() => {
      this.tooltipDialog.nativeElement.show();
    }, 200); // Small delay to prevent flickering on quick mouse movements
  }

  hideTooltip() {
    clearTimeout(this.tooltipTimer);
    this.tooltipTimer = setTimeout(() => {
      this.tooltipDialog.nativeElement.close();
    }, 200); // Small delay to allow moving mouse to tooltip
  }

}
