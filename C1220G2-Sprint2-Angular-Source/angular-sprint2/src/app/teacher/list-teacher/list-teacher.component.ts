import {Component, OnInit} from '@angular/core';
import {Teacher} from '../../models/teacher';
import {Education} from '../../models/education';
import {Faculty} from '../../models/faculty';
import {Subscription} from 'rxjs';
import {TeacherService} from '../teacher.service';
import {ProjectDto} from '../../models/project-dto';

@Component({
  selector: 'app-list-teacher',
  templateUrl: './list-teacher.component.html',
  styleUrls: ['./list-teacher.component.css']
})
export class ListTeacherComponent implements OnInit {

  page: number = 1;
  pageSize: number = 8;
  teacherList: Teacher[] = [];
  educationList: Education[] = [];
  facultyList: Faculty[] = [];
  subscription: Subscription;
  collectionSize: number;
  deleteTeacher: Teacher;
  deleteTeacherName: string;
  projectDto: ProjectDto[] = [];
  constructor(private teacherService: TeacherService) {
  }

  ngOnInit(): void {
    this.loadListEducation();
    this.loadListFaculty();
    this.loadListTeacher();
  }

  loadListTeacher() {
    this.subscription = this.teacherService.getAllTeacher().subscribe(
      value => {
        if (value == null) {
          this.teacherList = [];
          this.collectionSize = 0
        } else {
          this.teacherList = value;
          this.collectionSize = this.teacherList.length;
        }
      }
    );
  }
  loadListFaculty() {
    this.subscription = this.teacherService.getAllFaculty().subscribe(
      value => {
        if (value == null) {
          this.facultyList = [];
        } else {
          this.facultyList = value;
        }
      }
    );
  }
  loadListEducation() {
    this.subscription = this.teacherService.getAllEducation().subscribe(
      value => {
        if (value == null) {
          this.educationList = [];
        } else {
          this.educationList = value;
        }
      }
    );
  }

  search(keyWord: string) {
    this.subscription = this.teacherService.searchTeacher(keyWord).subscribe(
      value => {
        if (value == null) {
          this.teacherList = [];
          this.collectionSize = 0;
        } else {
          this.teacherList = value;
          this.collectionSize = this.teacherList.length;
        }
      }
    )
  }

  sendIdToComponent(code: string) {
    this.subscription = this.teacherService.getTeacherByCode(code).subscribe(
      value => {
        this.deleteTeacher = value;
        this.deleteTeacherName = this.deleteTeacher.name;
      }
   );
    this.subscription = this.teacherService.checkDelete(code).subscribe(
      value => {
        if (value == null){
          this.projectDto = [];
        }else {
          this.projectDto = value;
        }
      }
    )
  }

  delete() {
    this.subscription = this.teacherService.delete(this.deleteTeacher.code).subscribe(
      value => {},
      error => {},
      ()=>{
        this.loadListTeacher();
      }
    )
  }


}
