import {Component, OnInit} from '@angular/core';
import {StudentGroupService} from "../student-group.service";
import {StudentGroup} from "../student-group";

@Component({
  selector: 'app-list-student-group',
  templateUrl: './list-student-group.component.html',
  styleUrls: ['./list-student-group.component.css']
})
export class ListStudentGroupComponent implements OnInit {
  studentGroupList: StudentGroup[] = [];
  studentGroup
  page: number = 1;
   name: string;
   idStudent: number;

  constructor(private studentGroupService: StudentGroupService) {
  }

  ngOnInit(): void {
    this.findAll()
  }

  findAll() {
    this.studentGroupService.findAll().subscribe(student => {
      this.studentGroupList = student
      console.log(this.studentGroupList)
    })
  }

  getIdStudentgroup(id: number) {
    this.idStudent = id;
    console.log(this.idStudent)
    this.studentGroupService.findById(id).subscribe(data => {
      this.studentGroup = data;
      this.name = this.studentGroup.name
      console.log(this.name)
    })


  }
  deleteStudentGroup() {
    this.studentGroupService.delete(this.idStudent).subscribe(()=>{
      this.findAll();
      }
    )
  }
}
