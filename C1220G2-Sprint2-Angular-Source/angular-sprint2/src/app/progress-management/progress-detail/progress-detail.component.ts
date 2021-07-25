import {Component, OnInit} from '@angular/core';
import {StudentDto} from '../student-dto';
import {ProgressService} from '../progress.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-progress-detail',
  templateUrl: './progress-detail.component.html',
  styleUrls: ['./progress-detail.component.css']
})
export class ProgressDetailComponent implements OnInit {
  studentList: StudentDto[];
  reviewForm: FormGroup;

  constructor(private progressService: ProgressService) {
  }

  ngOnInit(): void {
    this.getAllStudentDto();
    this.addNewReviewForm();
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
}
