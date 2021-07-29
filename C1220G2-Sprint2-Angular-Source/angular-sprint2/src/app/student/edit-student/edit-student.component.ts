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
  emailOld: string = "";

  constructor(private activatedRoute: ActivatedRoute,
              private studentService: StudentService,
              private toastService: ToastrService,
              private router: Router,
              private angularFireStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.studentService.findAll().subscribe(value => {
      this.listStudent = value;
    });
  this.codeStudent = this.activatedRoute.snapshot.params.code;
    this.studentService.findAllClass().subscribe(value => {
      this.listClass =value;
      this.studentService.findAllFaculty().subscribe(value => {
        this.listFaculty = value;
        this.studentService.findById(this.codeStudent).subscribe(value => {
          this.student = value;
          for(let i =0; i<this.listClass.length; i++){
            if (this.student.classStudent == String(this.listClass[i].id)){
              this.student.classStudent = this.listClass[i].name;
            }
          }
          for(let i =0; i<this.listFaculty.length; i++){
            if (this.student.faculty == String(this.listFaculty[i].id)){
              this.student.faculty = this.listFaculty[i].name;
            }
          }
          this.emailOld = this.student.email;
          console.log(this.student);
          this.studentForm = new FormGroup({
            name: new FormControl(this.student.name, [Validators.maxLength(50),Validators.required,Validators.pattern('^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$')]),
            gender: new FormControl(this.student.gender, Validators.required),
            dateOfBirth: new FormControl(this.student.dateOfBirth, [Validators.required, this.validateAge18]),
            phone: new FormControl(this.student.phone, [Validators.required,Validators.pattern('^(090|091)[0-9]{7}$')]),
            classStudent: new FormControl(this.student.classStudent, Validators.required),
            faculty: new FormControl(this.student.faculty, Validators.required),
            email: new FormControl(this.student.email, [Validators.maxLength(50),Validators.required,Validators.pattern('^[A-Za-z0-9]+[@][a-z]+\\.[a-z]+$')]),
            address: new FormControl(this.student.address, [Validators.required,Validators.maxLength(50)]),
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
    let temp = this.studentForm.value;
    temp.code = this.codeStudent;
    temp.image = this.image;
    for(let i =0; i<this.listClass.length; i++){
      if (temp.classStudent == this.listClass[i].name){
        temp.classStudent = Number(this.listClass[i].id);
      }
    }
    for(let i =0; i<this.listFaculty.length; i++){
      if (temp.faculty == this.listFaculty[i].name){
        temp.faculty = Number(this.listFaculty[i].id);
      }
    }
    if (this.checkEmail(temp.email)){

    }else{
      this.delay();
      this.studentService.edit(temp).subscribe(value => {
        this.router.navigateByUrl("/hoc-sinh/danh-sach");
        this.callToastr();
      })
    }
  }
  listStudent: Student[];
  messageEmail = "";

  checkEmail(email: string): boolean{
    this.messageEmail = "";
    for (let i=0; i<this.listStudent.length; i++){
      if (email == this.listStudent[i].email && email != this.emailOld){
        this.messageEmail = "Email đã có người sử dụng";
        return true;
      }
    }
    return false;
  }

  selectedImage: any;
  downloadURL: Observable<string>;
  image: string;
  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    this.chooseImage(this.selectedImage);
  }
checkUpload = true;
  chooseImage(selectedImage: any) {
    this.checkUpload = false;
    const nameImg = selectedImage.name;
    const fileRef = this.angularFireStorage.ref(nameImg);
    this.angularFireStorage.upload(nameImg, selectedImage).snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(url => {
          this.image = url;
          this.checkUpload = true;
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
      html: 'Vui lòng chờ...',
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

