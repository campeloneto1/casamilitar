import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosPrintComponent } from './eventos-print.component';

describe('EventosPrintComponent', () => {
  let component: EventosPrintComponent;
  let fixture: ComponentFixture<EventosPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventosPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
