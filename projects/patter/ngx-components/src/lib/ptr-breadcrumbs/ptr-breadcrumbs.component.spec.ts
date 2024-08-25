import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtrBreadcrumbsComponent } from './ptr-breadcrumbs.component';

describe('PtrBreadcrumbsComponent', () => {
  let component: PtrBreadcrumbsComponent;
  let fixture: ComponentFixture<PtrBreadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PtrBreadcrumbsComponent]
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
