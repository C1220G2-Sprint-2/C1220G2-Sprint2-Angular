import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {StudentService} from "../student.service";
import {Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {Observable} from "rxjs";
import { FirebaseAuthService } from 'src/app/chat/services/firebaseAuth.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {

  constructor(private studentService: StudentService,
              private router: Router,
              private angularFireStorage: AngularFireStorage,
              private firebaseAuthService: FirebaseAuthService  // kha code
  ) { }

  studentForm: FormGroup;
  ngOnInit(): void {

    this.studentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      classStudent: new FormControl('', Validators.required),
      faculty: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      facebook: new FormControl(),
    });
  }

  submitForm() {
    let student = this.studentForm.value;
    student.image = this.image;
    console.log(student);
    this.studentService.create(student).subscribe(() => {
      // ------------ kha code-----------
      // const defaultPassword: string = "123456"
      // this.firebaseAuthService.signUp(student.email, defaultPassword, this.image);
      // --------------------------------
    }, e => {

    }, () =>{
      this.router.navigateByUrl('/hoc-sinh/danh-sach');
    });
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
