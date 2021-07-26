import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {PasswordDto} from '../models/password-dto';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SecurityServiceService {
  private API_URL = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }

  changePassword(userCode: string,passwordDto: PasswordDto): Observable<void>{
    return this.http.patch<void>(this.API_URL + '/user-change-password/'+ userCode, passwordDto).pipe(catchError(this.handleError))
  }





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
