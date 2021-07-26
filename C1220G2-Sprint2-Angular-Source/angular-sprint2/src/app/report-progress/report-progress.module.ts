import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportProgressRoutingModule } from './report-progress-routing.module';
import { ProcessReportComponent } from './process-report/process-report.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [ProcessReportComponent],
  imports: [
    CommonModule,
    ReportProgressRoutingModule,
    FormsModule
  ]
})
export class ReportProgressModule { }
