import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Education} from '../../models/education';
import {Faculty} from '../../models/faculty';
import {Observable, Subscription} from 'rxjs';
import {TeacherService} from '../teacher.service';
import {Teacher} from '../../models/teacher';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {ToastrService} from 'ngx-toastr';
import Swal from "sweetalert2";
import {CheckLoggedInService} from '../../manager-add-excel/check-logged-in.service';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css']
})
export class EditTeacherComponent implements OnInit {

  educationList: Education[] = [];
  facultyList: Faculty[] = [];
  subscription: Subscription;
  codeTeacherDetail: string;
  teacherDetail: Teacher;
  teacherDetailForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    dateOfBirth: new FormControl(''),
    gender: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    image: new FormControl(''),
    twitter: new FormControl(''),
    facebook: new FormControl(''),
    facultyId: new FormControl(''),
    educationId: new FormControl('')
  });

  constructor(private teacherService: TeacherService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private angularFireStorage: AngularFireStorage,
              private toastService: ToastrService, private checkLoggedInService: CheckLoggedInService) {

  }

  ngOnInit(): void {
    this.checkLoggedInService.check();
    this.loadListFaculty();
    this.loadListEducation();
    this.activatedRoute.paramMap.subscribe((value: ParamMap)=>{
      this.codeTeacherDetail = <string>value.get('code');
    });
    this.subscription = this.teacherService.getTeacherByCode(this.codeTeacherDetail).subscribe(value => {
      console.log(value);
      this.teacherDetail = value;
      this.imageFirebase = this.teacherDetail.image;
      this.teacherDetailForm = new FormGroup({
        name: new FormControl(this.teacherDetail.name,
          [Validators.required, Validators.minLength(3), Validators.maxLength(30)
          ]),
        dateOfBirth: new FormControl(this.teacherDetail.dateOfBirth, [Validators.required]),
        gender: new FormControl(this.teacherDetail.gender, [Validators.required]),
        phone: new FormControl(this.teacherDetail.phone, [Validators.required]),
        email: new FormControl(this.teacherDetail.email, [
          Validators.required, Validators.minLength(3), Validators.maxLength(50),
          Validators.pattern('^[a-z]+([\\_\\.]?[a-z\\d]+)*@[a-z]{3,7}\\.[a-z]{2,3}$')
        ]),
        address: new FormControl(this.teacherDetail.address, [
          Validators.required, Validators.minLength(3), Validators.maxLength(200)
        ]),
        image: new FormControl(''),
        twitter: new FormControl(this.teacherDetail.twitter, [Validators.minLength(3), Validators.maxLength(200)]),
        facebook: new FormControl(this.teacherDetail.facebook, [Validators.minLength(3), Validators.maxLength(200)]),
        facultyId: new FormControl(this.teacherDetail.facultyId, [Validators.required]),
        educationId: new FormControl(this.teacherDetail.educationId, [Validators.required])
      });
    });

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


  submit() {
    this.teacherDetail = this.teacherDetailForm.value;
    this.teacherDetail.code = this.codeTeacherDetail;
    this.teacherDetail.image = this.imageFirebase;
    this.subscription = this.teacherService.editTeacher(this.teacherDetail).subscribe(
      value => {
        this.showSuccess();
      },
      error => {
        console.log(error)
        this.showError()
      },
      ()=>{
        this.router.navigateByUrl('/danh-sach')
      }
    )
  }

  selectedImage: any;
  downloadURL: Observable<string>;
  imageFirebase: string;
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
    this.toastService.success('Thành công !', 'Đã cập nhật thông tin giảng viên');
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
    return this.teacherDetailForm.get('name');
  }

  get dateOfBirth() {
    return this.teacherDetailForm.get('dateOfBirth');
  }

  get gender() {
    return this.teacherDetailForm.get('gender');
  }

  get phone() {
    return this.teacherDetailForm.get('phone');
  }

  get email() {
    return this.teacherDetailForm.get('email');
  }

  get address() {
    return this.teacherDetailForm.get('address');
  }

  get image() {
    return this.teacherDetailForm.get('image');
  }

  get twitter() {
    return this.teacherDetailForm.get('twitter');
  }

  get facebook() {
    return this.teacherDetailForm.get('facebook');
  }

  get facultyId() {
    return this.teacherDetailForm.get('facultyId');
  }

  get educationId() {
    return this.teacherDetailForm.get('educationId');
  }
}
