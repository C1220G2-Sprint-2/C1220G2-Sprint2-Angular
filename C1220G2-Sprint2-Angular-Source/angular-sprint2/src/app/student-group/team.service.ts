import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Project} from "../models/project";
import {Team} from "../models/team";

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

  // public ListTeam():Observable<Team[]>{
  //   return this.httpClient.get<Team[]>(API_URL+'/list')
  // }
}
