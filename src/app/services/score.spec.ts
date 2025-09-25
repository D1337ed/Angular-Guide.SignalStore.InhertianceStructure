import { TestBed } from '@angular/core/testing';

import { SCore } from './score';

describe('SCore', () => {
  let service: SCore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SCore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
