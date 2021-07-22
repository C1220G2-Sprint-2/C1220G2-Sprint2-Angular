import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import {HttpClientModule} from "@angular/common/http";
import {ProjectModule} from "./project/project.module";

import {NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

// @ts-ignore
import {environment} from "../environments/environment";



import {AngularFireModule} from "@angular/fire";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {StudentGroupModule} from "./student-group/student-group.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    StudentGroupModule,
    ProjectModule,
    NgbModule,
    NgbPaginationModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud")
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
