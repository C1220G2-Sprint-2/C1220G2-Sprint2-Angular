import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordDto} from '../../models/password-dto';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SecurityServiceService} from '../security-service.service';
import Swal from 'sweetalert2';
import {TokenStorageService} from '../token-storage.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public changePasswordForm: FormGroup;
  passworDto: PasswordDto;
  code: string;


  constructor(private activatedRoute: ActivatedRoute,
              private securityService: SecurityServiceService,
              private tokenStorage: TokenStorageService,
              private toastService: ToastrService,
              private router: Router,private _location: Location
  ) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.code = paramMap.get('code');
    });
  }

  ngOnInit(): void {
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required, Validators.minLength(6),
        Validators.maxLength(30)]),
      pwGroup: new FormGroup({
        password: new FormControl('', [Validators.required, Validators.minLength(6),
          Validators.maxLength(30)]),
        confirmPassword: new FormControl('')
      }, {validators: this.comparePassword}),
    });
  }
  comparePassword(c: AbstractControl) {
    const v = c.value;
    return (v.password === v.confirmPassword) ?
      null : {
        passwordNotMatch: true
      };
  }

  submit() {
    const passwordForm = this.changePasswordForm;
    this.passworDto = {
      oldPassword: passwordForm.value.oldPassword,
      newPassword: passwordForm.value.pwGroup.password
    };
    this.securityService.changePassword(this.code, this.passworDto).subscribe(() => {
      this.showSuccess();
      this.tokenStorage.signOut();
      window.location.assign("");
    }, e => {
      this.showError();
      console.log(e);
    });
  }
  cancel(){
    this._location.back();
  }
  get getPassword() {
    return this.changePasswordForm.get('pwGroup')?.get('password');
  }

  get pwGroup() {
    return this.changePasswordForm.get('pwGroup');
  }

  showSuccess() {
    this.toastService.success('Thành công !', 'Đổi mật khẩu.');
  }

  showError() {
    Swal.fire({
      title: 'Đổi mật khẩu thất bại!',
      text: 'Mật khẩu cũ không đúng.',
      icon: 'error',
      confirmButtonText: 'Đóng'
    });
  }

}
