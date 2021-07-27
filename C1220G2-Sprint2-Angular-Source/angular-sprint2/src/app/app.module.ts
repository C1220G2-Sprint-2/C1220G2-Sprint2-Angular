import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

import {StudentModule} from "./student/student.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {StudentGroupModule} from "./student-group/student-group.module";
import {ProjectModule} from "./project/project.module";

import {ToastrModule} from 'ngx-toastr';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthInterceptor} from './helpers/auth.interceptor';
import {NgxPaginationModule} from "ngx-pagination";


import {TeacherModule} from './teacher/teacher.module';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

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
    TeacherModule,
    NgbModule, // code by sang
    NgxPaginationModule,
    HttpClientModule,
    StudentGroupModule,
    ProjectModule,
    StudentModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud"),
    AngularFirestoreModule,
    AngularFireAuthModule, // auth
    AngularFireStorageModule, NgbModule, // storage
    AngularFireDatabaseModule
  ],


  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],

  bootstrap: [AppComponent]
})
export class AppModule {
}
