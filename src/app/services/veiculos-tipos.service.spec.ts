import { TestBed } from '@angular/core/testing';

import { VeiculosTiposService } from './veiculos-tipos.service';

describe('VeiculosTiposService', () => {
  let service: VeiculosTiposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VeiculosTiposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
