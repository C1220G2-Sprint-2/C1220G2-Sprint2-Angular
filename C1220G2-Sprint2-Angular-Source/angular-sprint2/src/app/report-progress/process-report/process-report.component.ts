import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReportServiceService} from '../report-service.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {ReportProgress} from '../../models/report-progress';
import {ProjectDto} from '../../progress-management/project-dto';
import {ProgressService} from '../../progress-management/progress.service';
import {TokenStorageService} from '../../security/token-storage.service';
import {ReportHistory} from '../../models/report-history';

@Component({
  selector: 'app-process-report',
  templateUrl: './process-report.component.html',
  styleUrls: ['./process-report.component.css']
})
export class ProcessReportComponent implements OnInit {
  reportForm: FormGroup;
  projectId: number;
  fileReport: string;
  downloadURL: Observable<string>;
  @Input() backgroundColor: string = '#C2C2C2';
  projectDto: ProjectDto;
  reportId: number;
  reportDto: ReportProgress;
  reportHistoryList: ReportHistory[] = [];


  constructor(private formBuilder: FormBuilder,
              private  reportService: ReportServiceService,
              private  router: Router,
              private activatedRoute: ActivatedRoute,
              private storage: AngularFireStorage,
              private progressService: ProgressService,
              private tokenStorageService: TokenStorageService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.projectId = +paramMap.get('id1');
      this.reportId = +paramMap.get('id2');
      this.getReport(this.reportId);
    });
  }


  ngOnInit(): void {
    this.getProjectDto();
    this.getAllHistoryByReportId(this.reportId);
  }

  getReport(id: number) {
    return this.reportService.findById(id).subscribe(report => {
      this.reportDto = report;
      this.reportForm = this.formBuilder.group({
        id: [report.id],
        name: [report.name],
        stage: [report.stage],
        fileReport: [''],
        content: [''],
        enable: true,
        projectId: [this.projectId],
        userId: [this.tokenStorageService.getUser().id],
      });
    });
  }


  onSubmit() {
    const report = this.reportForm.value;
    console.log(this.reportForm.value + 'Hello');
    report.fileReport = this.fileReport;
    report.projectId = this.projectDto.id;
    report.userId = this.tokenStorageService.getUser().id;
    this.reportService.updateReport(this.reportId, report).subscribe(() => {
      this.router.navigate(['/quan-ly-tien-do/chi-tiet-tien-do', this.projectId]);
    });
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
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fileReport = url;
            }
          });
        })
      ).subscribe();
  }

  onBack() {
    this.router.navigate(['/quan-ly-tien-do/chi-tiet-tien-do', this.projectId]);
  }

  getProjectDto() {
    this.progressService.getProjectById(this.projectId).subscribe(result => {
      this.projectDto = result;
    });
  }

  getAllHistoryByReportId(id: number) {
    this.reportService.getAllHistoryByReportId(id).subscribe(history=>{
      this.reportHistoryList = history;
    });
  }

}
