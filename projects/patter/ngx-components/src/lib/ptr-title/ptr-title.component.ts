import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, TitleStrategy } from '@angular/router';
import { filter, map, Observable, startWith } from 'rxjs';

@Component({
    selector: 'ptr-title',
    imports: [CommonModule],
    templateUrl: './ptr-title.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtrTitleComponent implements OnInit {

  @Input() styleClass = 'entry-title';
  @Input() wrapperStyleClass = '';
  @Input() screenReaderOnly = false;

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private titleStrategy = inject(TitleStrategy);

  displayTitle$!: Observable<string>;
  hideTitle$!: Observable<boolean>;

  ngOnInit() {
    const routeEvents$ = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      startWith(null),
      map(() => this.getRoute(this.activatedRoute))
    );

    this.hideTitle$ = routeEvents$.pipe(
      map(route => !!route.snapshot.data['hideTitle'])
    );

    this.displayTitle$ = routeEvents$.pipe(
      map(route => {
        if (route.snapshot.data['hideTitle']) {
          return '';
        }
        // Check for a custom display title in the route data
        const customDisplayTitle = route.snapshot.data['displayTitle'];
        if (customDisplayTitle) {
          return customDisplayTitle;
        }
        // If no custom display title, use the resolved title from TitleStrategy
        const resolvedTitle = this.titleStrategy.getResolvedTitleForRoute(route.snapshot) || '';
        return resolvedTitle;
        // Remove any common suffix (checking for both ' | ' and ' - ' separators)
        // return this.removeCommonSuffix(resolvedTitle);
      })
    );
  }

  private getRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

}
