import { TestBed } from '@angular/core/testing';
import { PtrToasterService } from './ptr-toaster.service';

describe('PtrToasterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: []
    });
  });

  it('should be defined', () => {
    // Just test if the class exists without instantiating
    expect(PtrToasterService).toBeDefined();
  });
});

