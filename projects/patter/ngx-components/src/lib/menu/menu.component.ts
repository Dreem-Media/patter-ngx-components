import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

export interface PtrMenuItem {
  label: string;
  link?: string;
  children?: PtrMenuItem[];
}

@Component({
  selector: 'ptr-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./menu.component.scss']
})
export class PtrMenuComponent {

  @Input() menuItems: PtrMenuItem[] = [];

}
