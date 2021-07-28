import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Teacher} from '../models/teacher';
import {Faculty} from '../models/faculty';
import {Education} from '../models/education';
import {ProjectDto} from '../models/project-dto';

@Injectable()
export class TeacherService {

  API_URL: string = 'http://localhost:8080/api/teacher/';

  constructor(private http: HttpClient) { }

  getAllTeacher(): Observable<Teacher[]> {
    console.log(this.API_URL + 'list-teacher');
    return this.http.get<Teacher[]>(this.API_URL + 'list-teacher');
  }

  getAllFaculty(): Observable<Faculty[]> {
    return this.http.get<Faculty[]>(this.API_URL + 'list-faculty');
  }

  getAllEducation(): Observable<Education[]> {
    return this.http.get<Education[]>(this.API_URL + 'list-education');
  }

  createTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(this.API_URL+"create-teacher",teacher);
  }

  getTeacherByCode(code: string): Observable<Teacher>{
    return this.http.get<Teacher>(this.API_URL+"detail-teacher/"+code);
  }

  editTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(this.API_URL+"edit-teacher",teacher);
  }

  searchTeacher(keyWord: string): Observable<Teacher[]>{
    return this.http.get<Teacher[]>(this.API_URL+"search?keyWord="+keyWord);
  }

  checkDelete(code:string): Observable<ProjectDto[]>{
    return this.http.get<ProjectDto[]>(this.API_URL+"checkDelete?code="+code)
  }

  delete(code: string): Observable<Teacher>{
    return this.http.delete<Teacher>(this.API_URL+"delete/"+code)
  }
}
