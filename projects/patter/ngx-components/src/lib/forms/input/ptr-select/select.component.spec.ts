import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtrSelectComponent } from './select.component';

describe('PtrSelectComponent', () => {
  let component: PtrSelectComponent;
  let fixture: ComponentFixture<PtrSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PtrSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PtrSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
