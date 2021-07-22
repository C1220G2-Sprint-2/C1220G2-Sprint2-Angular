import {Component, OnInit} from '@angular/core';
import {TeamService} from "../team.service";
import {Router} from "@angular/router";
import {forEachToken} from "tslint";

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
  nameTeam: string;

  private user = {
    studentCode: "SV-0001",
    teacherCode: "GV-0001",
  };
  isLoggedIn: boolean = false;
  check:boolean = true;
  page: number = 1;
  collection: any[] = this.listStudent;
  pageCard: number = 1;
  studentTS?: any = null;
  project: any;

  constructor(private teamService: TeamService, private route: Router) {
  }


  ngOnInit(): void {

    if (this.user.studentCode != null) {
      this.teamService.getStudent(this.user.studentCode).subscribe(data => {
        console.log(data);
        this.studentTS = data;
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
          let newListStudent= []
          for(let i=0; i<this.listStudent.length;i++ ) {
            if(this.listStudent[i].team.id== this.studentTS.team.id) {
              newListStudent.push(this.listStudent[i]);
            }
          }
          console.log(newListStudent)
          this.listStudent= newListStudent;

          for(let i=0; i< newListStudent.length;i++) {
            if (newListStudent[i].groupStatus !=1) {
              this.check=false;
            }
          }
        })
      })
    }


  }

  deleteStudent(s: any) {
  }
}
