import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorCrearMecanicoComponent } from './administrador-crear-mecanico.component';

describe('AdministradorCrearMecanicoComponent', () => {
  let component: AdministradorCrearMecanicoComponent;
  let fixture: ComponentFixture<AdministradorCrearMecanicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorCrearMecanicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministradorCrearMecanicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
