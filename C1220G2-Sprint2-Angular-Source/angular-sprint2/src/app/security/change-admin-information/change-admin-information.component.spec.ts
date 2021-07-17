import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAdminInformationComponent } from './change-admin-information.component';

describe('ChangeAdminInformationComponent', () => {
  let component: ChangeAdminInformationComponent;
  let fixture: ComponentFixture<ChangeAdminInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeAdminInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeAdminInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
