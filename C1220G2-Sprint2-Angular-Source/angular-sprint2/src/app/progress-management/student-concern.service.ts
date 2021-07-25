import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StudentConcern} from '../models/student-concern';

const API_URL = `${environment.apiUrl}` + '/api';


@Injectable({
  providedIn: 'root'
})
export class StudentConcernService {

  constructor(private http: HttpClient) {
  }

  getAllStudentConcern(): Observable<StudentConcern[]> {
    return this.http.get<StudentConcern[]>(API_URL + '/student-concern-list');
  }

  saveStudentConcern(concern): Observable<StudentConcern> {
    return this.http.post<StudentConcern>(API_URL + '/student-concern-save', concern);
  }
}

