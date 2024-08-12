import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtrButtonComponent } from './ptr-button.component';

describe('PtrButtonComponent', () => {
  let component: PtrButtonComponent;
  let fixture: ComponentFixture<PtrButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PtrButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PtrButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
