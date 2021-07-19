import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListTeacherComponent} from './list-teacher/list-teacher.component';
import {CreateTeacherComponent} from './create-teacher/create-teacher.component';
import {EditTeacherComponent} from './edit-teacher/edit-teacher.component';


const routes: Routes = [
  {path: 'danh-sach', component: ListTeacherComponent},
  {path: 'them-moi', component: CreateTeacherComponent},
  {path: 'cap-nhat', component: EditTeacherComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
