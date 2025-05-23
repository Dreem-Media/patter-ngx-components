import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'ptr-loading-spinner',
    imports: [],
    template: `<div class="ptr-progress-spinner"></div>`,
    styleUrls: ["./loading-spinner.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtrLoadingSpinnerComponent { }
