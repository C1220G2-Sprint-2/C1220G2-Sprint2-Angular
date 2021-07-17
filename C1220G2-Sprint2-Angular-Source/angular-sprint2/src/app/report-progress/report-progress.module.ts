import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportProgressRoutingModule } from './report-progress-routing.module';
import { ProcessReportComponent } from './process-report/process-report.component';


@NgModule({
  declarations: [ProcessReportComponent],
  imports: [
    CommonModule,
    ReportProgressRoutingModule
  ]
})
export class ReportProgressModule { }
