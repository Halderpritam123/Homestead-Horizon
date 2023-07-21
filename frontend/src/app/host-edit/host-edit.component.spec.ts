import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostEditComponent } from './host-edit.component';

describe('HostEditComponent', () => {
  let component: HostEditComponent;
  let fixture: ComponentFixture<HostEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostEditComponent]
    });
    fixture = TestBed.createComponent(HostEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
