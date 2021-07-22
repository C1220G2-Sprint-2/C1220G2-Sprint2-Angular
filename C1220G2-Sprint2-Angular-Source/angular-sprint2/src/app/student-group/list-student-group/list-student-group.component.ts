import {Component, OnInit} from '@angular/core';
import {StudentGroupService} from "../student-group.service";
import {StudentGroup} from "../student-group";
import {Project} from "../../models/project";
import {Team} from "../../models/team";

@Component({
  selector: 'app-list-student-group',
  templateUrl: './list-student-group.component.html',
  styleUrls: ['./list-student-group.component.css']
})
export class ListStudentGroupComponent implements OnInit {
  studentGroupList: StudentGroup[] = [];
  project: Project[] = [];
  teamList: Team[] = [];
  studentGroup: Team;
  email: String[]= [];
  name: string;
  idStudent: number;
  page: number = 1;
  pageSize: number = 2;
  collectionSize: number = 0;
  date: string;

  constructor(private studentGroupService: StudentGroupService) {
  }

  ngOnInit(): void {
    this.findAll()
  }

  findAll() {
    this.studentGroupService.findAll().subscribe(data => {
      console.log(data)
      this.teamList = data['content'].filter(function (team) {

        return team.enable == true;
      })
    });
  }



  getIdStudentGroup(id: number) {
    this.idStudent = id;
    this.studentGroupService.findById(id).subscribe(data => {
      this.studentGroup = data;
      this.name = this.studentGroup.name

    })
  }
  getStudentGroup() {
    this.studentGroupService.addId(this.idStudent).subscribe( )
    console.log(this.date)
  }

  deleteStudentGroup() {
    this.studentGroupService.update(this.idStudent,this.studentGroup).subscribe(() => {
        this.findAll();
      }
    )
  }
}
