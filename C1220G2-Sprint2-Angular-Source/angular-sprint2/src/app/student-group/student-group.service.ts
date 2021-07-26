import { Injectable } from '@angular/core';
import {StudentGroup} from "./student-group";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class StudentGroupService {
  API_URL = 'http://localhost:8080/productList/';

  constructor(private http:HttpClient) { }

  findAll():Observable<StudentGroup[]>{
    return this.http.get<StudentGroup[]>(this.API_URL)
  }
  findById(id: number): Observable<StudentGroup> {
    return this.http.get<StudentGroup>(this.API_URL+id);
  }
  delete(id: number):Observable<void>{
    return this.http.delete<void>(this.API_URL+id)
  }
}
