import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SindicatosComponent } from './sindicatos.component';

describe('SindicatosComponent', () => {
  let component: SindicatosComponent;
  let fixture: ComponentFixture<SindicatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SindicatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SindicatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
