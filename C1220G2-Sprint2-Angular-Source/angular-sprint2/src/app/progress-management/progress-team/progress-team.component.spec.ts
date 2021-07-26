import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressTeamComponent } from './progress-team.component';

describe('ProgressTeamComponent', () => {
  let component: ProgressTeamComponent;
  let fixture: ComponentFixture<ProgressTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
