import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonAdministrativoComponent } from './skeleton-administrativo.component';

describe('SkeletonAdministrativoComponent', () => {
  let component: SkeletonAdministrativoComponent;
  let fixture: ComponentFixture<SkeletonAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonAdministrativoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
