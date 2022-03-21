import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessosGaragemComponent } from './acessos-garagem.component';

describe('AcessosGaragemComponent', () => {
  let component: AcessosGaragemComponent;
  let fixture: ComponentFixture<AcessosGaragemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcessosGaragemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcessosGaragemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
