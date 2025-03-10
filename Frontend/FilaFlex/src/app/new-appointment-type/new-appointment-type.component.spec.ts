import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAppointmentTypeComponent } from './new-appointment-type.component';

describe('NewAppointmentTypeComponent', () => {
  let component: NewAppointmentTypeComponent;
  let fixture: ComponentFixture<NewAppointmentTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAppointmentTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAppointmentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
