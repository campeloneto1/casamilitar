import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelAcessosComponent } from './rel-acessos.component';

describe('RelAcessosComponent', () => {
  let component: RelAcessosComponent;
  let fixture: ComponentFixture<RelAcessosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelAcessosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelAcessosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
