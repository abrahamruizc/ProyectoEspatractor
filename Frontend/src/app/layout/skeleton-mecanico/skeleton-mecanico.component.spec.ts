import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonMecanicoComponent } from './skeleton-mecanico.component';

describe('SkeletonMecanicoComponent', () => {
  let component: SkeletonMecanicoComponent;
  let fixture: ComponentFixture<SkeletonMecanicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonMecanicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonMecanicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
