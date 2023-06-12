import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorCrearAdministrativoComponent } from './administrador-crear-administrativo.component';

describe('AdministradorCrearAdministrativoComponent', () => {
  let component: AdministradorCrearAdministrativoComponent;
  let fixture: ComponentFixture<AdministradorCrearAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorCrearAdministrativoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministradorCrearAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
