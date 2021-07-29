import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStudentGroupComponent } from './list-student-group.component';

describe('ListStudentGroupComponent', () => {
  let component: ListStudentGroupComponent;
  let fixture: ComponentFixture<ListStudentGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListStudentGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStudentGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
