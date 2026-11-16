import { PLATFORM_ID } from '@angular/core';
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

  it('does not measure the viewport during server rendering', async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [PtrDialogListComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }]
    }).compileComponents();

    const serverFixture = TestBed.createComponent(PtrDialogListComponent);
    serverFixture.detectChanges();
    serverFixture.componentInstance.adjustDialogPosition();

    expect(serverFixture.componentInstance.dialog.nativeElement.style.top).toBe('');
  });
});
