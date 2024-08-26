import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtrToasterComponent } from './ptr-toaster.component';

describe('PtrToasterComponent', () => {
  let component: PtrToasterComponent;
  let fixture: ComponentFixture<PtrToasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PtrToasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PtrToasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
