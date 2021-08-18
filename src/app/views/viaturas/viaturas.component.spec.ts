import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViaturasComponent } from './viaturas.component';

describe('ViaturasComponent', () => {
  let component: ViaturasComponent;
  let fixture: ComponentFixture<ViaturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViaturasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViaturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
