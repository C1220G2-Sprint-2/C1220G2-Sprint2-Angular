import { Component, OnInit } from '@angular/core';
import {TeamService} from "../../student-group/team.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  private user = {
    code: "SV-0001",
  }
  student: any= null;

  constructor(private teamService: TeamService ) { }

  ngOnInit(): void {
    this.teamService.getStudent(this.user.code).subscribe(data=> {
      this.student=data
    })
  }

}
