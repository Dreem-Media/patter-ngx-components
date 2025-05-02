
import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, DestroyRef, effect, ElementRef, inject, QueryList, signal, ViewChildren } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PtrTabComponent } from '../ptr-tab/ptr-tab.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
    selector: 'ptr-tabs',
    imports: [RouterModule],
    templateUrl: './ptr-tabs.component.html',
    styleUrl: './ptr-tabs.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtrTabsComponent implements AfterViewInit {

  @ContentChildren(PtrTabComponent) tabComponents!: QueryList<PtrTabComponent>;
  @ViewChildren('tabButton') buttons!: QueryList<ElementRef>;

  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  tabs = signal<PtrTabComponent[]>([]);
  activeTabIndex = signal(0);
  useLinks = signal(false);
  sliderPosition = signal({ transform: 'translateX(0)', width: '0' });

  constructor() {
    effect(() => {
      const activeTab = this.tabs().find(tab => tab.active());
      if (activeTab?.link) {
        this.router.navigate([activeTab.link]);
      }
      this.updateSliderPosition();
    });
  }

  ngAfterViewInit() {
    this.tabComponents.changes
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.updateTabs();
      });
    this.updateTabs();
  }

  updateTabs() {
    this.tabs.set(this.tabComponents.toArray());
    this.useLinks.set(this.tabs().some(tab => !!tab.link));
    if (this.tabs().length > 0 && !this.tabs().some(tab => tab.active())) {
      this.selectTab(0);
    } else {
      this.updateSliderPosition();
    }
  }

  selectTab(index: number) {
    this.tabs().forEach((tab, i) => tab.active.set(i === index));
    this.activeTabIndex.set(index);
  }

  updateSliderPosition() {
    const activeButton = this.buttons?.get(this.activeTabIndex())?.nativeElement;
    if (activeButton) {
      const { offsetLeft, offsetWidth } = activeButton;
      this.sliderPosition.set({
        transform: `translateX(${offsetLeft}px)`,
        width: `${offsetWidth}px`
      });
    }
  }

}
