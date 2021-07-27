import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStudentExcelComponent } from './create-student-excel.component';

describe('CreateStudentExcelComponent', () => {
  let component: CreateStudentExcelComponent;
  let fixture: ComponentFixture<CreateStudentExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStudentExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStudentExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
