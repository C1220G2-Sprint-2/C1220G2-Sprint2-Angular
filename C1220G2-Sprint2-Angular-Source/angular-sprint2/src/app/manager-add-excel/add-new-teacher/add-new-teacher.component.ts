import {Component, OnInit} from '@angular/core';
import {AddNewService} from "../add-new.service";
import {Router} from "@angular/router";
import {ExcelService} from "../excel.service";
import {Teacher} from '../../models/teacher';
import {Education} from '../../models/education';
import {Subscription} from 'rxjs';
import {TeacherService} from '../../teacher/teacher.service';
import {TokenStorageService} from '../../security/token-storage.service';
import {CheckLoggedInService} from '../check-logged-in.service';

@Component({
  selector: 'app-add-new-teacher',
  templateUrl: './add-new-teacher.component.html',
  styleUrls: ['./add-new-teacher.component.scss']
})
export class AddNewTeacherComponent implements OnInit {
  educationList: Education[] = [];
  subscription: Subscription;
  public iTeacher: Teacher[];
  public quantityRecord = 0;
  public studentIndex: number;
  flagLoading: boolean = false;
  isLoggedIn: boolean;
  roles =[];

  constructor(public addNewService: AddNewService,private teacherService: TeacherService,
              public router: Router,
              public excelService: ExcelService,
              private checkLoggedInService: CheckLoggedInService) {
    this.roles = checkLoggedInService.check();

  }

  ngOnInit(): void {
    this.loadListEducation();
  }

  onFileChange(evt: any) {
    this.flagLoading = true;
    const target: DataTransfer = (evt.target) as DataTransfer;
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const resultFile: string = e.target.result;
      this.iTeacher = this.excelService.importFromFile(resultFile) as any[];
      this.iTeacher.forEach(value => {
        this.quantityRecord = this.quantityRecord + 1;
      });

    };
    reader.readAsBinaryString(target.files[0]);
  }

  acceptCreate() {
    this.addNewService.createTeacher(this.iTeacher).subscribe(() => {
      this.router.navigateByUrl('/giang-vien/danh-sach');
    });
  }

  deleteEmployeeUpload(index: number) {
    delete this.iTeacher[index];
    this.quantityRecord = this.quantityRecord - 1;
    this.iTeacher = this.iTeacher.filter((value => Teacher));
  }

  getEmployeeIndex(index: number) {
    this.studentIndex = index;
  }

  backList() {
    this.router.navigateByUrl('/giang-vien/danh-sach');
  }

  load() {
    window.location.reload();
  }

  loadListEducation() {
    this.subscription = this.teacherService.getAllEducation().subscribe(
      value => {
        if (value == null) {
          this.educationList = [];
        } else {
          this.educationList = value;
        }
      }
    );
  }
}
