import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ReportProgress} from '../models/report-progress';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<ReportProgress[]> {
    return this.httpClient.get<ReportProgress[]>(API_URL + '/api/report/');
  }

  saveReport(report: ReportProgress): Observable<ReportProgress> {
    return this.httpClient.post<ReportProgress>(API_URL + '/api/report', report);
  }
}
