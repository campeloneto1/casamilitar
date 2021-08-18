import { TestBed } from '@angular/core/testing';

import { OrgaosService } from './orgaos.service';

describe('OrgaosService', () => {
  let service: OrgaosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrgaosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
