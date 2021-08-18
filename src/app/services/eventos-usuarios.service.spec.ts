import { TestBed } from '@angular/core/testing';

import { EventosUsuariosService } from './eventos-usuarios.service';

describe('EventosUsuariosService', () => {
  let service: EventosUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventosUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
