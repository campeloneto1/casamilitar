import { TestBed } from '@angular/core/testing';

import { NiveisPostosService } from './niveis-postos.service';

describe('NiveisPostosService', () => {
  let service: NiveisPostosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NiveisPostosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
