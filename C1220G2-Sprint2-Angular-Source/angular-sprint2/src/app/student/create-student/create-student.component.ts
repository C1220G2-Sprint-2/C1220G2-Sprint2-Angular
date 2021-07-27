import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {StudentService} from "../student.service";
import {Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {Observable} from "rxjs";
import { FirebaseAuthService } from 'src/app/chat/services/firebaseAuth.service';
import {Class} from "../../model/class";
import {Faculty} from "../../model/faculty";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {

  constructor(private studentService: StudentService,
              private router: Router,
              private toastService: ToastrService,
              private angularFireStorage: AngularFireStorage) { }

  studentForm: FormGroup;
  listClass: Class[] = [];
  listFaculty: Faculty[] = [];
  ngOnInit(): void {
    this.studentService.findAllClass().subscribe(value => {
      this.listClass =value;
    });
    this.studentService.findAllFaculty().subscribe(value => {
      this.listFaculty = value;
    });
    this.studentForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$')]),
      gender: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', [Validators.required, this.validateAge18 ]),
      phone: new FormControl('', Validators.required),
      classStudent: new FormControl('', Validators.required),
      faculty: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      facebook: new FormControl(),
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
    let student = this.studentForm.value;
    student.image = this.image;
    console.log(student);
    this.studentService.create(student).subscribe(() => {
      this.callToastr();
    }, e => {

    }, () =>{
      this.router.navigateByUrl('/hoc-sinh/danh-sach');
    });
  }

  selectedImage: any;
  downloadURL: Observable<string>;
  image: string = "https://us.123rf.com/450wm/pikepicture/pikepicture1612/pikepicture161200526/68824651-male-default-placeholder-avatar-profile-gray-picture-isolated-on-white-background-for-your-design-ve.jpg?ver=6";
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
    this.toastService.success("Thêm mới sinh viên thành công...", "Chỉnh sửa", {
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
      timer: 5000,
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
