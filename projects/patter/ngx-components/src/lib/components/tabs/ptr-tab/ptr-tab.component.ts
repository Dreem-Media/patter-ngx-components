import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';

@Component({
  selector: 'ptr-tab',
  standalone: true,
  template: '@if(active()){<ng-content></ng-content>}',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtrTabComponent {
  @Input() label!: string;
  @Input() link?: string;

  active = signal(false);
}
