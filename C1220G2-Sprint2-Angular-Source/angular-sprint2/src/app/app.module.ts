import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import {NgxPaginationModule} from "ngx-pagination";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {StudentGroupModule} from "./student-group/student-group.module";
import {ProjectModule} from "./project/project.module";

// @ts-ignore
import {environment} from "../environments/environment";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthInterceptor} from './helpers/auth.interceptor';
import {AngularFireModule} from "@angular/fire";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {ToastrModule} from "ngx-toastr";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxLoadingModule} from "ngx-loading";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    SharedModule,
    NgbModule, // code by sang
    NgxPaginationModule,
    HttpClientModule,
    StudentGroupModule,
    ProjectModule,
    NgxLoadingModule.forRoot({}),
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud")
  ],


  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],

  bootstrap: [AppComponent]
})
export class AppModule {
}
