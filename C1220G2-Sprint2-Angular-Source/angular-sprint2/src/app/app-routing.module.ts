import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [
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
  // end code by hau
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
