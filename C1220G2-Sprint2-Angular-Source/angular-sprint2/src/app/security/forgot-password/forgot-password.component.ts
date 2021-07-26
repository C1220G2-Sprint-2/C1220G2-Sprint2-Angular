import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';
import {SecurityServiceService} from '../security-service.service';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  userEmail: string = 'Nhập email của bạn...';

  constructor(private authService: AuthService,
              private toastService: ToastrService) {
  }

  ngOnInit(): void {

  }

  resetPassword(value: string) {
    this.userEmail = value;
    this.authService.resetPw(this.userEmail).subscribe(() => {
      this.showSuccess();
      window.location.assign("");
    }, error => {
      this.showError();
    })
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


}
