import {Component, OnInit} from '@angular/core';
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

  constructor(private formBuilder: FormBuilder,
              private  reportService: ReportServiceService,
              private  router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.name = paramMap.get('name');
    });
  }

  ngOnInit(): void {
  }

}
