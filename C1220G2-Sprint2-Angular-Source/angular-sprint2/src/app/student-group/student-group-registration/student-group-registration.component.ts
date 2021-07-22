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

  private team = {
    name: "",
    enable: false,
    teamLeader: "",
    listTeam: []
  };
  nameTeam: string;
  checkSortName = false;
  checkSortCode = false;
  checkSortClass = false;
  private user = {
    studentCode: "SV-0002",
    teacherCode: "GV-0001",
  };
  isLoggedIn: boolean = false;

  page: number = 1;
  collection: any[] = this.listStudent;
  pageCard: number = 1;
  studentTS: any;
  searchStudent: string = '';

  constructor(private teamService: TeamService, private route: Router) {
  }

  ngOnInit(): void {

    // this.isLoggedIn = !!this.tokenStorageService.getToken();
    // if (this.isLoggedIn) {
    //   this.user = this.tokenStorageService.getUser();
    // }

    this.teamService.listStudent().subscribe(data => {
      if (this.user.studentCode != null) {
        this.teamService.getStudent(this.user.studentCode).subscribe(data => {
          console.log(data);
          this.studentTS = data;
        });
      }
      this.listStudent = data.filter(function (student) {
        return student.team.id == 1 && student.enable == true;
      })
      console.log(this.listStudent);

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
    for (let i = 0; i < this.listTeam.length; i++) {
      if (this.listTeam[i].code == code) {
        this.listTeam.splice(i, 1)
      }
    }
  }

  createTeam() {

    this.team.listTeam = this.listTeam;
    console.log("this.team.listTeam");
    console.log(this.team.listTeam);
    this.team.name = this.nameTeam;
    this.team.enable = true;
    // @ts-ignore
    this.team.teamLeader = this.user.code;
    this.teamService.postTeam(this.team).subscribe(data => {
      this.route.navigateByUrl('nhom/quan-ly-nhom');
    });
  }

  searchTeamRegistration() {
    this.teamService.searchTeamRegistration(this.searchStudent).subscribe(data => {
      this.listStudent = data.filter(function (student) {
        return student.team.id == 1 && student.enable == true;
      })
    })
  }

  sortCode() {
    this.checkSortCode = !this.checkSortCode;
    console.log("da vao")
    if (this.checkSortCode) {
      this.listTeam.sort(function (sv1, sv2) {
        let a = sv1.code;
        let b = sv2.code;
        return a === b ? 0 : a > b ? 1 : -1;
      })
    } else {
      this.listTeam.sort(function (sv1, sv2) {
        let a = sv1.code;
        let b = sv2.code;
        return a === b ? 0 : a > b ? -1 : 1;
      })
    }

  }

  sortName() {
    console.log("vao")
    this.checkSortName = !this.checkSortName;
    if (this.checkSortName) {
      this.listTeam.sort(function (sv1, sv2) {
        let a = sv1.name;
        let b = sv2.name;
        return a === b ? 0 : a > b ? 1 : -1;
      })
    } else {
      this.listTeam.sort(function (sv1, sv2) {
        let a = sv1.name;
        let b = sv2.name;
        return a === b ? 0 : a > b ? -1 : 1;
      })
    }
  }

  sortClass() {
    this.checkSortClass = !this.checkSortClass;
    if (this.checkSortClass) {
      this.listTeam.sort(function (sv1, sv2) {
        let a = sv1.classCode;
        let b = sv2.classCode;
        return a === b ? 0 : a > b ? 1 : -1;
      })
    } else {
      this.listTeam.sort(function (sv1, sv2) {
        let a = sv1.classCode;
        let b = sv2.classCode;
        return a === b ? 0 : a > b ? -1 : 1;
      })
    }
  }
}
