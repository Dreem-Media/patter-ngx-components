import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtrDialogComponent } from './ptr-dialog.component';

describe('PtrDialogComponent', () => {
  let component: PtrDialogComponent;
  let fixture: ComponentFixture<PtrDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PtrDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PtrDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
