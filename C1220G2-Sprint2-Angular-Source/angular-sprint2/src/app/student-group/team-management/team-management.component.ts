import { Component, OnInit } from '@angular/core';
import {TeamService} from "../team.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-team-management',
  templateUrl: './team-management.component.html',
  styleUrls: ['./team-management.component.css']
})
export class TeamManagementComponent implements OnInit {
  listStudent: any = [];
  listTeam: any[] = [];

  private team= {
    name: "",
    enable: false,
    teamLeader: "",
    listTeam: []
  };
  nameTeam: string;

  private user = {
    code: "SV-0001",
  }
  isLoggedIn: boolean = false;

  page: number = 1;
  collection: any[] = this.listStudent;
  pageCard: number=1;
  constructor(private teamService: TeamService, private route: Router) { }


  ngOnInit(): void {
    this.teamService.listStudent().subscribe(data => {
      this.listStudent = data.filter(function (student) {
        return student.team.id == 1 && student.enable == true;
      })
    });

  }



  deleteStudent(s: any) {

  }
}
