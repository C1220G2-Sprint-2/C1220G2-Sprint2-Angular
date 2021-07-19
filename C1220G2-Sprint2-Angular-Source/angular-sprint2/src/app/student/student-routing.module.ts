import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListStudentComponent} from "./list-student/list-student.component";
import {CreateStudentComponent} from "./create-student/create-student.component";
import {EditStudentComponent} from "./edit-student/edit-student.component";


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
    path: 'chinh-sua',
    component: EditStudentComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
