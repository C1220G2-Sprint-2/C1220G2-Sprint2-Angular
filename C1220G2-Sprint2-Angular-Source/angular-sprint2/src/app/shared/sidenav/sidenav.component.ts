import { Component, OnInit } from '@angular/core';
import {TeamService} from "../../student-group/team.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

   user = {
    studentCode: null,
    teacherCode: "GV-0001",
  }

  studentTS: any= null;

  constructor(private teamService: TeamService ) { }

  ngOnInit(): void {
    if(this.user.studentCode!= null) {
      this.teamService.getStudent(this.user.studentCode).subscribe(data=> {
        this.studentTS=data;
      })
    }
    }


}
