import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtrFormComponent } from './form.component';

describe('PtrFormComponent', () => {
  let component: PtrFormComponent;
  let fixture: ComponentFixture<PtrFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PtrFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PtrFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
