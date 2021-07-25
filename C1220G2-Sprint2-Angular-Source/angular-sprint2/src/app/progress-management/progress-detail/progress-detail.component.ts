import {Component, OnInit} from '@angular/core';
import {StudentDto} from '../student-dto';
import {ProgressService} from '../progress.service';

@Component({
  selector: 'app-progress-detail',
  templateUrl: './progress-detail.component.html',
  styleUrls: ['./progress-detail.component.css']
})
export class ProgressDetailComponent implements OnInit {
  studentList: StudentDto[];

  constructor(private progressService: ProgressService) {
  }

  ngOnInit(): void {
    this.getAllStudentDto();
  }

  getAllStudentDto() {
    this.progressService.getAllStudentDto().subscribe(result => {
      this.studentList = result;
      console.log('this' + result);
    });
  }
}
