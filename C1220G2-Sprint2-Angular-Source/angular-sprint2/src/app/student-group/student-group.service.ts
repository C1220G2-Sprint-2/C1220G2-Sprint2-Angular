import { Injectable } from '@angular/core';
import {StudentGroup} from "./student-group";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Project} from "../models/project";
import {Team} from "../models/team";

const API_URL = 'http://localhost:8080/api/team/';

@Injectable({
  providedIn: 'root'
})
export class StudentGroupService {

  constructor(private http:HttpClient) { }

  findAll():Observable<Team[]>{
    return this.http.get<Team[]>(API_URL+'list')
  }
  findById(id: number): Observable<Team> {
    return this.http.get<Team>(API_URL+id);
  }
  update(id: number , team:Team ):Observable<void>{
    return this.http.post<void>(API_URL+id,team);
  }
  // findAllStudentGroupById(id: number): Observable<string[]>{
  //   return this.http.get<string[]>(API_URL+'student/'+id)
  // }
  addId(id: Number):Observable<String[]>{
    return this.http.get<String[]>(API_URL+'student/'+id)
  }
}
