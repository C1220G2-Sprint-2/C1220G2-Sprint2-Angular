import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryStatisticComponent } from './category-statistic.component';

describe('CategoryStatisticComponent', () => {
  let component: CategoryStatisticComponent;
  let fixture: ComponentFixture<CategoryStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
