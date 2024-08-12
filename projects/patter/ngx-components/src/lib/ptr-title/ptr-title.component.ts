import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, TitleStrategy } from '@angular/router';
import { filter, map, Observable } from 'rxjs';

@Component({
  selector: 'ptr-title',
  standalone: true,
  imports: [CommonModule],
  template: '@if (!(hideTitle$ | async)) {<header class="entry-header is-layout-constrained my-3"><h1 class="entry-title">{{ title$ | async }}</h1></header>}',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtrTitleComponent implements OnInit {

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private titleStrategy = inject(TitleStrategy);

  title$!: Observable<string>;
  hideTitle$!: Observable<boolean>;

  ngOnInit() {
    const routeEvents$ = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.getRoute(this.activatedRoute))
    );

    this.hideTitle$ = routeEvents$.pipe(
      map(route => !!route.snapshot.data['hideTitle'])
    );

    this.title$ = routeEvents$.pipe(
      map(route => {
        if (route.snapshot.data['hideTitle']) {
          return '';
        }
        return this.titleStrategy.getResolvedTitleForRoute(route.snapshot) || '';
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
