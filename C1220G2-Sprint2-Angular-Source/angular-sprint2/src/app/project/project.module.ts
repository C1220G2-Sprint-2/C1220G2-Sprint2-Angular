import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectCensorshipComponent } from './project-censorship/project-censorship.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectRegistrationComponent } from './project-registration/project-registration.component';



@NgModule({
    declarations: [ProjectCensorshipComponent, ProjectListComponent, ProjectRegistrationComponent],
    exports: [
        ProjectListComponent
    ],
    imports: [
        CommonModule,
        ProjectRoutingModule
    ]
})
export class ProjectModule { }
