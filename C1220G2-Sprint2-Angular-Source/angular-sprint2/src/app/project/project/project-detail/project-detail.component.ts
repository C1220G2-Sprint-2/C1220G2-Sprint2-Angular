import { Component, OnInit } from '@angular/core';
import {ProjectServiceService} from "../project-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Project} from "../../models/project";

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  idProject: number;
  project: Project;

  constructor(private projectService: ProjectServiceService, private router: Router,private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.idProject = Number(this.activatedRoute.snapshot.params.id);
    this.projectService.findById(this.idProject).subscribe(data  => {
      this.project = data;
      console.log(this.project)
    })
  }

}
