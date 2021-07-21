import {Component, OnInit, DoCheck} from '@angular/core';
import {Router} from "@angular/router";
import {TeamService} from "../team.service";

@Component({
  selector: 'app-student-group-registration',
  templateUrl: './student-group-registration.component.html',
  styleUrls: ['./student-group-registration.component.css']
})

export class StudentGroupRegistrationComponent implements OnInit, DoCheck {

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

  constructor(private teamService: TeamService, private route: Router) {
  }

  ngOnInit(): void {

    // this.isLoggedIn = !!this.tokenStorageService.getToken();
    // if (this.isLoggedIn) {
    //   this.user = this.tokenStorageService.getUser();
    // }


    this.teamService.listStudent().subscribe(data => {
        this.listStudent = data.filter(function (student) {
          return student.team.id == 1 && student.enable == true;
        })

    });

  }

  addStudent(s: any) {
    if (this.listTeam.includes(s)) {
      alert("da ton tai");
    } else {
      this.listTeam.push(s);
    }


  }

  ngDoCheck(): void {

  }

  delete(code: any) {
    for (let i=0; i<this.listTeam.length;i++) {
      if (this.listTeam[i].code==code) {
        this.listTeam.splice(i,1)
      }
    }
  }

  createTeam() {

    this.team.listTeam = this.listTeam;
    console.log("this.team.listTeam");
    console.log(this.team.listTeam);
    this.team.name= this.nameTeam;
    this.team.enable= true;
    // @ts-ignore
    this.team.teamLeader= this.user.code;
    this.teamService.postTeam(this.team).subscribe(data => {
      this.route.navigateByUrl('de-tai/dang-ky');
    });
  }
}
