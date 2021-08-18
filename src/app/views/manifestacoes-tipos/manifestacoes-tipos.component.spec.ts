import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManifestacoesTiposComponent } from './manifestacoes-tipos.component';

describe('ManifestacoesTiposComponent', () => {
  let component: ManifestacoesTiposComponent;
  let fixture: ComponentFixture<ManifestacoesTiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManifestacoesTiposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManifestacoesTiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
