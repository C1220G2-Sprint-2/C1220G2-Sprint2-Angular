import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { ListStudentComponent } from './list-student/list-student.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { DeleteStudentComponent } from './delete-student/delete-student.component';


@NgModule({
    declarations: [ListStudentComponent, CreateStudentComponent, EditStudentComponent, DeleteStudentComponent],
  exports: [
    ListStudentComponent,
    CreateStudentComponent,
    EditStudentComponent
  ],
    imports: [
        CommonModule,
        StudentRoutingModule
    ]
})
export class StudentModule { }
