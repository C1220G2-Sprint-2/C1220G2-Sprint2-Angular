import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../auth.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {timer} from 'rxjs';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  userEmail: string = '';

  constructor(private authService: AuthService,
              private toastService: ToastrService,private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {

  }

  resetPassword(value: string) {
    this.userEmail = value;

    if (this.userEmail.length == 0) {
      this.notEmpty();
    } else {
      this.spinner.show(undefined,{
        type: 'timer'
      });
      this.authService.resetPw(this.userEmail).subscribe(() => {
        this.showSuccess();
        window.location.assign('');
      }, error => {
        this.spinner.hide();
        this.showError();
      });
    }
  }

  showSuccess() {
    this.toastService.success('Thành công!.', 'Đặt lại mật khẩu.');
  }

  showError() {
    Swal.fire({
      title: 'Thất bại!',
      text: 'Email không đúng hoặc không tồn tại.',
      icon: 'error',
      confirmButtonText: 'Đóng'
    });
  }

  notEmpty() {
    Swal.fire({
      title: 'Thất bại!',
      text: 'Vui lòng nhập email của bạn.',
      icon: 'error',
      confirmButtonText: 'Đóng'
    });
  }


}
