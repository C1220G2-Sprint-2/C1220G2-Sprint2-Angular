import {Component, OnInit, DoCheck} from '@angular/core';
import {Router} from "@angular/router";
import {TeamService} from "../team.service";
import {TokenStorageService} from "../../security/token-storage.service";
import Swal from "sweetalert2";
import {StudentGroupService} from "../student-group.service";
@Component({
  selector: 'app-student-group-registration',
  templateUrl: './student-group-registration.component.html',
  styleUrls: ['./student-group-registration.component.css']
})
export class StudentGroupRegistrationComponent implements OnInit, DoCheck {
  listStudent: any = [];
  listTeam: any[] = [];
  studentDelete: any= {};
   team = {
    name: "",
    enable: false,
    teamLeader: "",
    listTeam: []
  };
   teamDB : any;
  nameTeam: string = '';
  checkSortName = false;
  checkSortCode = false;
  checkSortClass = false;
   user ;
  isLoggedIn: boolean = false;
   loading = false;
  // page: number = 1;
  collection: any[] = this.listStudent;
  pageCard: number = 1;
  studentTS: any = {};
  searchStudent: string = '';
   allTeam: any[]= [];
  constructor(private tokenStorageService: TokenStorageService, private teamService: TeamService, private route: Router) {
  }
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
      console.log(this.listStudent);
      this.teamService.getStudent(this.user.username).subscribe(data => {
        console.log(data);
        this.studentTS = data;
      });
    }
    this.teamService.listTeam().subscribe(data=> {
      this.allTeam = data;
    });
    console.log("this.checkName")
    console.log(this.checkName)
    this.teamService.listStudent().subscribe(data => {
      this.listStudent = data.filter(function (student) {
        return student.team.id == 1 && student.enable == true;
      })
      this.listTeam.push(this.studentTS);
    });
  }
  addStudent(s: any) {
    if (this.listTeam.includes(s)) {
      this.showErrorAdd();
    } else {
      this.listTeam.push(s);
    }
  }
  ngDoCheck(): void {
    this.checkName= false;
    for (let i=0; i< this.allTeam.length;i++) {
      if ( this.allTeam[i].name == this.nameTeam) {
        this.checkName = true;
      }
    }
    console.log(  this.checkName);
  }
  delete(code: any) {
    if(code == this.studentTS.code) {
        this.showErrorDelete();
    } else {
      for (let i = 0; i < this.listTeam.length; i++) {
        if (this.listTeam[i].code == code) {
          this.listTeam.splice(i, 1);
        }
      }
    }
    this.page2=1;
  }
checkName:boolean = false;
  createTeam() {
    this.loading=true;
    this.team.listTeam = this.listTeam;
    for (let i=0;i<this.team.listTeam.length;i++) {
      if (this.listTeam[i].code== this.studentTS.code) {
        this.listTeam[i].groupStatus= 1.0;
      } else {
        this.listTeam[i].groupStatus= 0.5;
      }
    }
    console.log("this.team.listTeam");
    console.log(this.team.listTeam);
    this.team.name = this.nameTeam;
    this.team.enable = true;
    // @ts-ignore
    this.team.teamLeader = this.studentTS.code;
    // this.delay();
    this.teamService.postTeam(this.team).subscribe(data => {
      this.loading=false;
      this.showSuccess();
      this.route.navigateByUrl('nhom/quan-ly-nhom');
    },error => {
      this.loading=false;
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
    console.log("da vao");
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
  errorMessage = '';
  pageSize: number = 8;
  page: number = 1;
  pageSize2: number = 5;
  page2: number = 1
  showSuccess() {
    Swal.fire({
      title: 'Bạn đã đăng ký nhóm thành công!',
      text: this.errorMessage,
      icon: 'success',
      confirmButtonText: 'Đóng'
    })
  }
  showError() {
    Swal.fire({
      title: 'Không thể đăng ký đề tài vì Giáo viên hướng dẫn hoặc Danh mục không đúng!',
      text: this.errorMessage,
      icon: 'error',
      confirmButtonText: 'Đóng'
    })
  }
  showErrorAdd() {
    Swal.fire({
      title: 'Đã thêm vào danh sách trước đó!',
      text: this.errorMessage,
      icon: 'error',
      confirmButtonText: 'Đóng'
    })
  }
    showErrorDelete() {
      Swal.fire({
        title: 'Không thể xóa thành viên này!',
        text: this.errorMessage,
        icon: 'error',
        confirmButtonText: 'Đóng'
      })
  }
delay() {
  let timerInterval
  Swal.fire({
    title: 'Auto close alert!',
    html: 'I will close in <b></b> milliseconds.',
    timer: 8000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
      timerInterval = setInterval(() => {
        const content = Swal.getHtmlContainer()
        if (content) {
          const b = content.querySelector('b')
          if (b) {
            b.textContent = String(Swal.getTimerLeft())
          }
        }
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('I was closed by the timer')
    }
  })
}
  guiThongtin(studentDelete: any) {
    console.log(studentDelete)
    this.studentDelete= studentDelete;
  }
}