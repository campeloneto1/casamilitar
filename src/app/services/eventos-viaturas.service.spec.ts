import { TestBed } from '@angular/core/testing';

import { EventosViaturasService } from './eventos-viaturas.service';

describe('EventosViaturasService', () => {
  let service: EventosViaturasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventosViaturasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
