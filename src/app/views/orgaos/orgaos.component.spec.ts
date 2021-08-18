import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgaosComponent } from './orgaos.component';

describe('OrgaosComponent', () => {
  let component: OrgaosComponent;
  let fixture: ComponentFixture<OrgaosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgaosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgaosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
