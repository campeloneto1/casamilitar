import { TestBed } from '@angular/core/testing';

import { GaragemService } from './garagem.service';

describe('GaragemService', () => {
  let service: GaragemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GaragemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
