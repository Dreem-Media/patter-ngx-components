import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtrMenuComponent } from './menu.component';

describe('PtrMenuComponent', () => {
  let component: PtrMenuComponent;
  let fixture: ComponentFixture<PtrMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PtrMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PtrMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
