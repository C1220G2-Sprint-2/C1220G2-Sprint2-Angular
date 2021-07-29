import { Component, OnInit } from '@angular/core';
import {ProjectServiceService} from "../project-service.service";
import {Router} from "@angular/router";
import {Project} from "../../models/project";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projectList: Project[] = [];
  project: Project;
  // collectionSize = 0;
  messageEmpty='';
  page = 1;
  pageSize = 4;
  nameDelete: string;
  idDelete: number;
  keyword = '';
  constructor(private projectService: ProjectServiceService, private router: Router, private toastService: ToastrService) { }

  ngOnInit(): void {
    this.loadList();
  }

  loadList(){
    this.projectService.findAll().subscribe(data => {
      this.projectList=data;
      if(this.projectList.length == 0){
        this.messageEmpty='Không có dữ liệu';
        console.log(this.messageEmpty)
      }
    })
  }

  getData(id: number, name: string) {
    this.idDelete = Number(id) ;
    this.nameDelete = name;
  }

  deleteProject() {
    this.projectService.findById(this.idDelete).subscribe(data => {
      this.project = data;
      this.projectService.deleteProject(this.project).subscribe(data =>{
        this.loadList();
        this.router.navigateByUrl("/de-tai/danh-sach-de-tai");
        this.showError();
      });
    })
    }

  searchProject() {
   if (this.keyword != '') {
     this.projectService.searchProject(this.keyword).subscribe(data => {
       this.projectList = data;
       if (this.projectList.length == 0) {
         this.messageEmpty = 'Không tìm thấy kết quả phù hợp'
       }
     })
   }else {
     this.loadList();
   }
  }

  getKeyword($event: any) {
    this.keyword = $event.target.value;
    console.log(this.keyword);
  }
  showError() {
    Swal.fire({
      title: 'Bạn đã xóa đề tài thành công!',
      text: '',
      icon: 'error',
      confirmButtonText: 'Đóng'
    })
  }

}
