import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URLPROJECT = 'http://localhost:8080/api/project';

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
    return this.httpClient.get<any[]>(API_URLPROJECT + '/listStudent', this.httpOptions);
  }

  public listCategory(): Observable<any[]> {
    return this.httpClient.get<any[]>(API_URLPROJECT + '/listCategory', this.httpOptions);
  }

  public listTeacher(): Observable<any[]> {
    return this.httpClient.get<any[]>(API_URLPROJECT + '/listTeacher', this.httpOptions);
  }

  public listProject(): Observable<any[]> {
    return this.httpClient.get<any[]>(API_URLPROJECT + '/listProject', this.httpOptions);
  }

  public postTeam(team: any): Observable<any> {
    return this.httpClient.post<any>(API_URLPROJECT + '/postTeam', team, this.httpOptions);
  }

  public getStudent(code:string):  Observable<any> {
    return this.httpClient.get<any>(API_URLPROJECT + '/student?codeStudent='+code, this.httpOptions);
  }

  public findByTeam(id:any):  Observable<any> {
    return this.httpClient.get<any>(API_URLPROJECT + '/findByTeam?teamId='+id, this.httpOptions);
  }

  postProject(project: any): Observable<any> {
    return this.httpClient.post<any>(API_URLPROJECT + '/postProject', project, this.httpOptions);
  }

  searchTeamRegistration(searchStudent: string):Observable<any[]> {
    return this.httpClient.get<any>(API_URLPROJECT + '/searchTeamRegistration?search='+searchStudent, this.httpOptions);
  }
}
