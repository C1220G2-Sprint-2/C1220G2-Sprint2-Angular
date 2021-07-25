import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {UserInformationComponent} from './user-information/user-information.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'user/information', component: UserInformationComponent },
  { path: 'user/changepassword/:code', component: ChangePasswordComponent },
  { path: 'user/forgotpassword', component: ForgotPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
