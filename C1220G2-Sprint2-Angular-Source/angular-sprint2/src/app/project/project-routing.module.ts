import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProjectRegistrationComponent} from "./project-registration/project-registration.component";
import {FormBuilder} from "@angular/forms";


const routes: Routes = [
  {
    path: 'dang-ky',
    component: ProjectRegistrationComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
