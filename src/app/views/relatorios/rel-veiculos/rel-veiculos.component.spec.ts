import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelVeiculosComponent } from './rel-veiculos.component';

describe('RelVeiculosComponent', () => {
  let component: RelVeiculosComponent;
  let fixture: ComponentFixture<RelVeiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelVeiculosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelVeiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
