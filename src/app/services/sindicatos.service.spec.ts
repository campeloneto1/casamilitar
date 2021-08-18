import { TestBed } from '@angular/core/testing';

import { SindicatosService } from './sindicatos.service';

describe('SindicatosService', () => {
  let service: SindicatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SindicatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
