import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ptr-loading-spinner',
  standalone: true,
  imports: [],
  template: `<div class="vdx-progress-spinner"></div>`,
  styleUrls: ["./loading-spinner.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtrLoadingSpinnerComponent { }
