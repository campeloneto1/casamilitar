import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManifestacoesComponent } from './manifestacoes.component';

describe('ManifestacoesComponent', () => {
  let component: ManifestacoesComponent;
  let fixture: ComponentFixture<ManifestacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManifestacoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManifestacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
