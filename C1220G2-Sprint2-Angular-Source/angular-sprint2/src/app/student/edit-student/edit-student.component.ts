import { Component, OnInit } from '@angular/core';
import {StudentService} from "../student.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Student} from "../../model/student";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/storage";

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  codeStudent: string;
  student: Student;
  studentForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private studentService: StudentService,
              private router: Router,
              private angularFireStorage: AngularFireStorage) { }

  ngOnInit(): void {
  this.codeStudent = this.activatedRoute.snapshot.params.code;
  this.studentService.findById(this.codeStudent).subscribe(value => {
    this.student = value;
    this.studentForm = new FormGroup({
      name: new FormControl(this.student.name, Validators.required),
      gender: new FormControl(this.student.gender, Validators.required),
      dateOfBirth: new FormControl(this.student.dateOfBirth, Validators.required),
      phone: new FormControl(this.student.phone, Validators.required),
      classStudent: new FormControl(this.student.classStudent, Validators.required),
      faculty: new FormControl(this.student.faculty, Validators.required),
      email: new FormControl(this.student.email, Validators.required),
      address: new FormControl(this.student.address, Validators.required),
      facebook: new FormControl(this.student.facebook),
    });
  })
  }

  submitForm() {
 let temp = this.studentForm.value;
 temp.code = this.codeStudent;
 temp.image = this.image;
 console.log(temp);
 this.studentService.edit(temp).subscribe(value => {
   this.router.navigateByUrl("/hoc-sinh/danh-sach");
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
}

