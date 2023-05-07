import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonAdministradorComponent } from './skeleton-administrador.component';

describe('SkeletonAdministradorComponent', () => {
  let component: SkeletonAdministradorComponent;
  let fixture: ComponentFixture<SkeletonAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonAdministradorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
