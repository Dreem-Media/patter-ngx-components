import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtrTitleComponent } from './ptr-title.component';

describe('PtrTitleComponent', () => {
  let component: PtrTitleComponent;
  let fixture: ComponentFixture<PtrTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PtrTitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PtrTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
