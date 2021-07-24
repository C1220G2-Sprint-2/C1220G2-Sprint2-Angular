import { BrowserModule } from '@angular/platform-browser';
// @ts-ignore
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import {NgxPaginationModule} from "ngx-pagination";
import {HttpClientModule} from "@angular/common/http";
import {StudentGroupModule} from "./student-group/student-group.module";
import {ProjectModule} from "./project/project.module";
import {NgxPaginationModule} from 'ngx-pagination';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NgbModule // code by sang
    NgxPaginationModule,
    HttpClientModule,
    StudentGroupModule,
    ProjectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
