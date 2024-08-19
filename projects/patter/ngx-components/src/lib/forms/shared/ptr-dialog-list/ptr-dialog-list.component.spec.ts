import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtrDialogListComponent } from './ptr-dialog-list.component';

describe('PtrDialogListComponent', () => {
  let component: PtrDialogListComponent;
  let fixture: ComponentFixture<PtrDialogListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PtrDialogListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PtrDialogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
