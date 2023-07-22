import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyAdminComponent } from './property-admin.component';

describe('PropertyAdminComponent', () => {
  let component: PropertyAdminComponent;
  let fixture: ComponentFixture<PropertyAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropertyAdminComponent]
    });
    fixture = TestBed.createComponent(PropertyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
