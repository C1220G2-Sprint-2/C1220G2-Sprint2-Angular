import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {

    path: 'de-tai',
    loadChildren: () => import('./project/project.module').then(module => module.ProjectModule)
  }

    path: 'nhom',
    loadChildren: () => import('./student-group/student-group.module').then(module => module.StudentGroupModule)
  },
<<<<<<< HEAD
  {
    path: 'de-tai',
    loadChildren: () => import('./project/project.module').then(module => module.ProjectModule)
  },
=======


>>>>>>> 3c078feac9ebfb8ffb3d38114fdfdcd61c6b9103
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
