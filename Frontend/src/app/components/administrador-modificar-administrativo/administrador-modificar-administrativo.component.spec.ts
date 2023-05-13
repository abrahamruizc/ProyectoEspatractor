import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorModificarAdministrativoComponent } from './administrador-modificar-administrativo.component';

describe('AdministradorModificarAdministrativoComponent', () => {
  let component: AdministradorModificarAdministrativoComponent;
  let fixture: ComponentFixture<AdministradorModificarAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorModificarAdministrativoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministradorModificarAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
