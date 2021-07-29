import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerAddExcelRoutingModule } from './manager-add-excel-routing.module';
import {AddNewStudentComponent} from './add-new-student/add-new-student.component';
import {AddNewTeacherComponent} from './add-new-teacher/add-new-teacher.component';


@NgModule({
  declarations: [AddNewStudentComponent,AddNewTeacherComponent],
  imports: [
    CommonModule,
    ManagerAddExcelRoutingModule
  ]
})
export class ManagerAddExcelModule { }
