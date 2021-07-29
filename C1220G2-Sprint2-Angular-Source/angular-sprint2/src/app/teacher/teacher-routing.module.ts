import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListTeacherComponent} from './list-teacher/list-teacher.component';
import {CreateTeacherComponent} from './create-teacher/create-teacher.component';
import {EditTeacherComponent} from './edit-teacher/edit-teacher.component';
import {DeleteTeacherComponent} from './delete-teacher/delete-teacher.component';

/*Tam code router teacher*/
const routes: Routes = [
  {path: 'danh-sach', component: ListTeacherComponent},
  {path: 'them-moi', component: CreateTeacherComponent},
  {path: 'cap-nhat/:code', component: EditTeacherComponent},
  {path: 'xoa/:code', component: DeleteTeacherComponent},
  { path: '',   redirectTo: '/danh-sach', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
/*Tam code router teacher*/
