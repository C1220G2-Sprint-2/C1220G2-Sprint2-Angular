import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../token-storage.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Location} from '@angular/common';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit {
  private roles: string[];
  isLoggedIn: boolean = false;
  showAdminBoard = false;
  showTeacherBoard = false;
  showStudentBoard = false;
  username: string;
  userId: number;
  userEmail: string;
  userImage: string;
  userAddress: string;
  userPhone: string;
  constructor(  private tokenStorageService: TokenStorageService, private router: Router,
                private toastService: ToastrService,private _location: Location) { }

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
      this.userEmail = user.email;
      this.userImage = user.avatar;
      this.userAddress = user.address;
      this.userPhone = user.phone;
    }
  }

  cancel(){
    this._location.back();
  }
}
