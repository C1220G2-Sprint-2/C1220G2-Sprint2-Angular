import {Component, OnInit} from '@angular/core';
import {Education} from '../../models/education';
import {Faculty} from '../../models/faculty';
import {Observable, Subscription} from 'rxjs';
import {TeacherService} from '../teacher.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Teacher} from '../../models/teacher';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import Swal from "sweetalert2";
import {CheckLoggedInService} from '../../manager-add-excel/check-logged-in.service';

@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.css']
})
export class CreateTeacherComponent implements OnInit {

  educationList: Education[] = [];
  facultyList: Faculty[] = [];
  subscription: Subscription;
  createTeacherForm: FormGroup;
  newTeacher: Teacher;

  constructor(private teacherService: TeacherService,
              private angularFireStorage: AngularFireStorage,
              private router: Router,
              private toastService: ToastrService, private checkLoggedInService: CheckLoggedInService) {
    checkLoggedInService.check()
  }

  ngOnInit(): void {
    this.loadListEducation();
    this.loadListFaculty();
    this.createForm();
  }

  loadListFaculty() {
    this.subscription = this.teacherService.getAllFaculty().subscribe(
      value => {
        if (value == null) {
          this.facultyList = [];
        } else {
          this.facultyList = value;
        }
      }
    );
  }

  loadListEducation() {
    this.subscription = this.teacherService.getAllEducation().subscribe(
      value => {
        if (value == null) {
          this.educationList = [];
        } else {
          this.educationList = value;
        }
      }
    );
  }

  createForm() {
    this.createTeacherForm = new FormGroup({
      name: new FormControl('',
        [Validators.required, Validators.minLength(3), Validators.maxLength(30)
      ]),
      dateOfBirth: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required, Validators.minLength(3), Validators.maxLength(50),
        Validators.pattern('^[a-z]+([\\_\\.]?[a-z\\d]+)*@[a-z]{3,7}\\.[a-z]{2,3}$')
      ]),
      address: new FormControl('', [
        Validators.required, Validators.minLength(3), Validators.maxLength(200)
      ]),
      image: new FormControl(''),
      twitter: new FormControl('', [Validators.minLength(3), Validators.maxLength(200)]),
      facebook: new FormControl('', [Validators.minLength(3), Validators.maxLength(200)]),
      facultyId: new FormControl('', [Validators.required]),
      educationId: new FormControl('', [Validators.required])
    });
  }

  submit() {
    this.newTeacher = this.createTeacherForm.value;
    this.newTeacher.image = this.imageFirebase;
    this.subscription = this.teacherService.createTeacher(this.newTeacher).subscribe(
      value => {
        this.showSuccess();
      },
      error => {
        console.log(error);
        this.showError();
      },
      ()=>{
        this.router.navigateByUrl('/danh-sach')
      }
    )
  }

  selectedImage: any;
  downloadURL: Observable<string>;
  imageFirebase: string='https://us.123rf.com/450wm/pikepicture/pikepicture1612/pikepicture161200526/68824651-male-default-placeholder-avatar-profile-gray-picture-isolated-on-white-background-for-your-design-ve.jpg?ver=6';
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
          this.imageFirebase = url;
          console.log(this.imageFirebase);
        })
      })
    ).subscribe();
  }

  showSuccess() {
    this.toastService.success('Thành công !', 'Đã tạo mới giảng viên');
  }

  showError() {
    Swal.fire({
      title: 'Số điện thoại hoặc email đã tồn tại !',
      text: 'Vui lòng nhập số điện thoại hoặc email khác.',
      icon: 'error',
      confirmButtonText: 'Đóng'
    });
  }

  get name() {
    return this.createTeacherForm.get('name');
  }

  get dateOfBirth() {
    return this.createTeacherForm.get('dateOfBirth');
  }

  get gender() {
    return this.createTeacherForm.get('gender');
  }

  get phone() {
    return this.createTeacherForm.get('phone');
  }

  get email() {
    return this.createTeacherForm.get('email');
  }

  get address() {
    return this.createTeacherForm.get('address');
  }

  get image() {
    return this.createTeacherForm.get('image');
  }

  get twitter() {
    return this.createTeacherForm.get('twitter');
  }

  get facebook() {
    return this.createTeacherForm.get('facebook');
  }

  get facultyId() {
    return this.createTeacherForm.get('facultyId');
  }

  get educationId() {
    return this.createTeacherForm.get('educationId');
  }
}
