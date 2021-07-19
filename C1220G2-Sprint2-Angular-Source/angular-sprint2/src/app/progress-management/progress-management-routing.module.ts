import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProgressTeamComponent} from './progress-team/progress-team.component';
import {ProgressDetailComponent} from './progress-detail/progress-detail.component';


const routes: Routes = [
  {
    path: 'danh-sach-tien-do',
    component: ProgressTeamComponent
  },
  {
    path: 'chi-tiet-tien-do',
    component: ProgressDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgressManagementRoutingModule { }
