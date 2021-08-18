import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosTiposComponent } from './eventos-tipos.component';

describe('EventosTiposComponent', () => {
  let component: EventosTiposComponent;
  let fixture: ComponentFixture<EventosTiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventosTiposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosTiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
