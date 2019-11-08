import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacunasCamadaComponent } from './vacunas-camada.component';

describe('VacunasCamadaComponent', () => {
  let component: VacunasCamadaComponent;
  let fixture: ComponentFixture<VacunasCamadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacunasCamadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacunasCamadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
