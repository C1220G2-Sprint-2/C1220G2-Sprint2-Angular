import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReportServiceService} from '../report-service.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-process-report',
  templateUrl: './process-report.component.html',
  styleUrls: ['./process-report.component.css']
})
export class ProcessReportComponent implements OnInit {
  reportForm: FormGroup;
  name: string;
  stages: number;
  fileReport: string;
  downloadURL: Observable<string>;
  @Input() backgroundColor: string = '#C2C2C2';


  constructor(private formBuilder: FormBuilder,
              private  reportService: ReportServiceService,
              private  router: Router,
              private activatedRoute: ActivatedRoute,
              private storage: AngularFireStorage) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.name = paramMap.get('name');
    });

  }


  ngOnInit(): void {
    this.reportForm = this.formBuilder.group({
      name: [''],
      stage: [''],
      fileReport: ['', Validators.required],
      content: [''],
      enable: true
    });
  }

  onSubmit() {
    const report = this.reportForm.value;
    report.name = this.name;
    report.stage = this.stages;
    report.fileReport = this.fileReport;
    console.log(report.fileReport + ' aaa');

    this.reportService.saveReport(report).subscribe(() => {
      this.router.navigateByUrl('/quan-ly-tien-do/chi-tiet-tien-do/');
    });
  }


  value(event: Event) {
    this.stages = +(event.target as HTMLInputElement).value;
    if (this.stages < 26) {
      this.backgroundColor = 'red';
    } else if (this.stages < 86) {
      this.backgroundColor = 'blue';
    } else {
      this.backgroundColor = 'green';
    }
  }

  addFile(event: any) {
    const n = Date.now();
    const file = event.target.files[0];
    const filePath = `FileReport/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`FileReport/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize( ()=>{
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe( url =>{
            if (url){
              this.fileReport =url;
            }
          })
        })
      ).subscribe();
  }

  onBack() {
    this.router.navigateByUrl('/quan-ly-tien-do/chi-tiet-tien-do/');
  }
}
