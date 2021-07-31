import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserInformationComponent } from './user-information/user-information.component';
import { ChangeAdminInformationComponent } from './change-admin-information/change-admin-information.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';


@NgModule({
  declarations: [LoginComponent, LogoutComponent, ChangePasswordComponent, UserInformationComponent, ChangeAdminInformationComponent, ForgotPasswordComponent],
    imports: [
        CommonModule,
        SecurityRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule
    ]
})
export class SecurityModule { }
