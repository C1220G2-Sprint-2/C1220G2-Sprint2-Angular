import {Component, OnInit} from '@angular/core';
import {StudentDto} from '../student-dto';
import {ProgressService} from '../progress.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StudentConcern} from '../../models/student-concern';
import {StudentConcernService} from '../student-concern.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-progress-detail',
  templateUrl: './progress-detail.component.html',
  styleUrls: ['./progress-detail.component.css']
})
export class ProgressDetailComponent implements OnInit {
  studentList: StudentDto[];
  reviewForm: FormGroup;
  concernForm: FormGroup;
  studentConcern: StudentConcern;

  constructor(private progressService: ProgressService,
              private studentConcernService: StudentConcernService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAllStudentDto();
    this.addNewReviewForm();
    this.addNewConcernForm();
  }

  getAllStudentDto() {
    this.progressService.getAllStudentDto().subscribe(result => {
      this.studentList = result;
      console.log('this' + result);
    });
  }

  addNewReviewForm() {
    this.reviewForm = new FormGroup(
      {
        title: new FormControl(''),
        content: new FormControl(''),
        progressReview: new FormControl(''),
        teacherCode: new FormControl('TC00001')
      }
    );
  }

  onSubmit() {
    const reviewDto = this.reviewForm.value;
    this.progressService.addNewReview(reviewDto).subscribe();
  }

//  CODE FROM DONGTHG

  addNewConcernForm() {
    this.concernForm = new FormGroup( {
      title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      content: new FormControl('', Validators.required),
      attachedFile: new FormControl('', Validators.required)
    });
  }

  submitConcern() {
    const studentConcern = this.concernForm;
    this.studentConcernService.saveStudentConcern(studentConcern).subscribe(() => {
      console.log('Create successful !');
    }, e => {
      console.log('Failed !');
    }, () => {
      this.router.navigateByUrl('quan-ly-tien-do/chi-tiet-tien-do');
    });
  }
}
