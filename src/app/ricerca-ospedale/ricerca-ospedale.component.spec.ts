import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RicercaOspedaleComponent } from './ricerca-ospedale.component';

describe('RicercaOspedaleComponent', () => {
  let component: RicercaOspedaleComponent;
  let fixture: ComponentFixture<RicercaOspedaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RicercaOspedaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RicercaOspedaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
