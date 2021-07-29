import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProcessReportComponent} from './process-report/process-report.component';


const routes: Routes = [
  {
  path: 'bao-cao/:id1/:id2',
  component: ProcessReportComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportProgressRoutingModule {
}
