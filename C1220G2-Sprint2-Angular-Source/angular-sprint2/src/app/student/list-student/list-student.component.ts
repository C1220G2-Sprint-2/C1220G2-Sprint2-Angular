import {Component, OnInit} from '@angular/core';
import {StudentService} from '../student.service';
import {Student} from '../../model/student';
import Swal from 'sweetalert2';
import {TokenStorageService} from '../../security/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {

  // studentList: Student[];
  studentList: Student[] = []; // kha code
  collectionSize = 0;
  page = 1;
  pageSize = 4;
  showAdminBoard = false;
  roles = [];
  isLoggedIn: boolean;


  constructor(private studentService: StudentService,
              private tokenStorageService: TokenStorageService, private router: Router) {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    } else {
      this.router.navigateByUrl('');
    }
  }

  ngOnInit(): void {

    this.listSearch();
  }

  // findAll(){
  //   this.studentService.findAll().subscribe(value => {
  //     this.studentList = value;
  //   })
  // }

  keyword = '';

  setKeywordSearch($event: any) {
    this.keyword = $event.target.value;
  }

  messageSearch = '';

  listSearch() {
    this.messageSearch = '';
    this.studentService.findSearch(this.keyword).subscribe(
      value => {
        this.studentList = value;
        if (this.studentList.length == 0) {
          this.messageSearch = 'Không tìm thấy sinh viên phù hợp.';
        }
      }
    );
  }

  codeDelete: string;
  nameDelete: string;
  teamDelete: string;
  student: Student;
  checkDelete = false;
  check = false;

  passData(code: string, name: string) {
    this.checkDelete = false;
    this.codeDelete = code;
    this.nameDelete = name;
    this.studentService.findById(this.codeDelete).subscribe(value => {
      this.student = value;
      this.teamDelete = this.student.team;
      if (this.student.team == 'không có nhóm') {
        this.checkDelete = true;
      }
      this.check = true;
    });
  }

  delete() {
    console.log(this.codeDelete);
    this.studentService.delete(this.codeDelete).subscribe(value => {
      this.listSearch();
    });
  }

  block() {
    this.delay();
    this.studentService.block(this.codeDelete, this.nameDelete, this.teamDelete).subscribe(value => {
      this.listSearch();
    });
  }

  delay() {
    let timerInterval;
    Swal.fire({
      title: '',
      html: 'Vui lòng chờ trong <b></b> giây.',
      timer: 15000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {
          const content = Swal.getHtmlContainer();
          if (content) {
            const b = content.querySelector('b');
            if (b) {
              b.textContent = String(Swal.getTimerLeft());
            }
          }
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer');
      }
    });
  }

}
