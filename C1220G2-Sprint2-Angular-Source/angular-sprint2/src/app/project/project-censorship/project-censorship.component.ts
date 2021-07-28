import { Component, OnInit } from '@angular/core';
import {Project} from "../../models/project";
import {ProjectServiceService} from "../project-service.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";


@Component({
  selector: 'app-project-censorship',
  templateUrl: './project-censorship.component.html',
  styleUrls: ['./project-censorship.component.css']
})
export class ProjectCensorshipComponent implements OnInit {
  projectList: Project[] = [];
  projectListApprove: Project[] = [];
  project: Project;
  collectionSize = 0;
  messageEmpty = '';
  page = 1;
  pageSize = 4;
  idApprove: number;
  nameApprove: string;
  teamName: any;
  page1 = 1;
  pageSize1 = 4;
  checkSortName = false;

  constructor(private projectService: ProjectServiceService, private router: Router, private toastService: ToastrService) {
  }

  ngOnInit(): void {
    this.loadList();
    this.loadListApprove();
  }

  loadList() {
    this.projectService.findAll().subscribe(data => {
      this.projectList = data;
      if (this.projectList.length == 0) {
        this.messageEmpty = 'Không có dữ liệu';
      } else {
        this.collectionSize = data['totalPages'];
      }
    })
  }

  loadListApprove() {
    this.projectService.findProjectNeedAprrove().subscribe(data => {
      this.projectListApprove = data;
      console.log(this.projectListApprove)
      if (this.projectListApprove.length == 0) {
        this.messageEmpty = 'Không có đề tài cần phê duyệt'
      } else {
        this.collectionSize = data['totalPages'];
      }
    })
  }

  getData(id: number, name: string, team: any) {
    this.idApprove = id;
    this.nameApprove = name;
    this.teamName = team.name;
  }

  approveProject() {
    this.projectService.findById(this.idApprove).subscribe(data => {
      this.project = data;
      this.projectService.approveProject(this.project).subscribe(data => {
        this.loadListApprove();
        this.loadList();
        this.router.navigateByUrl("/de-tai/kiem-duyet-de-tai");
        // this.approveToastr();
        this.showSuccess();
      })
    })
  }

  notApproveProject() {
    this.projectService.findById(this.idApprove).subscribe(data => {
      this.project = data;
      this.projectService.notApproveProject(this.project).subscribe(data => {
        this.loadListApprove();
        this.router.navigateByUrl("/de-tai/kiem-duyet-de-tai");
        this.showError();
      })
    })
  }

  sortName() {
    console.log("vao")
    this.checkSortName = !this.checkSortName;
    if (this.checkSortName) {
      this.projectListApprove.sort(function (sv1, sv2) {
        let a = sv1.team.name;
        let b = sv2.team.name;
        return a === b ? 0 : a > b ? 1 : -1;
      })
    } else {
      this.projectListApprove.sort(function (sv1, sv2) {
        let a = sv1.team.name;
        let b = sv2.team.name;
        return a === b ? 0 : a > b ? -1 : 1;
      })
    }
  }

  showSuccess() {
    Swal.fire({
      title: 'Bạn đã phê duyệt thành công!',
      text: '',
      icon: 'success',
      confirmButtonText: 'Đóng'
    })
  }

  showError() {
    Swal.fire({
      title: 'Bạn hủy phê duyệt đề tài thành công!',
      text: '',
      icon: 'error',
      confirmButtonText: 'Đóng'
    })
  }
}
