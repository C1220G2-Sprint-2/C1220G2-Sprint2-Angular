import {Component, DoCheck, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TeamService} from "../../student-group/team.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";
import {Validation} from "./Validation";
import {TokenStorageService} from "../../security/token-storage.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-project-registration',
  templateUrl: './project-registration.component.html',
  styleUrls: ['./project-registration.component.css']
})
export class ProjectRegistrationComponent implements OnInit, DoCheck {
  page: number = 1;
  pageSize: number = 10;
  nameCheck= "";
  checkName=false;
  ngDoCheck(): void {

  }
  loading = false;
  listProject: any[];
  listTeacher: any[];
  listCategory: any[];
  pageProject: number = 1;
  public createForm!: FormGroup;

   user;

  title = "cloudsSorage";
  selectedFile: File = null;

  downloadURL: Observable<string>;
  image: string = '';
  description: string = '';
  studentTS: any;
  project: any;
  isLoggedIn: boolean = false;

  constructor(private tokenStorageService: TokenStorageService, private teamService: TeamService, private route: Router, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
    }

    if (this.user.username != null) {
      this.teamService.getStudent(this.user.username).subscribe(data => {
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
      console.log("this.listProject")
      console.log(data);
      this.listProject = data.filter(function (project) {
        return project.enable == true && project.status == 1;
      })

    });

    this.teamService.listTeacher().subscribe(data => {
      console.log(this.listTeacher);
      this.listTeacher = data.filter(function (project) {
        return project.enable == true;
      })
      console.log(this.listTeacher)
    });
    this.teamService.listCategory().subscribe(data => {
      this.listCategory = data;
      console.log(data);
    });
    this.initForm();
  }


  save() {
    this.loading=true;
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
      // this.delay(4000);
      this.teamService.postProject(project).subscribe(() => {
        this.loading=false;
        this.showSuccess();
        this.route.navigateByUrl('nhom/quan-ly-nhom');
      }, error =>  {
        this.loading=false;
      })
    } else {
    this.showError();
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
  checkImg: boolean = false;
  checkFile: boolean = false;
  onImgSelected(event) {

    var n = Date.now();
    const file = event.target.files[0];

    if (file.size - (1048576 *5) >0 || ((file.type+"").indexOf("image") == -1)) {
      this.checkImg= true;
    } else {
      this.checkImg= false;
      console.log('size', file.size);
      console.log('type', file.type);
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
            this.delay(1500);
          }
        });
    }

  }

  onFileSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
    if (file.size - (1048576 *10) >0 || ((file.type+"").indexOf("image") != -1)) {
      this.checkFile= true;
    } else {
      this.checkFile= false;
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
          this.delay(1500);
        });
    }
  }


  errorMessage = '';

  showSuccess() {
    Swal.fire({
      title: 'Bạn đã đăng ký đề tài thành công, chờ giáo viên phê duyệt!',
      text: this.errorMessage,
      icon: 'success',
      confirmButtonText: 'Đóng'
    })
  }

  showError() {
    Swal.fire({
      title: 'Không thể đăng ký đề tài vì Giáo viên hướng dẫn hoặc Danh mục không đúng!',
      text: this.errorMessage,
      icon: 'error',
      confirmButtonText: 'Đóng'
    })
  }

  chuyenHuong() {
    this.route.navigateByUrl('nhom/quan-ly-nhom');
  }


  delay(number: number) {
    let timerInterval
    Swal.fire({
      title: 'Đang tải dữ liệu!',
      html: '',
      timer: number,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
          const content = Swal.getHtmlContainer()
          if (content) {
            const b = content.querySelector('b')
            if (b) {
              b.textContent = String(Swal.getTimerLeft())
            }
          }
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
  }


  check() {

      let arr =  this.nameCheck.toLowerCase().trim().split(" ");
      this.checkName=false;
        arr = arr.filter(function (a) {
          return a != "";
        })
    console.log(arr)
    let check=false;
      for (let i=0; i< this.listProject.length;i++) {

        let count=0;
        let arr2= this.listProject[i].name.toLowerCase().trim().split(" ");
        for (let j= 0; j<arr2.length; j++) {
          let check2=false;
          for(let k=0; k<arr.length;k++) {
            if (arr[k] == arr2[j]) {
              check2=true;
            }
          }
        if (check2) {
          count++;
        }
        }
        console.log(count)
        console.log(arr.length)
        if (count == arr.length) {
           this.checkName= true;
        }
      }
    console.log( this.checkName)
  }
}
