import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Project} from "../models/project";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {
  URL: string = 'http://localhost:8080/api/project';
  constructor(private http: HttpClient) {
  }
  findAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.URL);
  }
  findById(id: number): Observable<Project> {
    return this.http.get<Project>(this.URL + '/detail/'+ id);
  }
  findSearch(name: string, content: string, deadline: string): Observable<Project[]> {
    console.log(this.URL + '/' + 'search' + '?' + 'name=' + name + '&content=' + content
      + '&deadline=' + deadline );
    return this.http.get<Project[]>(this.URL + '/' + 'search' + '?' + 'name=' + name + '&content=' + content
      + '&deadline=' + deadline);
  }
  deleteProject(project: Project): Observable<void>{
    return this.http.put<void>(this.URL + '/' + project.id, project);
  }
  findProjectNeedAprrove(): Observable<Project[]>{
    return this.http.get<Project[]>(this.URL+'/'+'approve'+ '?'+'status=0')
  }
  approveProject(project: Project): Observable<void>{
    return this.http.put<void>(this.URL + '/'+ 'approve'+'/' + project.id, project);
  }
  notApproveProject(project: Project): Observable<void>{
    return this.http.put<void>(this.URL + '/'+ 'notApprove'+'/' + project.id, project);
  }
  searchProject(keyword: string): Observable<Project[]>{
    return this.http.get<Project[]>(this.URL+'/'+ 'search'+ '/'+keyword)
  }
}