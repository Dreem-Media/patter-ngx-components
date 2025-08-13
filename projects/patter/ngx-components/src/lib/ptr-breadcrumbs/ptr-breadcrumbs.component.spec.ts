/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { PtrBreadcrumbsComponent } from './ptr-breadcrumbs.component';

describe('PtrBreadcrumbsComponent', () => {
  let component: PtrBreadcrumbsComponent;
  let fixture: ComponentFixture<PtrBreadcrumbsComponent>;
  let mockRouter: Partial<Router>;
  let mockActivatedRoute: any;
  let eventsSubject: BehaviorSubject<NavigationEnd>;

  beforeEach(async () => {
    // Create events subject
    eventsSubject = new BehaviorSubject<NavigationEnd>(new NavigationEnd(1, '/', '/'));

    // Create mock router with events observable
    mockRouter = {
      events: eventsSubject.asObservable()
    };

    // Create mock activated route with needed properties
    mockActivatedRoute = {
      root: {
        children: []
      },
      snapshot: {
        url: [],
        data: {},
        title: ''
      }
    };

    await TestBed.configureTestingModule({
      imports: [PtrBreadcrumbsComponent, RouterModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PtrBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
