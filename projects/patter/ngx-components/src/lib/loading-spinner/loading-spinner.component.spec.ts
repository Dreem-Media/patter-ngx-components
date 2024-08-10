import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtrLoadingSpinnerComponent } from './loading-spinner.component';

describe('PtrLoadingSpinnerComponent', () => {
  let component: PtrLoadingSpinnerComponent;
  let fixture: ComponentFixture<PtrLoadingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PtrLoadingSpinnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PtrLoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
