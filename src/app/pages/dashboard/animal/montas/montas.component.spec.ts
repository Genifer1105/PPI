import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MontasComponent } from './montas.component';

describe('MontasComponent', () => {
  let component: MontasComponent;
  let fixture: ComponentFixture<MontasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MontasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MontasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
