import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../security/token-storage.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private roles: string[];
  isLoggedIn: boolean = false;
  showAdminBoard = false;
  showTeacherBoard = false;
  showStudentBoard = false;
  username: string;
  userId: number;

  constructor(  private tokenStorageService: TokenStorageService, private router: Router,
                private toastService: ToastrService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showTeacherBoard = this.roles.includes('ROLE_TEACHER');
      this.showStudentBoard = this.roles.includes('ROLE_STUDENT');
      this.username = user.username;
      this.userId = user.id;
    }
  }


  signOut() {
    this.tokenStorageService.signOut();
    window.location.assign("");
  }
}
