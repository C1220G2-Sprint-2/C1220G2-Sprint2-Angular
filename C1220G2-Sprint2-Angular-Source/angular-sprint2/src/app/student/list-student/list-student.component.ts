import { Component, OnInit } from '@angular/core';
import {StudentService} from "../student.service";
import {Student} from "../../model/student";
import Swal from "sweetalert2";

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {

  studentList: Student[];
  collectionSize = 0;
  page = 1;
  pageSize = 4;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.listSearch()
  }

  // findAll(){
  //   this.studentService.findAll().subscribe(value => {
  //     this.studentList = value;
  //   })
  // }

  keyword = "";
  setKeywordSearch($event: any) {
    this.keyword = $event.target.value;
  }

  messageSearch ='';
  listSearch() {
    this.messageSearch = '';
    this.studentService.findSearch(this.keyword).subscribe(
      value => {
        this.studentList = value;
        console.log(this.studentList);
        if (this.studentList.length == 0){
          this.messageSearch = "Không tìm thấy sinh viên phù hợp."
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
    this.codeDelete =code;
    this.nameDelete = name;
    this.studentService.findById(this.codeDelete).subscribe(value => {
      this.student = value;
      this.teamDelete = this.student.team;
      if(this.student.team == "không có nhóm"){
      this.checkDelete = true;
      }
      this.check = true;
    });
  }

  delete() {
    console.log(this.codeDelete);
    this.studentService.delete(this.codeDelete).subscribe(value => {
      this.listSearch();
    })
  }

  block() {
    this.delay();
    this.studentService.block(this.codeDelete, this.nameDelete, this.teamDelete).subscribe(value => {
      this.listSearch();
    })
  }

  delay() {
    let timerInterval;
    Swal.fire({
      title: '',
      html: 'Vui lòng chờ...',
      timer: 15000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {
          const content = Swal.getHtmlContainer();
          if (content) {
            const b = content.querySelector('b');
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

}
