import { Component, OnInit } from '@angular/core';
import {StudentService} from "../student.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Student} from "../../model/student";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/storage";
import {Class} from "../../model/class";
import {Faculty} from "../../model/faculty";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";



@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  codeStudent: string;
  student: Student;
  studentForm: FormGroup;
  listClass: Class[] = [];
  listFaculty: Faculty[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private studentService: StudentService,
              private toastService: ToastrService,
              private router: Router,
              private angularFireStorage: AngularFireStorage) { }

  ngOnInit(): void {
  this.codeStudent = this.activatedRoute.snapshot.params.code;
    this.studentService.findAllClass().subscribe(value => {
      this.listClass =value;
      this.studentService.findAllFaculty().subscribe(value => {
        this.listFaculty = value;
        this.studentService.findById(this.codeStudent).subscribe(value => {
          this.student = value;
          console.log(this.student);
          this.studentForm = new FormGroup({
            name: new FormControl(this.student.name, [Validators.required,Validators.pattern('^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$')]),
            gender: new FormControl(this.student.gender, Validators.required),
            dateOfBirth: new FormControl(this.student.dateOfBirth, [Validators.required, this.validateAge18]),
            phone: new FormControl(this.student.phone, Validators.required),
            classStudent: new FormControl(this.student.classStudent, Validators.required),
            faculty: new FormControl(this.student.faculty, Validators.required),
            email: new FormControl(this.student.email, Validators.required),
            address: new FormControl(this.student.address, Validators.required),
            facebook: new FormControl(this.student.facebook),
            team: new FormControl(this.student.team),
            image: new FormControl(this.student.image),
            status: new FormControl(this.student.status),
          });
          this.image = this.student.image;
        })
      });
    });

  }
  validateAge18(dateOfBirthControl: AbstractControl): any {
    let dateOfBirthValue = dateOfBirthControl.value;
    let year = Number(dateOfBirthValue.substr(0,4));
    let currentYear = new Date().getFullYear();
    let check = currentYear - year >=18 && currentYear - year <60;
    return check ? null : {'invalid18' : true};
  }
  submitForm() {
    this.delay();
 let temp = this.studentForm.value;
 temp.code = this.codeStudent;
 temp.image = this.image;
 console.log(temp);
 this.studentService.edit(temp).subscribe(value => {
   this.router.navigateByUrl("/hoc-sinh/danh-sach");
   this.callToastr();
 })
  }


  selectedImage: any;
  downloadURL: Observable<string>;
  image: string;
  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    this.chooseImage(this.selectedImage);
  }

  chooseImage(selectedImage: any) {
    const nameImg = selectedImage.name;
    const fileRef = this.angularFireStorage.ref(nameImg);
    this.angularFireStorage.upload(nameImg, selectedImage).snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(url => {
          this.image = url;
          console.log(this.image);
        })
      })
    ).subscribe();
  }

  callToastr() {
    this.toastService.success("Chỉnh sửa thông tin sinh viên thành công...", "Chỉnh sửa", {
      timeOut: 1500,
      progressBar: true,
      progressAnimation: 'increasing'
    })
  }
  delay() {
    let timerInterval;
    Swal.fire({
      title: '',
      html: 'Vui lòng chờ trong <b></b> giây.',
      timer: 500,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {
          const content = Swal.getHtmlContainer();
          if (content) {
            const b = content.querySelector('b');
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

}

