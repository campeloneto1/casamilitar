import { TestBed } from '@angular/core/testing';

import { PessoasVeiculosService } from './pessoas-veiculos.service';

describe('PessoasVeiculosService', () => {
  let service: PessoasVeiculosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PessoasVeiculosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
