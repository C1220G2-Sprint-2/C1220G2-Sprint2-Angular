import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { StatisticsRoutingModule } from './statistics-routing.module';
import { CategoryStatisticComponent } from './category-statistic/category-statistic.component';
import { TeacherStatisticComponent } from './teacher-statistic/teacher-statistic.component';
import { GeneralTeacherStatisticComponent } from './general-teacher-statistic/general-teacher-statistic.component';
import { GeneralCategoryStatisticComponent } from './general-category-statistic/general-category-statistic.component';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [CategoryStatisticComponent, TeacherStatisticComponent, GeneralTeacherStatisticComponent, GeneralCategoryStatisticComponent],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    NgApexchartsModule
  ]
})
export class StatisticsModule { }
