import {Component, Input, OnInit} from '@angular/core';
import {StudentDto} from '../student-dto';
import {ProgressService} from '../progress.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  studentList: StudentDto[];
   name:string;

  constructor(private progressService: ProgressService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap:ParamMap)=>{
      this.name = paramMap.get('name');
    });
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
