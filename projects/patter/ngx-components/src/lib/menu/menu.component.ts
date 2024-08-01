import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface PtrMenuItem {
  label: string;
  link?: string;
  children?: PtrMenuItem[];
}

@Component({
  selector: 'ptr-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtrMenuComponent {

  @Input() menuItems: PtrMenuItem[] = [];

}
