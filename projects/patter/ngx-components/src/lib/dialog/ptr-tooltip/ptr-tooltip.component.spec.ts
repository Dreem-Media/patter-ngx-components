import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtrTooltipComponent } from './ptr-tooltip.component';

describe('PtrTooltipComponent', () => {
  let component: PtrTooltipComponent;
  let fixture: ComponentFixture<PtrTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PtrTooltipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PtrTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
