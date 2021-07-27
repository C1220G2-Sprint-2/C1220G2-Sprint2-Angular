import { Component, OnInit } from '@angular/core';

import {TeamService} from "../../student-group/team.service";
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/security/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';






@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  private roles: string[];
  isLoggedIn: boolean;
  showAdminBoard = false;
  showTeacherBoard = false;
  showStudentBoard = false;
  username: string;
  userId: number;
  user= {};
  studentTS: any = {};


  constructor(private teamService: TeamService, private tokenStorageService: TokenStorageService, private router: Router,
              private toastService: ToastrService,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.loadData();
  }


   loadData() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      if (user.username.indexOf("SV") != -1) {
        this.teamService.getStudent(user.username).subscribe(data => {
          this.studentTS = data;
          console.log(this.studentTS);
        });
        this.roles = user.roles;
        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
        this.showTeacherBoard = this.roles.includes('ROLE_TEACHER');
        this.showStudentBoard = this.roles.includes('ROLE_STUDENT');
        this.username = user.username;
        console.log(this.username)
        this.userId = user.id;
        console.log(this.userId)
      }
      this.user = this.tokenStorageService.getUser();
      console.log(this.user)
    }


  }
}
