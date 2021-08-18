import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstconsultaComponent } from './estconsulta.component';

describe('EstconsultaComponent', () => {
  let component: EstconsultaComponent;
  let fixture: ComponentFixture<EstconsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstconsultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstconsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
