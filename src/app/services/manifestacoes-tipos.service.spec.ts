import { TestBed } from '@angular/core/testing';

import { ManifestacoesTiposService } from './manifestacoes-tipos.service';

describe('ManifestacoesTiposService', () => {
  let service: ManifestacoesTiposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManifestacoesTiposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
