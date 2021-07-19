import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTeacherExcelComponent } from './create-teacher-excel.component';

describe('CreateTeacherExcelComponent', () => {
  let component: CreateTeacherExcelComponent;
  let fixture: ComponentFixture<CreateTeacherExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTeacherExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTeacherExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
