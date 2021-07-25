import {Component, OnInit} from '@angular/core';
import {StudentDto} from '../student-dto';
import {ProgressService} from '../progress.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
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
