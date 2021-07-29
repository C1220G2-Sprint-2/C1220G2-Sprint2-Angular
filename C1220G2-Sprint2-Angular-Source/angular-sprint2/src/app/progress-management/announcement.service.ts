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

  getAllAnnouncement(noOfRecord: number): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(API_URL + '/announcement-list/' + noOfRecord);
  }

  saveAnnouncement(announcement): Observable<Announcement> {
    return this.http.post<Announcement>(API_URL + '/announcement-save', announcement);
  }

  getMaxSizeAnnouncement(): Observable<number> {
    return this.http.get<number>(API_URL + '/list-size')
  }
}
