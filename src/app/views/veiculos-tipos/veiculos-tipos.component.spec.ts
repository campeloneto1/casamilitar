import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiculosTiposComponent } from './veiculos-tipos.component';

describe('VeiculosTiposComponent', () => {
  let component: VeiculosTiposComponent;
  let fixture: ComponentFixture<VeiculosTiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeiculosTiposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VeiculosTiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
