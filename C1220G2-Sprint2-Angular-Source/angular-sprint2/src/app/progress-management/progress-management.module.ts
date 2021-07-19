import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressManagementRoutingModule } from './progress-management-routing.module';
import { ProgressTeamComponent } from './progress-team/progress-team.component';
import { ProgressDetailComponent } from './progress-detail/progress-detail.component';


@NgModule({
  declarations: [ProgressTeamComponent, ProgressDetailComponent],
  imports: [
    CommonModule,
    ProgressManagementRoutingModule
  ]
})
export class ProgressManagementModule { }