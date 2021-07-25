import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListStudentComponent} from "./list-student/list-student.component";
import {CreateStudentComponent} from "./create-student/create-student.component";
import {EditStudentComponent} from "./edit-student/edit-student.component";
import {CreateStudentExcelComponent} from "./create-student-excel/create-student-excel.component";


const routes: Routes = [
  {
    path: 'danh-sach',
    component: ListStudentComponent
  },
  {
    path: 'them-moi',
    component: CreateStudentComponent
  },
  {
    path: 'chinh-sua/:code',
    component: EditStudentComponent
  },
  {
    path: 'them-moi-excel',
    component: CreateStudentExcelComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
