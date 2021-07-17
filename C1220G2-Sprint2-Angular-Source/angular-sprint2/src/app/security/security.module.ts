import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserInformationComponent } from './user-information/user-information.component';
import { ChangeAdminInformationComponent } from './change-admin-information/change-admin-information.component';


@NgModule({
  declarations: [LoginComponent, LogoutComponent, ChangePasswordComponent, UserInformationComponent, ChangeAdminInformationComponent],
  imports: [
    CommonModule,
    SecurityRoutingModule
  ]
})
export class SecurityModule { }
