import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralCategoryStatisticComponent } from './general-category-statistic.component';

describe('GeneralCategoryStatisticComponent', () => {
  let component: GeneralCategoryStatisticComponent;
  let fixture: ComponentFixture<GeneralCategoryStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralCategoryStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralCategoryStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
