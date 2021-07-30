import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ReportProgress} from '../models/report-progress';
import {ReportHistory} from '../models/report-history';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<ReportProgress[]> {
    return this.httpClient.get<ReportProgress[]>(API_URL + '/api/report/list');
  }

  updateReport(id: number, report: ReportProgress): Observable<ReportProgress> {
    return this.httpClient.put<ReportProgress>(API_URL + '/api/report/' + id, report);
  }

  findById(id: number): Observable<ReportProgress> {
    return this.httpClient.get<ReportProgress>(API_URL + '/api/report/' + id);
  }

  getAllReportHistory(): Observable<ReportHistory[]> {
    return this.httpClient.get<ReportHistory[]>(API_URL + '/api/report/list-history');
  }

  getAllHistoryByReportId(id: number): Observable<ReportHistory[]> {
    return this.httpClient.get<ReportHistory[]>(API_URL + '/api/report/list-history/' + id);
  }
}
