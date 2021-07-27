import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectCensorshipComponent } from './project-censorship/project-censorship.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectRegistrationComponent } from './project-registration/project-registration.component';
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StudentGroupModule} from "../student-group/student-group.module";
import {Validation} from "./project-registration/Validation";
import {ProjectDetailComponent} from "./project-detail/project-detail.component";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
    exports: [
        ProjectListComponent
    ],
  declarations: [ProjectCensorshipComponent, ProjectListComponent, ProjectRegistrationComponent, ProjectDetailComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    StudentGroupModule,
    NgbPaginationModule,

  ],

})
export class ProjectModule { }
