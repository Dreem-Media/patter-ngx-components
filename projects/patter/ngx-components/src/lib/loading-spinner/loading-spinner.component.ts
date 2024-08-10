import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ptr-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="spinner-overlay"><span>Loading...</span></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtrLoadingSpinnerComponent {

}
