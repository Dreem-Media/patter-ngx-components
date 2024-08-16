import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, TitleStrategy } from '@angular/router';
import { filter, map, Observable } from 'rxjs';

@Component({
  selector: 'ptr-title',
  standalone: true,
  imports: [CommonModule],
  template: '@if (!(hideTitle$ | async)) {<header class="entry-header is-layout-constrained my-3"><h1 class="entry-title">{{ displayTitle$ | async }}</h1></header>}',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtrTitleComponent implements OnInit {

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private titleStrategy = inject(TitleStrategy);

  displayTitle$!: Observable<string>;
  hideTitle$!: Observable<boolean>;

  ngOnInit() {
    const routeEvents$ = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
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
        // Remove any common suffix (checking for both ' | ' and ' - ' separators)
        return this.removeCommonSuffix(resolvedTitle);
      })
    );
  }

  private getRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  private removeCommonSuffix(title: string): string {
    const separators = [' | ', ' - '];
    for (const separator of separators) {
      const parts = title.split(separator);
      if (parts.length > 1) {
        return parts[0].trim();
      }
    }
    return title.trim();
  }

}
