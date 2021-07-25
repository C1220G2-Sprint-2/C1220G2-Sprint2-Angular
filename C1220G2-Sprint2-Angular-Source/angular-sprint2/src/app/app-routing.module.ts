import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./security/security.module').then(module => module.SecurityModule)
  },
  {
    path: 'nhom',
    loadChildren: () => import('./student-group/student-group.module').then(module => module.StudentGroupModule)
  },
  {
    path: 'de-tai',
    loadChildren: () => import('./project/project.module').then(module => module.ProjectModule)
  }, {
    path: 'hoc-sinh',
    loadChildren: () => import('./student/student.module').then(module => module.StudentModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
