import { TestBed } from '@angular/core/testing';

import { ViaturasService } from './viaturas.service';

describe('ViaturasService', () => {
  let service: ViaturasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViaturasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
