import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommentConcern} from '../models/comment-concern';

const API_URL = `${environment.apiUrl}` + '/api/comment/concern';

@Injectable({
  providedIn: 'root'
})
export class CommentConcernService {

  constructor(private http: HttpClient) {
  }

  getAllComment(): Observable<CommentConcern[]> {
    return this.http.get<CommentConcern[]>(API_URL + '/comment-list');
  }

  saveComment(comment): Observable<CommentConcern> {
    return this.http.post<CommentConcern>(API_URL + '/comment-save', comment);
  }
}
