import { TestBed } from '@angular/core/testing';

import { UsuariosVeiculosService } from './usuarios-veiculos.service';

describe('UsuariosVeiculosService', () => {
  let service: UsuariosVeiculosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosVeiculosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
