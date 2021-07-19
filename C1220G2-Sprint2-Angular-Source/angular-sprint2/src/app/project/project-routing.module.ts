import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProjectListComponent} from "./project-list/project-list.component";
import {ProjectCensorshipComponent} from "./project-censorship/project-censorship.component";
import {ProjectRegistrationComponent} from "./project-registration/project-registration.component";

const routes: Routes = [
  {path: 'danh-sach-de-tai', component: ProjectListComponent},
  {path: 'kiem-duyet-de-tai', component: ProjectCensorshipComponent},
  {
    path: 'dang-ky', component: ProjectRegistrationComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
