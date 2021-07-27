import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {UserInformationComponent} from './user-information/user-information.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'tai-khoan/thong-tin-ca-nhan', component: UserInformationComponent },
  { path: 'tai-khoan/doi-mat-khau/:code', component: ChangePasswordComponent },
  { path: 'tai-khoan/quen-mat-khau', component: ForgotPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
