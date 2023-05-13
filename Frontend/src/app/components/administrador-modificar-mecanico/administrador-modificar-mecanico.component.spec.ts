import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorModificarMecanicoComponent } from './administrador-modificar-mecanico.component';

describe('AdministradorModificarMecanicoComponent', () => {
  let component: AdministradorModificarMecanicoComponent;
  let fixture: ComponentFixture<AdministradorModificarMecanicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorModificarMecanicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministradorModificarMecanicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
