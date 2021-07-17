import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { CreateTeacherComponent } from './create-teacher/create-teacher.component';
import { ListTeacherComponent } from './list-teacher/list-teacher.component';
import { EditTeacherComponent } from './edit-teacher/edit-teacher.component';
import { DeleteTeacherComponent } from './delete-teacher/delete-teacher.component';


@NgModule({
  declarations: [CreateTeacherComponent, ListTeacherComponent, EditTeacherComponent, DeleteTeacherComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule
  ]
})
export class TeacherModule { }
