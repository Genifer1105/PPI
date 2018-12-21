import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CamadasComponent } from './camadas.component';

describe('CamadasComponent', () => {
  let component: CamadasComponent;
  let fixture: ComponentFixture<CamadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
