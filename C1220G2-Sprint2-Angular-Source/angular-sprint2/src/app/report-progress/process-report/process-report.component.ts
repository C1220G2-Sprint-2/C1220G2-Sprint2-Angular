import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ReportServiceService} from '../report-service.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-process-report',
  templateUrl: './process-report.component.html',
  styleUrls: ['./process-report.component.css']
})
export class ProcessReportComponent implements OnInit {
  nameTopic: string;
  reportForm: FormGroup;
  name: string;
  stages: number = 0;
  @Input() backgroundColor: string = '#C2C2C2';

  constructor(private formBuilder: FormBuilder,
              private  reportService: ReportServiceService,
              private  router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.name = paramMap.get('name');
    });
  }

  ngOnInit(): void {
    console.log(this.stages);
    if (this.stages < 26) {
      this.backgroundColor = '#d91a37';
    } else if (this.stages < 86) {
      this.backgroundColor = '#103667';
    } else {
      this.backgroundColor = '#367517';
    }
  }

}
