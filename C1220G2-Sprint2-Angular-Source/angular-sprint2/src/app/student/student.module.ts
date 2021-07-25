import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { ListStudentComponent } from './list-student/list-student.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { DeleteStudentComponent } from './delete-student/delete-student.component';
import { CreateStudentExcelComponent } from './create-student-excel/create-student-excel.component';
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({

    declarations: [ListStudentComponent, CreateStudentComponent, EditStudentComponent, DeleteStudentComponent, CreateStudentExcelComponent],
  exports: [
    ListStudentComponent,
    CreateStudentComponent,
    EditStudentComponent
  ],
    imports: [
        CommonModule,
        StudentRoutingModule,
        NgbPaginationModule,
        ReactiveFormsModule
    ]


})
export class StudentModule { }
