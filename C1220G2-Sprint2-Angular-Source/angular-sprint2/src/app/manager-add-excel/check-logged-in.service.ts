import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {ExcelService} from './excel.service';
import {TokenStorageService} from '../security/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLoggedInService {
  isLoggedIn: boolean;
  roles = [];
  constructor(public router: Router,
              private tokenStorageService: TokenStorageService ) {

  }
  check(){
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      if (!this.roles.includes('ROLE_ADMIN')) {
        this.router.navigateByUrl('/page/403');
      }else {
        return this.roles
      }
    } else {
      this.router.navigateByUrl('');
    }
  }
}
