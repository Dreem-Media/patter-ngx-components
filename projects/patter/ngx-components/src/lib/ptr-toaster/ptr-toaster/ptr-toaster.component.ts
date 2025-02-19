import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PtrToasterService } from '../ptr-toaster.service';

@Component({
    selector: 'ptr-toaster',
    imports: [CommonModule],
    templateUrl: './ptr-toaster.component.html',
    styleUrl: './ptr-toaster.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtrToasterComponent {
  protected toasterService = inject(PtrToasterService);
}
