import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryStatistic } from 'src/app/models/category-statistic.model';
import { TeacherStatistic } from 'src/app/models/teacher-statistic.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  apiUrl: string = "http://localhost:8080";

  constructor( private httpClient: HttpClient ) { }

  getTeacherStatistic(): Observable<TeacherStatistic[]> {
    return this.httpClient.get<TeacherStatistic[]>(this.apiUrl + "/teacher-statistic");
  }

  getNumberOfTeachers(): Observable<number> {
    return this.httpClient.get<number>(this.apiUrl + "/teacher-statistic/number-of-teachers");
  }

  getCategoryStatistic(): Observable<CategoryStatistic[]> {
    return this.httpClient.get<CategoryStatistic[]>(this.apiUrl + "/category-statistic");
  }

  getNumberOfPassedProjects(): Observable<number> {
    return this.httpClient.get<number>(this.apiUrl + "/category-statistic/passed-projects");
  }

  getNumberOfPendingProjects(): Observable<number> {
    return this.httpClient.get<number>(this.apiUrl + "/category-statistic/pending-projects");
  }
}
