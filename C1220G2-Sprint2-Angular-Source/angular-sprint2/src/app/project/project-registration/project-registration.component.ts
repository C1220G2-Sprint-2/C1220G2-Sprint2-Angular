import {Component, DoCheck, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TeamService} from "../../student-group/team.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";
import {Validation} from "./Validation";


@Component({
  selector: 'app-project-registration',
  templateUrl: './project-registration.component.html',
  styleUrls: ['./project-registration.component.css']
})
export class ProjectRegistrationComponent implements OnInit, DoCheck {


  listProject: any[];
  listTeacher: any[];
  listCategory: any[];
  pageProject: number = 1;
  public createForm!: FormGroup;

  private user = {
    studentCode: "SV-0001",
    teacherCode: null,
  }

  title = "cloudsSorage";
  selectedFile: File = null;

  downloadURL: Observable<string>;
  image: string = '';
  description: string = '';
  studentTS: any;
  project: any;

  constructor(private teamService: TeamService, private route: Router, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.teamService
    if (this.user.studentCode != null) {
      this.teamService.getStudent(this.user.studentCode).subscribe(data => {
        console.log(data);
        this.studentTS = data;
        this.teamService.findByTeam(this.studentTS.team.id).subscribe(data => {
          console.log("kiem tra project");
          console.log(data);
          this.project = data;
        });
      });
    }


    this.teamService.listProject().subscribe(data => {
      this.listProject = data.filter(function (project) {
        return project.enable == true && project.status == 1;
      })
      this.listProject
    });

    this.teamService.listTeacher().subscribe(data => {
      this.listTeacher = data.filter(function (project) {
        return project.enable == true;
      })

    });

    this.teamService.listCategory().subscribe(data => {
      this.listCategory = data;

    });
    this.initForm();
  }


  save() {
    let project = this.createForm.value;
    project.image = this.image;
    project.description = this.description;
    project.team = this.studentTS.team;
    let check = false;
    for (let i = 0; i < this.listCategory.length; i++) {
      if (this.listCategory[i].name == project.category) {
        check = true;
      }
    }
    console.log(check);
    check = false;
    for (let i = 0; i < this.listTeacher.length; i++) {
      if (this.listTeacher[i].name == project.teacher) {
        check = true;
      }
    }
    console.log(check);
    if (check) {
      this.teamService.postProject(project).subscribe(() => {
        // this.showSuccess();
        this.route.navigateByUrl('nhom/quan-ly-nhom');
      })
    } else {
      alert(" Giáo viên hướng dẫn hoặc Danh mục không đúng");
    }
  }

  private

  initForm() {
    this.createForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      content: ['', [Validators.required, Validators.minLength(25), Validators.maxLength(255)]],
      category: ['', [Validators.required,
        // this.checkCategory
      ]],
      teacher: ['', [Validators.required,
        // this.checkTeacher
      ]],
      image: [this.image, [Validators.required]],
      description: [this.description, [Validators.required]],
    });


  }

  onImgSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.image = url
            }
            console.log(this.image)
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);

        }
      });
  }

  onFileSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsFiles/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsFiles/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.description = url
            }
            console.log("this.description")
            console.log(this.description)
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);

        }
      });
  }

  ngDoCheck(): void {
    // console.log(this.createForm.value);
  }


}
