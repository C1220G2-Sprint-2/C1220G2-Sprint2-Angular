import {Component, Input, OnInit} from '@angular/core';
import {StudentDto} from '../student-dto';
import {ProgressService} from '../progress.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StudentConcern} from '../../models/student-concern';
import {StudentConcernService} from '../student-concern.service';
import {TokenStorageService} from '../../security/token-storage.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Announcement} from '../../models/announcement';
import {AnnouncementService} from '../announcement.service';
import {ToastrService} from 'ngx-toastr';
import {ReviewDto} from "../review-dto";
import {ProjectDto} from "../project-dto";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  studentList: StudentDto[];
  name: string;
  concernForm: FormGroup;
  announcementForm: FormGroup;
  studentConcern: StudentConcern;
  teacherAnnouncement: Announcement;
  concernList: StudentConcern[];
  announcementList: Announcement[];
  avatar: string;
  downloadURL: Observable<string>;
  attachFile: string;
  isLoggedIn = false;
  isTeacherLogging = false;
  username: string;
  currentUsername: string;
  accountName: string;
  projectId: number;
  reviewForm: FormGroup;
  review: ReviewDto;
  projectDto: ProjectDto;
  reviewList: ReviewDto[];
  isTeacherLogin = false;
  userImage: string;

  constructor(private progressService: ProgressService,
              private activatedRoute: ActivatedRoute,
              private studentConcernService: StudentConcernService,
              private announcementService: AnnouncementService,
              private router: Router,
              private tokenStorageService: TokenStorageService,
              private storage: AngularFireStorage,
              private toastService: ToastrService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.projectId = +paramMap.get('id');
    });
  }

  ngOnInit(): void {
    this.avatar = this.tokenStorageService.getUser().avatar;
    this.currentUsername = this.tokenStorageService.getUser().name;
    this.getAllStudentDto();
    console.log('all student ' + this.studentList.length);
    this.addNewConcernForm();
    this.addNewAnnouncementForm();
    this.getAnnouncementList();
    this.getConcernList();
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;

      if (this.username.substring(0, 2) == "TC") {
        this.isTeacherLogging = true;
      }
    }
    this.addNewReviewForm();
    this.getAllReview();
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
      this.userImage = user.avatar;
      this.accountName = user.name;
      console.log(this.username);
      if (this.username.substring(0, 2) === 'TC') {
        this.isTeacherLogin = true;
      }
      console.log('hello teacher ' + this.isTeacherLogin);
    }
    this.progressService.getProjectById(this.projectId).subscribe(result => {
      this.projectDto = result;
    });
    console.log('hello------------- ' + this.projectDto.id);
  }

  getAllStudentDto() {
    this.progressService.getAllStudentDto().subscribe(result => {
      this.studentList = result;
      console.log('this' + result.length);
    });
  }

  //  CODE FROM DONGTHG

  addNewConcernForm() {
    this.concernForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      content: new FormControl('', Validators.required),
      attachedFile: new FormControl('', Validators.required)
    });
  }

  submitConcern() {
    const concern = this.concernForm;
    this.studentConcern = {
      title: concern.value.title,
      content: concern.value.content,
      attachFile: this.attachFile,
      studentCode: this.tokenStorageService.getUser().username
    };
    console.log(this.studentConcern);
    this.studentConcernService.saveStudentConcern(this.studentConcern).subscribe(() => {
      console.log('Create successful !');
      this.showSuccess();
    }, e => {
      console.log('Failed !');
    }, () => {
      this.getConcernList();
    });
  }

  getConcernList() {
    this.studentConcernService.getAllStudentConcern().subscribe(concern => {
      this.concernList = concern;
      console.log('Get list success !');
    }, e => {
      console.log('Get list failed !');
    });
  }

  addNewAnnouncementForm() {
    this.announcementForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      content: new FormControl('', Validators.required),
      attachedFile: new FormControl('', Validators.required)
    });
  }

  getAnnouncementList() {
    this.announcementService.getAllAnnouncement().subscribe(announcement => {
      this.announcementList = announcement;
      console.log('Get list success !');
    }, e => {
      console.log('Get list failed !');
    });
  }

  submitAnnouncement() {
    const announcement = this.announcementForm;
    this.teacherAnnouncement = {
      title: announcement.value.title,
      content: announcement.value.content,
      attachFile: this.attachFile,
      teacherCode: this.tokenStorageService.getUser().username
    };
    console.log(this.teacherAnnouncement);
    this.announcementService.saveAnnouncement(this.teacherAnnouncement).subscribe(() => {
      console.log('Create successful !');
      this.showSuccess();
    }, e => {
      console.log('Failed !');
    }, () => {
      this.getAnnouncementList();
    });
  }

  addFile(event: any) {
    const now = Date.now();
    const file = event.target.files[0];
    const filePath = `StudentConcern/${now}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`StudentConcern/${now}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.attachFile = url;
            }
          });
        })
      )
      .subscribe(() => {
        }, error => {
        }, () => {
        }
      );
  }

  onSubmit() {
    const reviewDto = this.reviewForm.value;
    this.review = {
      title: reviewDto.title,
      content: reviewDto.content,
      progressReview: reviewDto.progressReview,
      teacherCode: this.tokenStorageService.getUser().username
    };
    console.log('dasdasdasd' + this.review.teacherCode);
    console.log('this.gif do' + reviewDto);
    this.progressService.addNewReview(this.review).subscribe(() => {
      this.showSuccessReview();
      // @ts-ignore
      window.location.reload();
    });
  }

  addNewReviewForm() {
    this.reviewForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(5)]),
      content: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(250)]),
      progressReview: new FormControl(0, [Validators.required]),
      teacherCode: new FormControl('')
    });
  }

  getAllReview() {
    this.progressService.getAllReview().subscribe(result => {
      this.reviewList = result;
    });
  }

  showSuccess() {
    this.toastService.success('', 'Thành công !');
  }

  showSuccessReview() {
    this.toastService.success('Thành công !', 'Tạo đánh giá thành công');
  }

  get title() {
    return this.reviewForm.get('title');
  }

  get content() {
    return this.reviewForm.get('content');
  }

  get progressReview() {
    return this.reviewForm.get('progressReview');
  }
}

