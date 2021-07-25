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
  public reviewForm: FormGroup;

  constructor(private progressService: ProgressService) {
  }

  ngOnInit(): void {
    this.getAllStudentDto();
  }

  getAllStudentDto() {
    this.progressService.getAllStudentDto().subscribe(result => {
      this.studentList = result;
    });
  }
  addNewReview(){
    this.reviewForm = new FormGroup({
     title: new FormControl(),

    });
  }
}
