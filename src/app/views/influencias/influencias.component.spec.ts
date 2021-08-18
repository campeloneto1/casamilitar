import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluenciasComponent } from './influencias.component';

describe('InfluenciasComponent', () => {
  let component: InfluenciasComponent;
  let fixture: ComponentFixture<InfluenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfluenciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
