import { Component, OnInit } from '@angular/core';
import {AddNewService} from "../add-new.service";
import {Router} from "@angular/router";
import {ExcelService} from "../excel.service";
import {Student} from '../../model/student';

@Component({
  selector: 'app-add-new-student',
  templateUrl: './add-new-student.component.html',
  styleUrls: ['./add-new-student.component.scss']
})
export class AddNewStudentComponent implements OnInit {
  public iStudent: Student[]=[];
  public quantityRecord = 0;
  public studentIndex: number;
  public enable = false;
  constructor(public addNewService: AddNewService,
              public router: Router,
              public excelService: ExcelService) { }

  ngOnInit(): void {
  }

  onFileChange(evt: any) {
    this.enable = true;
    const target: DataTransfer = (evt.target) as DataTransfer;
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    console.log("filename", target.files[0]);
    reader.onload = (e: any) => {
      const resultFile: string = e.target.result;
      this.iStudent = this.excelService.importFromFile(resultFile) as any[];
      this.iStudent.forEach( () => {
        this.quantityRecord = this.quantityRecord + 1;
      });
    };
    reader.readAsBinaryString(target.files[0]);
  }

  acceptCreate() {
    this.addNewService.createStudent(this.iStudent).subscribe(() => {
      this.router.navigateByUrl('/hoc-sinh/danh-sach');
    });
  }

  deleteEmployeeUpload(index: number) {
    delete this.iStudent[index];
    this.quantityRecord = this.quantityRecord - 1;
    this.iStudent = this.iStudent.filter((value =>  Student));
  }

  getEmployeeIndex(index: number) {
    this.studentIndex = index;
  }

  reset() {
    this.router.navigateByUrl('/hoc-sinh/danh-sach');
  }

  load(){
    window.location.reload();
  }
}
