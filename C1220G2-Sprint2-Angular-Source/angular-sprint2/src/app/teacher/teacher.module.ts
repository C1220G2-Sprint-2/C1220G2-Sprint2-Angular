import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { CreateTeacherComponent } from './create-teacher/create-teacher.component';
import { ListTeacherComponent } from './list-teacher/list-teacher.component';
import { EditTeacherComponent } from './edit-teacher/edit-teacher.component';
import { DeleteTeacherComponent } from './delete-teacher/delete-teacher.component';
import { CreateTeacherExcelComponent } from './create-teacher-excel/create-teacher-excel.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [CreateTeacherComponent, ListTeacherComponent, EditTeacherComponent, DeleteTeacherComponent, CreateTeacherExcelComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbPaginationModule
  ]
})
export class TeacherModule {
}
