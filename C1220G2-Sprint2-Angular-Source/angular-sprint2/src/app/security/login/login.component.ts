import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {TokenStorageService} from '../token-storage.service';
import {AuthService} from '../auth.service';
import { FirebaseAuthService } from 'src/app/chat/services/firebaseAuth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  roles: string[] = [];
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
              private router: Router,
              private toastService: ToastrService,
              private firebaseAuthService: FirebaseAuthService      
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken() != null) {
      this.router.navigateByUrl("/de-tai/danh-sach-de-tai")
    }
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.roles = this.tokenStorage.getUser().roles;

        // -------------------kha code---------------
        const authenUser = this.tokenStorage.getUser();
        const promise = this.firebaseAuthService.login(authenUser.email, this.form.password);
        promise
          .then(() => {
            this.showSuccess();
            window.location.assign('/de-tai/danh-sach-de-tai');
          })
          .catch(() => {
            // this.showLoginFailed();
            this.firebaseAuthService.signUp(authenUser.email, this.form.password, authenUser.avatar)
              .then((success) => {
                this.showSuccess();
                window.location.assign('/de-tai/danh-sach-de-tai');
              })
              .catch((error) => this.showLoginFailed());
          });
        // ------------------------------------------

        // this.showSuccess();
        // window.location.assign('/de-tai/danh-sach-de-tai');
      },
      err => {
        this.showLoginFailed();
      }, () => {
      }
    );
  }


  signOut() {
    this.tokenStorage.signOut();
  }

  showSuccess() {
    this.toastService.success('Thành công !', 'Đăng nhập',{
      timeOut: 1000
    });
  }

  showLoginFailed() {
    this.toastService.error('Sai tên đăng nhập hoặc mật khẩu.', 'Đăng nhập thất bại.');
  }

  // login() {
  //   this.authService.login(this.email, this.password)
  //   .catch(error => this.errorMsg = error.message);
  // }

}
