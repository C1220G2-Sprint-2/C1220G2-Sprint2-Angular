import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StudentGroupModule} from "./student-group/student-group.module";


const routes: Routes = [
  {
    path: 'nhom',
    loadChildren: () => import('./student-group/student-group.module').then(module => module.StudentGroupModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
