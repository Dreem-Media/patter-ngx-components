import { TestBed } from '@angular/core/testing';

import { PtrDialogService } from './ptr-dialog.service';

describe('PtrDialogService', () => {
  let service: PtrDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PtrDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
