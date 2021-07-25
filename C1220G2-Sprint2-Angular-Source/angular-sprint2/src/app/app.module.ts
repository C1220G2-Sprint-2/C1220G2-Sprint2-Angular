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
import {ToastrModule} from "ngx-toastr";
import {NgxPaginationModule} from "ngx-pagination";



import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {StudentGroupModule} from './student-group/student-group.module';
import {ProjectModule} from './project/project.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AppComponent
  ],

    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        StudentModule,
      HttpClientModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFirestoreModule,
      AngularFireAuthModule, // auth
      AngularFireStorageModule, NgbModule, // storage

      BrowserAnimationsModule,
      ToastrModule.forRoot(),
      AppRoutingModule,
      SharedModule,
      NgxPaginationModule,
      HttpClientModule,
      StudentGroupModule,
      ProjectModule,

    ],


  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
