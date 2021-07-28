import {Component, OnInit} from '@angular/core';
import {StudentGroupService} from "../student-group.service";
import {StudentGroup} from "../student-group";
import {Project} from "../../models/project";
import {Team} from "../../models/team";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
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
  name: string;
  idStudent: number;
  page: number = 1;
  pageSize: number = 4;
  date: string;
  pageList: number;
  search: string;
  listTeam: any;
  constructor(private studentGroupService: StudentGroupService,
              private toastrService: ToastrService,
              private router: Router) {
  }
  ngOnInit(): void {
    this.findAll()
  }
  findAll() {
    this.studentGroupService.searchAll("").subscribe(data => {
      this.teamList = data.filter(function (team) {
        return team.enable == true && team.id !=1;
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
    this.studentGroupService.addId(this.idStudent, this.date).subscribe()
    this.showSuccess()
    console.log(this.date)
  }
  deleteStudentGroup() {
    this.studentGroupService.update(this.idStudent, this.studentGroup).subscribe(() => {
        this.findAll();
        this.showSuccessDelete()
      }
    )
  }
  searchAll() {
    this.studentGroupService.searchAll(this.search).subscribe(list => {
      if(list==null){
        list=[];
      }
      this.teamList = list.filter(function (team) {
        return team.enable == true;
      })
    })
  }
  showSuccessDelete() {
    this.toastrService.success('Thành công !', 'Xoá Nhóm');
  }
  showSuccess() {
    this.toastrService.success('Thành công !', 'Gửi ');
  }
  toProject() {
    this.router.navigateByUrl('de-tai/kiem-duyet-de-tai');
  }
  toDetail(id: number) {
    this.router.navigateByUrl('/quan-ly-tien-do/chi-tiet-tien-do')
  }
}
