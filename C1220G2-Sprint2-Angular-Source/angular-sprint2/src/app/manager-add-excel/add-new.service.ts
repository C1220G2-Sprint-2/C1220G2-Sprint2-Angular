import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student} from '../model/student';
import {Teacher} from '../models/teacher';


@Injectable({
  providedIn: 'root'
})
export class AddNewService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,PATCH'
  };
  private apiStudentAndTeacherUrl = 'http://localhost:8080/api/teacher-student/';

  constructor(private httpClient: HttpClient) {
  }

  createStudent(student): Observable<Student> {
    return this.httpClient.post<Student>(this.apiStudentAndTeacherUrl + 'create-student', student, this.httpOptions)

  }

  createTeacher(teacher): Observable<Teacher> {
    return this.httpClient.post<Teacher>(this.apiStudentAndTeacherUrl + 'create-teacher', teacher, this.httpOptions)

  }

}
