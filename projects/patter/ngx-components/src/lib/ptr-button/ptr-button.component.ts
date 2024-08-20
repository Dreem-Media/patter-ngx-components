import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, EventEmitter, HostBinding, Input, Output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

type ButtonStyle = 'normal' | 'error' | 'secondary' | 'icon';

@Component({
  selector: 'ptr-button',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ptr-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtrButtonComponent {

  @HostBinding('class') get hostClasses() {
    const hostClass = [];
    if (this.style() === 'secondary') {
      hostClass.push('is-style-outline');
    }
    if (this.style() === 'error') {
      hostClass.push('is-style-error-button');
    }
    if (this.style() === 'icon') {
      hostClass.push('is-style-icon-button');
    }
    if (this.smallSize()) {
      hostClass.push('is-style-smaller-element');
    }
    return hostClass.join(' ');
  }

  style = signal<ButtonStyle>('normal');
  type = signal<'button' | 'submit' | 'reset'>('button');
  disabled = signal(false);
  href = signal<string | null>(null);
  routerLink = signal<string | (string|number)[] | null>(null);
  additionalClasses = signal('');
  smallSize = signal(false);

  @Input() set buttonStyle(value: ButtonStyle) {
    this.style.set(value);
  }

  @Input() set buttonType(value: 'button' | 'submit' | 'reset') {
    this.type.set(value);
  }

  @Input() set isDisabled(value: boolean) {
    this.disabled.set(value);
  }

  @Input() set hrefLink(value: string | null) {
    this.href.set(value);
  }

  @Input() set routerLinkValue(value: string | (string|number)[] | null) {
    this.routerLink.set(value);
  }

  @Input() set extraClasses(value: string) {
    this.additionalClasses.set(value);
  }

  @Input() set isSmallSize(value: boolean) {
    if (value) {
      this.smallSize.set(true);
    }
  }

  @Input() set isIconButton(value: boolean) {
    if (value) {
      this.style.set('icon');
    }
  }

  @Input() ariaLabel? = '';

  @Output() clicked = new EventEmitter<Event>();

  isLink = computed(() => !!this.href() || !!this.routerLink());

  buttonClasses = computed(() => {
    const classes = ['wp-block-button__link'];

    if (this.style() !== 'normal') {
      classes.push(`wp-block-button__link--${this.style()}`);
    }

    if (this.disabled() && this.isLink()) {
      classes.push('disabled');
    }

    if (this.additionalClasses()) {
      classes.push(this.additionalClasses());
    }

    return classes.join(' ');
  });

  onClick(event: Event): void {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }
    this.clicked.emit(event);
  }

}
