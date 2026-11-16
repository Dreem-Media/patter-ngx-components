import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { describe, it, expect, beforeEach } from 'vitest';

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

  it('rejects opening a dialog during server rendering', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }]
    });

    const serverService = TestBed.inject(PtrDialogService);
    expect(() => serverService.open({ title: 'Server dialog' })).toThrowError(/only be used in a browser/);
  });
});
