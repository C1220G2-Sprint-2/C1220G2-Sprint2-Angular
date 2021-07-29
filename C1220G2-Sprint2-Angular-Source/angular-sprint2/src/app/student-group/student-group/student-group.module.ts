import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentGroupRoutingModule } from './student-group-routing.module';
import { StudentGroupRegistrationComponent } from './student-group-registration/student-group-registration.component';
import { ListStudentGroupComponent } from './list-student-group/list-student-group.component';
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TeamManagementComponent } from './team-management/team-management.component';
import {NgxLoadingModule} from "ngx-loading";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";




@NgModule({
  declarations: [StudentGroupRegistrationComponent, ListStudentGroupComponent, TeamManagementComponent],
  imports: [
    CommonModule,
    StudentGroupRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    NgxLoadingModule,
    NgbPaginationModule,
  ]
})
export class StudentGroupModule { }
