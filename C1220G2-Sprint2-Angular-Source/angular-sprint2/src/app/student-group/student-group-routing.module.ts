import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProjectRegistrationComponent} from "../project/project-registration/project-registration.component";
import {StudentGroupRegistrationComponent} from "./student-group-registration/student-group-registration.component";


const routes: Routes = [
  {
    path: 'dang-ky',
    component: StudentGroupRegistrationComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentGroupRoutingModule { }
