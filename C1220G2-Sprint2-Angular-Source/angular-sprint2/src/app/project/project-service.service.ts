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

  findSearch(name: string, content: string, deadline: string): Observable<Project[]> {
    console.log(this.URL + '/' + 'search' + '?' + 'name=' + name + '&content=' + content
      + '&deadline=' + deadline );
    return this.http.get<Project[]>(this.URL + '/' + 'search' + '?' + 'name=' + name + '&content=' + content
      + '&deadline=' + deadline);
  }
}
