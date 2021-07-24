import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URL = 'http://localhost:8080/api/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'my-auth-token'
    }),
  };
  constructor(private httpClient: HttpClient) { }

  public listStudent(): Observable<any[]> {
    return this.httpClient.get<any[]>(API_URL + '/listStudent', this.httpOptions);
  }

  public listCategory(): Observable<any[]> {
    return this.httpClient.get<any[]>(API_URL + '/listCategory', this.httpOptions);
  }

  public listTeacher(): Observable<any[]> {
    return this.httpClient.get<any[]>(API_URL + '/listTeacher', this.httpOptions);
  }

  public listProject(): Observable<any[]> {
    return this.httpClient.get<any[]>(API_URL + '/listProject', this.httpOptions);
  }

  public postTeam(team: any): Observable<any> {
    return this.httpClient.post<any>(API_URL + '/postTeam', team, this.httpOptions);
  }

}
