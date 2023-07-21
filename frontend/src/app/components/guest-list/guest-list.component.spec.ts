import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestListComponent } from './guest-list.component';

describe('GuestListComponent', () => {
  let component: GuestListComponent;
  let fixture: ComponentFixture<GuestListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestListComponent]
    });
    fixture = TestBed.createComponent(GuestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
