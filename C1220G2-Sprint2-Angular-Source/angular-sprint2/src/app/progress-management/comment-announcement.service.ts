import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommentAnnouncement} from '../models/comment-announcement';

const API_URL = `${environment.apiUrl}` + '/api/comment/announcement';

@Injectable({
  providedIn: 'root'
})

export class CommentAnnouncementService {

  constructor(private http: HttpClient) {
  }

  getAllComment(): Observable<CommentAnnouncement[]> {
    return this.http.get<CommentAnnouncement[]>(API_URL + '/comment-list');
  }

  saveComment(comment): Observable<CommentAnnouncement> {
    return this.http.post<CommentAnnouncement>(API_URL + '/comment-save', comment);
  }
}
