import { TestBed } from '@angular/core/testing';

import { PtrToasterService } from './ptr-toaster.service';

describe('PtrToasterService', () => {
  let service: PtrToasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PtrToasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
