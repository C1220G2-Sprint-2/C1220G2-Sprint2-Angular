import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportProgressRoutingModule } from './report-progress-routing.module';
import { ProcessReportComponent } from './process-report/process-report.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ProcessReportComponent],
  imports: [
    CommonModule,
    ReportProgressRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ReportProgressModule { }
