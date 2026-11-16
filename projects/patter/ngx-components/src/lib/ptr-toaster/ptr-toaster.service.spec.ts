import { DOCUMENT } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
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

  it('does not attach browser UI during server rendering', () => {
    TestBed.resetTestingModule();
    const serverDocument = document.implementation.createHTMLDocument();
    const appendChild = vi.spyOn(serverDocument.body, 'appendChild');
    TestBed.configureTestingModule({
      providers: [
        { provide: DOCUMENT, useValue: serverDocument },
        { provide: PLATFORM_ID, useValue: 'server' }
      ]
    });

    TestBed.inject(PtrToasterService);

    expect(appendChild).not.toHaveBeenCalled();
  });
});

