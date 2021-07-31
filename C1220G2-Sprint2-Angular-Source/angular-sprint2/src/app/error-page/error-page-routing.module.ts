import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ForbiddenPageComponent} from './forbidden-page/forbidden-page.component';


const routes: Routes = [
  {
    path : "403", component: ForbiddenPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorPageRoutingModule { }
