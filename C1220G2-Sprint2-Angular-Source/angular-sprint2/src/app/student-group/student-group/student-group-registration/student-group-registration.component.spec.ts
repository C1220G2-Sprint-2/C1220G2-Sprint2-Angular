import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGroupRegistrationComponent } from './student-group-registration.component';

describe('StudentGroupRegistrationComponent', () => {
  let component: StudentGroupRegistrationComponent;
  let fixture: ComponentFixture<StudentGroupRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentGroupRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentGroupRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
