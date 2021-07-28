import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Announcement} from '../models/announcement';

const API_URL = `${environment.apiUrl}` + '/api/announcement';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor(private http: HttpClient) {
  }

  getAllAnnouncement(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(API_URL + '/announcement-list');
  }

  saveAnnouncement(announcement): Observable<Announcement> {
    return this.http.post<Announcement>(API_URL + '/announcement-save', announcement);
  }
}
