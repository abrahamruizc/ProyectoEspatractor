import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaquinasReparadasComponent } from './maquinas-reparadas.component';

describe('MaquinasReparadasComponent', () => {
  let component: MaquinasReparadasComponent;
  let fixture: ComponentFixture<MaquinasReparadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaquinasReparadasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaquinasReparadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
