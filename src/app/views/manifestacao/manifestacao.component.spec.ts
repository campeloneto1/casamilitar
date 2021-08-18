import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManifestacaoComponent } from './manifestacao.component';

describe('ManifestacaoComponent', () => {
  let component: ManifestacaoComponent;
  let fixture: ComponentFixture<ManifestacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManifestacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManifestacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
