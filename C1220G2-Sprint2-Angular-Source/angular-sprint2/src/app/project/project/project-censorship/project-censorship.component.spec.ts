import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCensorshipComponent } from './project-censorship.component';

describe('ProjectCensorshipComponent', () => {
  let component: ProjectCensorshipComponent;
  let fixture: ComponentFixture<ProjectCensorshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectCensorshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCensorshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
