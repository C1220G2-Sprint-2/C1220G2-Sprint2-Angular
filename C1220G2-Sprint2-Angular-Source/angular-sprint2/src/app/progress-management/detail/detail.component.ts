import {Component, Input, OnInit} from '@angular/core';
import {StudentDto} from '../student-dto';
import {ProgressService} from '../progress.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StudentConcern} from '../../models/student-concern';
import {StudentConcernService} from '../student-concern.service';
import {TokenStorageService} from '../../security/token-storage.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Announcement} from '../../models/announcement';
import {AnnouncementService} from '../announcement.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  studentList: StudentDto[];
  name: string;
  concernForm: FormGroup;
  announcementForm: FormGroup;
  studentConcern: StudentConcern;
  teacherAnnouncement: Announcement;
  concernList: StudentConcern[];
  announcementList: Announcement[];
  studentAvatar: string;
  downloadURL: Observable<string>;
  attachFile: string;

  constructor(private progressService: ProgressService,
              private activatedRoute: ActivatedRoute,
              private studentConcernService: StudentConcernService,
              private announcementService: AnnouncementService,
              private router: Router,
              private tokenStorageService: TokenStorageService,
              private storage: AngularFireStorage) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.name = paramMap.get('name');
    });
  }

  ngOnInit(): void {
    this.studentAvatar = this.tokenStorageService.getUser().avatar;
    this.getAllStudentDto();
    this.getAnnouncementList();
    this.addNewConcernForm();
    this.addNewAnnouncementForm()
    this.getConcernList();
  }

  getAllStudentDto() {
    this.progressService.getAllStudentDto().subscribe(result => {
      this.studentList = result;
      console.log('this' + result);
    });
  }

  //  CODE FROM DONGTHG

  addNewConcernForm() {
    this.concernForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      content: new FormControl('', Validators.required),
      attachedFile: new FormControl('', Validators.required)
    });
  }

  submitConcern() {
    const concern = this.concernForm;
    this.studentConcern = {
      title: concern.value.title,
      content: concern.value.content,
      attachFile: this.attachFile,
      studentCode: this.tokenStorageService.getUser().username
    };
    this.studentConcernService.saveStudentConcern(this.studentConcern).subscribe(() => {
      console.log('Create successful !');
    }, e => {
      console.log('Failed !');
    }, () => {
      this.getConcernList();
    });
  }

  getConcernList() {
    this.studentConcernService.getAllStudentConcern().subscribe(concern => {
      this.concernList = concern;
      console.log('Get list success !');
    }, e => {
      console.log('Get list failed !');
    });
  }

  addNewAnnouncementForm() {
    this.announcementForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      content: new FormControl('', Validators.required),
      attachedFile: new FormControl('', Validators.required)
    });
  }

  getAnnouncementList() {
    this.announcementService.getAllAnnouncement().subscribe(announcement => {
      this.announcementList = announcement;
      console.log('Get list success !');
    }, e => {
      console.log('Get list failed !');
    });
  }

  submitAnnouncement() {
    const announcement = this.concernForm;
    this.teacherAnnouncement = {
      title: announcement.value.title,
      content: announcement.value.content,
      attachFile: this.attachFile,
      teacherCode: this.tokenStorageService.getUser().username
    };
    this.announcementService.saveAnnouncement(this.teacherAnnouncement).subscribe(() => {
      console.log('Create successful !');
    }, e => {
      console.log('Failed !');
    }, () => {
      this.getConcernList();
    });
  }

  addFile(event: any) {
    const now = Date.now();
    const file = event.target.files[0];
    const filePath = `StudentConcern/${now}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`StudentConcern/${now}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.attachFile = url;
            }
          });
        })
      )
      .subscribe(() => {
        }, error => {
        }, () => {
        }
      );
  }
}

