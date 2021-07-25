import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryStatisticComponent } from './category-statistic/category-statistic.component';
import { TeacherStatisticComponent } from './teacher-statistic/teacher-statistic.component';


const routes: Routes = [
  {
    path: 'de-tai',
    component: CategoryStatisticComponent
  },
  {
    path: 'giao-vien',
    component: TeacherStatisticComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
