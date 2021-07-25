import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectCensorshipComponent } from './project-censorship/project-censorship.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectRegistrationComponent } from './project-registration/project-registration.component';
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StudentGroupModule} from "../student-group/student-group.module";



@NgModule({
    exports: [
        ProjectListComponent
    ],   
  declarations: [ProjectCensorshipComponent, ProjectListComponent, ProjectRegistrationComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    StudentGroupModule
  ]
})
export class ProjectModule { }
