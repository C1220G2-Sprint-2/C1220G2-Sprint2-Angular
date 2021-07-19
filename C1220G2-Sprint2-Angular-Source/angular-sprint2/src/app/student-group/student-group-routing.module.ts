import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListStudentGroupComponent} from "./list-student-group/list-student-group.component";


const routes: Routes = [
  {
    path: "danh-sach",
    component: ListStudentGroupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentGroupRoutingModule { }
