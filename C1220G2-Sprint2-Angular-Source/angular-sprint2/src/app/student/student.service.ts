import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Student} from "../model/student";
import {Class} from "../model/class";
import {Faculty} from "../model/faculty";
import {catchError} from 'rxjs/operators';

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
    return this.http.post<void>(this.URL, student).pipe(catchError(this.handleError));
  }
  findById(code: string): Observable<Student>{
    return this.http.get<Student>(this.URL + '/'+ code).pipe(catchError(this.handleError));
  }

  edit(student: Student): Observable<void>{
    return this.http.put<void>(this.URL + '/' + student.code, student).pipe(catchError(this.handleError));
  }
  delete(code: string): Observable<void>{
    return this.http.delete<void>(this.URL +'/'+ code).pipe(catchError(this.handleError));
  }
  block(code: string, name:string, team: string): Observable<void>{
    return this.http.delete<void>(this.URL +'/block/'+ code +'/' + name + '/'+ team).pipe(catchError(this.handleError));
  }
  findAllClass(): Observable<Class[]> {
    return this.http.get<Class[]>(this.URL + '/class');
  }
  findAllFaculty(): Observable<Faculty[]> {
    return this.http.get<Faculty[]>(this.URL + '/faculty');
  }


  // CongNT
  // authorization
  private handleError(httpError: HttpErrorResponse) {
    let message = '';
    if (httpError.error instanceof ProgressEvent) {
      console.log('in progrss event');
      message = 'lỗi mạng';
    } else {
      message = JSON.parse(httpError.error).message;
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `lỗi server ${httpError.status}, ` +
        `body was: ${httpError.error}`);
    }

    // Return an observable with a user-facing error message.
    return throwError(
      'Bạn không đủ quyền để truy cập vào trang này ' + message);
  }
}

