import { TestBed } from '@angular/core/testing';

import { ManifestacoesService } from './manifestacoes.service';

describe('ManifestacoesService', () => {
  let service: ManifestacoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManifestacoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
