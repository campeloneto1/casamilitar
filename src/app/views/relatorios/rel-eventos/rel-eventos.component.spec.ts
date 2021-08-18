import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelEventosComponent } from './rel-eventos.component';

describe('RelEventosComponent', () => {
  let component: RelEventosComponent;
  let fixture: ComponentFixture<RelEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelEventosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
