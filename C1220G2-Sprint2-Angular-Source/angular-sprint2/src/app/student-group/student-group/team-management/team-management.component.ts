import {Component, OnInit} from '@angular/core';
import {TeamService} from "../team.service";
import {Router} from "@angular/router";

import {TokenStorageService} from "../../security/token-storage.service";
import {StudentGroupService} from "../student-group.service";

@Component({
  selector: 'app-team-management',
  templateUrl: './team-management.component.html',
  styleUrls: ['./team-management.component.css']
})
export class TeamManagementComponent implements OnInit {
  listStudent: any = [];
  listTeam: any[] = [];

  private team = {
    name: "",
    enable: false,
    teamLeader: "",
    listTeam: []
  };
  nameTeam: string = '';

  private user ;
  isLoggedIn: boolean = false;
  check:boolean = true;

  collection: any[] = this.listStudent;
  pageCard: number = 1;
  studentTS?: any = {};
  project: any = {};
   teamDB: any ={};
  pageCard2: number = 1;
   studentDelete: any= {};
  page: any = 1;
  pageSize: any = 8;

  constructor(  private tokenStorageService: TokenStorageService,private teamService: TeamService, private route: Router) {
  }


  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
    }

    if (this.user.username != null) {
      this.teamService.getStudent(this.user.username).subscribe(data => {
        console.log(data);
        this.studentTS = data;
        this.teamService.getTeam(this.studentTS.team.id).subscribe(data=>{
          this.teamDB=data;
          console.log(this.teamDB);
        })
        this.teamService.findByTeam(this.studentTS.team.id).subscribe(data => {
          console.log("kiem tra project");
          console.log(data);
          this.project=data;
        });

        this.teamService.listStudent().subscribe(data => {
          console.log(data);
          this.listStudent = data.filter(function (student) {
            return student.enable == true;
          })
          let newListStudent= [];
          for(let i=0; i<this.listStudent.length;i++ ) {
            if(this.listStudent[i].team?.id== this.studentTS.team?.id) {
              newListStudent.push(this.listStudent[i]);
            }
          }
          console.log(newListStudent);
          this.listStudent= newListStudent;

          for(let i=0; i< newListStudent.length;i++) {
            if (newListStudent[i].groupStatus !=1) {
              this.check=false;
            }
          }
        })
      })
    }
    this.teamService.getTeam(this.studentTS.team?.id).subscribe( data => {
      this.team=data;
      console.log(this.team)
    })
  }

  deleteStudent(s: any) {
    this.teamService.removeTeam(s).subscribe( data => {
      this.teamService.listStudent().subscribe(data => {
        console.log(data);
        this.listStudent = data.filter(function (student) {
          return student.enable == true;
        })
        let newListStudent= [];
        for(let i=0; i<this.listStudent.length;i++ ) {
          if(this.listStudent[i].team.id== this.studentTS.team.id) {
            newListStudent.push(this.listStudent[i]);
          }
        }
        console.log(newListStudent);
        this.listStudent= newListStudent;

      })

    })
  }
  guiThongtin(studentDelete: any) {
    console.log(studentDelete)
    this.studentDelete= studentDelete;
  }

}
