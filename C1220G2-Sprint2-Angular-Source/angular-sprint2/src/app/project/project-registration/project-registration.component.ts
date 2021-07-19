import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TeamService} from "../../student-group/team.service";


@Component({
  selector: 'app-project-registration',
  templateUrl: './project-registration.component.html',
  styleUrls: ['./project-registration.component.css']
})
export class ProjectRegistrationComponent implements OnInit {


  listProject: any[];
  listTeacher: any[];
  listCategory: any[];
  pageProject: number=1;
  public createForm!: FormGroup;
  constructor(private teamService: TeamService, private route: Router, private fb: FormBuilder, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.teamService.listProject().subscribe(data => {
      this.listProject = data.filter(function (project) {
        return  project.enable == true;
      })
      this.listProject
    });

    this.teamService.listTeacher().subscribe(data => {
      this.listTeacher = data.filter(function (project) {
        return  project.enable == true;
      })

    });

    this.teamService.listCategory().subscribe(data => {
      this.listCategory = data;
    });
    this.initForm();
  }



  save() {

  }

  private initForm() {
    this.createForm = this.fb.group({
      name: ['', [Validators.required]],
      content: ['',[Validators.required,Validators.minLength(25), Validators.maxLength(255) ]],
      category: ['', [Validators.required]],
      teacher: ['', [Validators.required]],
    });
  }
}
