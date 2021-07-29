import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student} from "../model/student";
import {Class} from "../model/class";
import {Faculty} from "../model/faculty";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  URL: string = 'http://localhost:8080/api/student';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.URL+'/student');
  }
  findSearch(keyword: string): Observable<Student[]> {

    return this.http.get<Student[]>(this.URL + '/' + 'search' + '?' + 'keyword=' + keyword);
  }

  create(student: Student): Observable<void> {
    return this.http.post<void>(this.URL, student);
  }
  findById(code: string): Observable<Student>{
    return this.http.get<Student>(this.URL + '/'+ code);
  }

  edit(student: Student): Observable<void>{
    return this.http.put<void>(this.URL + '/' + student.code, student);
  }
  delete(code: string): Observable<void>{
    return this.http.delete<void>(this.URL +'/'+ code);
  }
  block(code: string, name:string, team: string): Observable<void>{
    return this.http.delete<void>(this.URL +'/block/'+ code +'/' + name + '/'+ team);
  }
  findAllClass(): Observable<Class[]> {
    return this.http.get<Class[]>(this.URL + '/class');
  }
  findAllFaculty(): Observable<Faculty[]> {
    return this.http.get<Faculty[]>(this.URL + '/faculty');
  }
}

