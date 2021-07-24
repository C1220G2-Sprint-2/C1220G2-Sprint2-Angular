import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressManagementRoutingModule } from './progress-management-routing.module';
import { ProgressTeamComponent } from './progress-team/progress-team.component';
import { ProgressDetailComponent } from './progress-detail/progress-detail.component';
import { ReviewComponent } from './review/review.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ProgressTeamComponent, ProgressDetailComponent, ReviewComponent],
  imports: [
    CommonModule,
    ProgressManagementRoutingModule,
    NgbPaginationModule,
  ]
})
export class ProgressManagementModule { }
