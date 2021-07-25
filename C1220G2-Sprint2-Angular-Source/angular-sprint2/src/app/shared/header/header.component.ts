import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {TokenStorageService} from '../../security/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string;
  userId: number;
  userImage: string;


  constructor(  private tokenStorageService: TokenStorageService, private router: Router,
                private toastService: ToastrService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
      this.userId = user.id;
      this.userImage = user.avatar;
    }
  }


  signOut() {
    this.tokenStorageService.signOut();
    window.location.assign("");
  }
}
