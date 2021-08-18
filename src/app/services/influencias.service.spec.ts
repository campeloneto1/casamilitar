import { TestBed } from '@angular/core/testing';

import { InfluenciasService } from './influencias.service';

describe('InfluenciasService', () => {
  let service: InfluenciasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfluenciasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
