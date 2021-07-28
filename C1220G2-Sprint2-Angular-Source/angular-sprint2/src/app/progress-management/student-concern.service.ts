import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StudentConcern} from '../models/student-concern';

const API_URL = `${environment.apiUrl}` + '/api/concern';

@Injectable({
  providedIn: 'root'
})
export class StudentConcernService {

  constructor(private http: HttpClient) {
  }

  saveStudentConcern(concern): Observable<StudentConcern> {
    return this.http.post<StudentConcern>(API_URL + '/student-concern-save', concern);
  }

  getAllStudentConcern(noOfRecord: number): Observable<StudentConcern[]> {
    return this.http.get<StudentConcern[]>(API_URL + '/student-concern-list/' + noOfRecord)
  }
  getMaxSizeConcern(): Observable<number> {
    return this.http.get<number>(API_URL + '/list-size')
  }
}
