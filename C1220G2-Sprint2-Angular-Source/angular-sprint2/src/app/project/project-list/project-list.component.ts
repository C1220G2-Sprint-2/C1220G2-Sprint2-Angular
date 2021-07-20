import { Component, OnInit } from '@angular/core';
import {ProjectServiceService} from "../project-service.service";
import {Router} from "@angular/router";
import {Project} from "../../models/project";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projectList: Project[] = [];
  project: Project;
  collectionSize = 0;
  messageEmpty='';
  page = 1;
  pageSize = 4;
  nameDelete: string;
  idDelete: number;
  constructor(private projectService: ProjectServiceService, private router: Router) { }

  ngOnInit(): void {
    this.loadList();
  }

  loadList(){
    this.projectService.findAll().subscribe(data => {
      this.projectList=data['content'];
      if(this.projectList.length == 0){
        this.messageEmpty='Project is empty';
        console.log(this.messageEmpty)
      }else {

      this.collectionSize =data['totalPages'];
      }
    })
    // console.log(this.projectList.length)
  }
  getData(id: number, name: string) {
    this.idDelete = id;
    this.nameDelete = name;
  }

  deleteProject() {
    this.projectService.findById(this.idDelete).subscribe(data => {
      this.project = data;
      this.projectService.deleteProject(this.project).subscribe(data =>{
        this.loadList();
        this.router.navigateByUrl("/de-tai/danh-sach-de-tai");
      });
    })


    }
}
