import { TestBed } from '@angular/core/testing';

import { EventosTiposService } from './eventos-tipos.service';

describe('EventosTiposService', () => {
  let service: EventosTiposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventosTiposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
