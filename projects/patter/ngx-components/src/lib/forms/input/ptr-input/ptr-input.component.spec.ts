import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtrInputComponent } from './ptr-input.component';

describe('PtrInputComponent', () => {
  let component: PtrInputComponent;
  let fixture: ComponentFixture<PtrInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PtrInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PtrInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
