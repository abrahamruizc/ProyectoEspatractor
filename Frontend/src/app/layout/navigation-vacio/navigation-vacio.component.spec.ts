import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationVacioComponent } from './navigation-vacio.component';

describe('NavigationVacioComponent', () => {
  let component: NavigationVacioComponent;
  let fixture: ComponentFixture<NavigationVacioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationVacioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationVacioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
