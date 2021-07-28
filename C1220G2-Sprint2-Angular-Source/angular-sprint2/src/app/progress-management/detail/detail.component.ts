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
import {CommentConcern} from '../../models/comment-concern';
import {CommentAnnouncement} from '../../models/comment-announcement';
import {CommentConcernService} from '../comment-concern.service';
import {CommentAnnouncementService} from '../comment-announcement.service';
import {ReviewDto} from "../review-dto";
import { ProjectDto } from '../project-dto';

import Swal from 'sweetalert2';


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
  announcementCommentList: CommentAnnouncement[];
  concernCommentList: CommentConcern[];
  commentOfConcern: CommentConcern;
  commentOfAnnouncement: CommentAnnouncement;
  avatar: string;
  downloadURL: Observable<string>;
  attachFile: string;
  isLoggedIn = false;
  isTeacherLogging = false;
  username: string;
  currentUsername: string;
  commentConcernForm: FormGroup;
  commentAnnouncementForm: FormGroup;
  concernId: number;
  announcementId: number;
  fileName: string;
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
              private commentConcernService: CommentConcernService,
              private commentAnnouncementService: CommentAnnouncementService,
              private router: Router,
              private tokenStorageService: TokenStorageService,
              private storage: AngularFireStorage,
              private toastService: ToastrService,) {
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
    this.addNewAnnouncementCommentForm();
    this.addNewConcernCommentForm();
    this.getAnnouncementList();
    this.getConcernList();
    this.getAnnouncementComment();
    this.getConcernComment();
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;


      if (this.username.substring(0,2) == "GV") {
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
      title: new FormControl('', [Validators.required, Validators.maxLength(100),
      Validators.minLength(6)]),
      content: new FormControl('', [Validators.required,Validators.maxLength(500),
        Validators.minLength(10)]),
      attachedFile: new FormControl('')
    });
  }

  submitConcern() {
    const concern = this.concernForm;
    this.studentConcern = {
      title: concern.value.title,
      content: concern.value.content,
      attachFile: this.attachFile,
      studentCode: this.tokenStorageService.getUser().username,
      avatar: this.avatar,
      name: this.currentUsername
    };
    console.log(this.studentConcern);
    this.studentConcernService.saveStudentConcern(this.studentConcern).subscribe(() => {
      console.log('Create concern successful !');
      this.showSuccess();
    }, e => {
      console.log('Create concern failed !');
    }, () => {
      this.getConcernList();
    });
  }

  getConcernList() {
    this.studentConcernService.getAllStudentConcern().subscribe(concern => {
      this.concernList = concern;
      console.log('Get list concern success !');
    }, e => {
      console.log('Get list concern failed !');
    });
  }

  addNewAnnouncementForm() {
    this.announcementForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(100),
        Validators.minLength(6)]),
      content: new FormControl('', [Validators.required,Validators.maxLength(500),
        Validators.minLength(10)]),
      attachedFile: new FormControl('')
    });
  }

  getAnnouncementList() {
    this.announcementService.getAllAnnouncement().subscribe(announcement => {
      this.announcementList = announcement;
      console.log('Get list announcement success !');
    }, e => {
      console.log('Get list announcement failed !');
    });
  }

  submitAnnouncement() {
    const announcement = this.announcementForm;
    this.teacherAnnouncement = {
      title: announcement.value.title,
      content: announcement.value.content,
      attachFile: this.attachFile,
      teacherCode: this.tokenStorageService.getUser().username,
      avatar: this.avatar,
      name: this.currentUsername
    };
    console.log(this.teacherAnnouncement);
    this.announcementService.saveAnnouncement(this.teacherAnnouncement).subscribe(() => {
      console.log('Create announcement successful !');
      this.showSuccess();
    }, e => {
      console.log('Create announcement failed !');
    }, () => {
      this.getAnnouncementList();
    });
  }

  addNewAnnouncementCommentForm() {
    this.commentAnnouncementForm = new FormGroup({
      content: new FormControl('', [Validators.required, Validators.minLength(6),
        Validators.maxLength(100)]),
      attachedFile: new FormControl('')
    });
  }

  getAnnouncementComment() {
    this.commentAnnouncementService.getAllComment().subscribe(comment => {
      this.announcementCommentList = comment;
      console.log('Get list announce comment success !');
    }, e => {
      console.log('Get list announce comment failed !');
    });
  }

  submitAnnouncementComment() {
    const announcementComment = this.commentAnnouncementForm;
    if (this.tokenStorageService.getUser().username.charAt(0) == "S") {
      this.commentOfAnnouncement = {
        content: announcementComment.value.content,
        attachFile: this.attachFile,
        studentCode: this.tokenStorageService.getUser().username,
        avatar: this.avatar,
        name: this.currentUsername,
        announcementId: this.announcementId
      };
    } else if (this.tokenStorageService.getUser().username.charAt(0) == "G") {
      this.commentOfAnnouncement = {
        content: announcementComment.value.content,
        attachFile: this.attachFile,
        teacherCode: this.tokenStorageService.getUser().username,
        avatar: this.avatar,
        name: this.currentUsername,
        announcementId: this.announcementId
      };
    }
    console.log(this.commentOfAnnouncement);
    this.commentAnnouncementService.saveComment(this.commentOfAnnouncement).subscribe(() => {
      console.log('Create announcement comment successful !');
      this.showSuccess();
    }, e => {
      console.log('Create announcement comment failed !');
    }, () => {
      this.getConcernList();
    });
  }

  addNewConcernCommentForm() {
    this.commentConcernForm = new FormGroup({
      content: new FormControl('', [Validators.required, Validators.minLength(6),
        Validators.maxLength(100)]),
      attachedFile: new FormControl('')
    });
  }

  getConcernComment() {
    this.commentConcernService.getAllComment().subscribe(comment => {
      this.concernCommentList = comment;
      console.log('Get list concern success !');
    }, e => {
      console.log('Get list concern failed !');
    });
  }

  submitConcernComment() {
    const concernComment = this.commentConcernForm;
    if (this.tokenStorageService.getUser().username.charAt(0) == "S") {
      this.commentOfConcern = {
        content: concernComment.value.content,
        attachFile: this.attachFile,
        studentCode: this.tokenStorageService.getUser().username,
        avatar: this.avatar,
        name: this.currentUsername,
        concernId: this.concernId
      };
    } else if (this.tokenStorageService.getUser().username.charAt(0) == "G") {
      this.commentOfConcern = {
        content: concernComment.value.content,
        attachFile: this.attachFile,
        teacherCode: this.tokenStorageService.getUser().username,
        avatar: this.avatar,
        name: this.currentUsername,
        concernId: this.concernId
      };
    }
    console.log(this.commentOfConcern);
    this.commentConcernService.saveComment(this.commentOfConcern).subscribe(() => {
      console.log('Create concern comment successful !');
      this.showSuccess();
    }, e => {
      console.log('Create concern comment failed !');
    }, () => {
      this.getConcernList();
    });
  }

  sendConcernId(id) {
    this.concernId = id;
  }

  sendAnnouncementId(id) {
    this.announcementId = id;
  }

  addFile(event: any) {
    this.uploading();
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


  uploading() {
    let timerInterval;
    Swal.fire({
      title: 'Đang tải lên ...',
      html: 'Thời gian chờ <b></b> giây.',
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {
          const content = Swal.getHtmlContainer();
          if (content) {
            const b = content.querySelector('b');
            if (b) {
              // @ts-ignore
              b.textContent = Swal.getTimerLeft();
            }
          }
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer');
      }
    });
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

