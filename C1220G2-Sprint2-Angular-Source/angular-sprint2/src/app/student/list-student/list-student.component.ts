import { Component, OnInit } from '@angular/core';
import {StudentService} from "../student.service";
import {Student} from "../../model/student";

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
  messageSearch = '';

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

  meesageSearch ='';
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
  passData(code: string, name: string) {
    this.codeDelete =code;
    this.nameDelete = name;
  }

  delete() {
    this.studentService.delete(this.codeDelete).subscribe(value => {
      this.listSearch();
    })
  }
}
