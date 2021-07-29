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
  loading= false;
  studentGroupList: StudentGroup[] = [];
  project: Project[] = [];
  teamList: Team[] = [];
  studentGroup: Team;
  name: string;
  idStudent: number;
  page: number = 1;
  pageSize: number = 5;
  date: string;
  pageList: number;
  search: string;
  listTeam: any;
  private message: string = '';
  private check: boolean = false;
  constructor(private studentGroupService: StudentGroupService,
              private toastrService: ToastrService,
              private router: Router) {
  }
  ngOnInit(): void {
    this.findAll()
  }
  findAll() {
    this.studentGroupService.searchAll('').subscribe(data => {
      console.log(data)
      this.teamList = data.filter(function (team) {
        return  team.name != "không có nhóm"  ;
      })

      console.log("data team")
      console.log(this.teamList)
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
    this.message = "";
    let array = this.date.split('-')
    let yearNow = new Date().getFullYear();
    let monthNow = new Date().getMonth() + 1;
    let dayNow = new Date().getDate();
    console.log(yearNow, monthNow, dayNow)
    console.log(Number(array[0]), Number(array[1]), Number(array[2]))
    if (Number(array[0]) > yearNow) {
      this.check = true;
    }else if (Number(array[0]) == yearNow) {
      if (Number(array[1]) > monthNow) {
        this.check = true
      } else if(Number(array[1]) == monthNow){
        if( Number(array[2])>dayNow){
          this.check = true;
        }else {
          this.check = false;
        }
      }else {
        this.check = false;
      }
    }else {
      this.check = false;
    }
    if (this.check == true) {
      this.studentGroupService.addId(this.idStudent, this.date).subscribe()
      this.showSuccess()
    } else {
      this.message = "du lieu ko hop le";
      this.showError()
    }
  }

  deleteStudentGroup() {
    this.loading= true;
    this.studentGroupService.update(this.idStudent, this.studentGroup).subscribe(() => {
        this.findAll();
        this.loading= false;
        this.showSuccessDelete()
      }, error => {
      this.loading= false;
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
    this.router.navigateByUrl('/quan-ly-tien-do/chi-tiet-tien-do/'+id)
  }

  showError() {
    this.toastrService.error( ' Ngày bạn chọn nhỏ hơn ngày hiện tại ','Thất bại!');
  }
}
