import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
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
  addId(id: Number,date: string):Observable<string[]>{
    return this.http.get<string[]>(API_URL+'student?id='+id+'&date='+date)
  }
  searchAll(search: string): Observable<Team[]> {
    return this.http.get<Team[]>(API_URL+'search?search='+search)
  }
}
