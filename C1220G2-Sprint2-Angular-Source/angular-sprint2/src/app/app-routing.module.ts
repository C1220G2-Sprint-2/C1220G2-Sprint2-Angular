import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./security/security.module').then(module => module.SecurityModule)
  },
  {
    path: 'hoc-sinh',
    loadChildren: () => import('./student/student.module').then(module => module.StudentModule)
  },
  {
    path: 'nhom',
    loadChildren: () => import('./student-group/student-group.module').then(module => module.StudentGroupModule)

  },
  {
    path: 'de-tai',
    loadChildren: () => import('./project/project.module').then(module => module.ProjectModule)
  },
  // code by sang
  {
    path: 'quan-ly-tien-do',
    loadChildren: () => import('./progress-management/progress-management.module').then(module => module.ProgressManagementModule)
  },
  // end code by sang
  // code by hau
  {
    path: 'bao-cao-tien-do',
    loadChildren: () => import('./report-progress/report-progress.module').then(module => module.ReportProgressModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
