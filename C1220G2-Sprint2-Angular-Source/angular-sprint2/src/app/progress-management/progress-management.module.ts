import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressManagementRoutingModule } from './progress-management-routing.module';
import { ProgressTeamComponent } from './progress-team/progress-team.component';
import { ProgressDetailComponent } from './progress-detail/progress-detail.component';
import { ReviewComponent } from './review/review.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [ProgressTeamComponent, ProgressDetailComponent, ReviewComponent, DetailComponent],
  imports: [
    CommonModule,
    ProgressManagementRoutingModule,
    NgbPaginationModule,
    ReactiveFormsModule,
  ]
})
export class ProgressManagementModule { }
