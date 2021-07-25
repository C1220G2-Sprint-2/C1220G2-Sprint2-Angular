import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProcessReportComponent} from './process-report/process-report.component';


const routes: Routes = [{
  path: '',
  component: ProcessReportComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportProgressRoutingModule { }
