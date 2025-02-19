import { ChangeDetectionStrategy, Component, computed, inject, Input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs';
import { BreadcrumbRouteInfo, PtrBreadcrumb } from './interfaces';
@Component({
    selector: 'ptr-breadcrumbs',
    imports: [RouterModule],
    templateUrl: './ptr-breadcrumbs.component.html',
    styleUrl: './ptr-breadcrumbs.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtrBreadcrumbsComponent {

  @Input() showFirstSeparator = true;

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  private routeEvents = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged()
    )
  );

  breadcrumbs = computed(() => {
    this.routeEvents();
    return this.createBreadcrumbs(this.activatedRoute.root);
  });

  private createBreadcrumbs(route: ActivatedRoute, routeUrl = '', breadcrumbs: PtrBreadcrumb[] = []): PtrBreadcrumb[] {
    const routeChildren: ActivatedRoute[] = route.children;
    if (routeChildren.length === 0) {
      return breadcrumbs;
    }
    for (const child of routeChildren) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        routeUrl += `/${routeURL}`;
      }
      const { label, url } = this.getLabelForRoute(child);

      // Skip if the label is undefined or empty and the path is empty
      if (label && (!breadcrumbs.length || breadcrumbs[breadcrumbs.length - 1].label !== label)) {
        breadcrumbs.push({ label, url: url ?? routeUrl });
      }

      return this.createBreadcrumbs(child, routeUrl, breadcrumbs);
    }
    return breadcrumbs;
  }

  private getLabelForRoute(route: ActivatedRoute): BreadcrumbRouteInfo {
    const breadcrumbReturnInfo: BreadcrumbRouteInfo = {};
    const customBreadcrumb = route.snapshot.data['breadcrumb'] as BreadcrumbRouteInfo | undefined;

    if (customBreadcrumb) {
      if (customBreadcrumb.label) {
        breadcrumbReturnInfo.label = customBreadcrumb.label;
      }
      if (customBreadcrumb.url) {
        breadcrumbReturnInfo.url = customBreadcrumb.url;
      }
    } else if (route.snapshot.title) {
      breadcrumbReturnInfo.label = route.snapshot.title;
    }

    return breadcrumbReturnInfo;
  }

}
