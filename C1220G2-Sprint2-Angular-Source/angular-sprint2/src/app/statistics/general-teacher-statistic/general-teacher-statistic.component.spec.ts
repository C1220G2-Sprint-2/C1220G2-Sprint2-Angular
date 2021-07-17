import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralTeacherStatisticComponent } from './general-teacher-statistic.component';

describe('GeneralTeacherStatisticComponent', () => {
  let component: GeneralTeacherStatisticComponent;
  let fixture: ComponentFixture<GeneralTeacherStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralTeacherStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralTeacherStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
