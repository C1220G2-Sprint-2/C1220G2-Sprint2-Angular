import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {

    path: 'nhom',
    loadChildren: () => import('./student-group/student-group.module').then(module => module.StudentGroupModule)
  },
  {
    path: 'de-tai',
    loadChildren: () => import('./project/project.module').then(module => module.ProjectModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
