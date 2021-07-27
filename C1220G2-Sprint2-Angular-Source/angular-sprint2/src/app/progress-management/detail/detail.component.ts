import {Component, Input, OnInit} from '@angular/core';
import {StudentDto} from '../student-dto';
import {ProgressService} from '../progress.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ReviewDto} from '../review-dto';
import {TokenStorageService} from '../../security/token-storage.service';
import {ProjectDto} from '../project-dto';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  studentList: StudentDto[];
  username: string;
  userImage: string;
  projectId: number;
  name: string;
  reviewForm: FormGroup;
  p = 25;
  reviewList: ReviewDto[];
  isLoggedIn = false;
  review: ReviewDto;
  projectDto: ProjectDto;
  accountName: string;
  isTeacherLogin = false;

  constructor(private progressService: ProgressService, private router: Router,
              private activatedRoute: ActivatedRoute, private toastrService: ToastrService,
              private tokenStorageService: TokenStorageService
  ) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.projectId = +paramMap.get('id');
    });
  }

  ngOnInit(): void {
    this.getAllStudentDto();
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
      console.log('hello teacher' + this.isTeacherLogin);
    }
    this.progressService.getProjectById(this.projectId).subscribe(result => {
      this.projectDto = result;
    });
    console.log('hello------------- ' + this.projectDto);
  }

  getAllStudentDto() {
    this.progressService.getStudentOfGroup(this.projectId).subscribe(result => {
      this.studentList = result;
      console.log('this' + result);
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
      this.showSuccess();
      // @ts-ignore
      window.location.reload();
    });
  }

  getAllReview() {
    this.progressService.getAllReview().subscribe(result => {
      this.reviewList = result;
    });
  }

  showSuccess() {
    this.toastrService.success('Thành công !', 'Tạo đánh giá thành công');
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
