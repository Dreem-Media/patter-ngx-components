import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtrTabsComponent } from './ptr-tabs.component';

describe('PtrTabsComponent', () => {
  let component: PtrTabsComponent;
  let fixture: ComponentFixture<PtrTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PtrTabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PtrTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
