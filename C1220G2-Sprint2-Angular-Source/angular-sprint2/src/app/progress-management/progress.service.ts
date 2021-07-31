import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {ProgressDto} from './progress-dto';
import {catchError} from 'rxjs/operators';
import {StudentDto} from './student-dto';
import {ReviewDto} from './review-dto';
import {Project} from '../models/project';
import {ProjectDto} from './project-dto';
import {CommentConcern} from '../models/comment-concern';
import {CommentReview} from '../models/comment-review';
import {ProgressPhase} from './progress-phase';

const API_URL = `${environment.apiUrl}` + '/api';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  constructor(private http: HttpClient) {
  }

  getAllProgressManagement(): Observable<ProgressDto[]> {
    return this.http.get<ProgressDto[]>(API_URL + '/progress/list').pipe(catchError(this.handleError));
  }

  getAllStudentDto(): Observable<StudentDto[]> {
    return this.http.get<StudentDto[]>(API_URL + '/progress/student-list').pipe(catchError(this.handleError));
  }

  addNewReview(reviewDto: ReviewDto, projectId: number): Observable<void> {
    return this.http.post<void>(API_URL + '/review/review-save/' + projectId, reviewDto).pipe(catchError(this.handleError));
  }

  searchByName(nameProject: string): Observable<ProgressDto[]> {
    return this.http.get<ProgressDto[]>(API_URL + '/progress/search?projectName=' + nameProject).pipe(catchError(this.handleError));
  }

  getProjectById(projectId: number): Observable<ProjectDto> {
    return this.http.get<ProjectDto>(API_URL + '/progress/project/' + projectId).pipe(catchError(this.handleError));
  }

  getStudentOfGroup(projectId: number): Observable<StudentDto[]> {
    return this.http.get<StudentDto[]>(API_URL + '/progress/student-list-of-group/' + projectId).pipe(catchError(this.handleError));
  }

  findProjectById(idProject: number): Observable<ProjectDto> {
    return this.http.get<ProjectDto>(`${API_URL}/project/${idProject}`);
  }

  getAllReview(noOfRecord: number): Observable<ReviewDto[]> {
    return this.http.get<ReviewDto[]>(API_URL + '/review/review-list/' + noOfRecord).pipe(catchError(this.handleError));
  }

  getMaxSize(): Observable<number> {
    return this.http.get<number>(API_URL + '/review/review-list-size').pipe(catchError(this.handleError));
  }

  getAllComment(): Observable<CommentReview[]> {
    return this.http.get<CommentReview[]>(API_URL + '/comment/review/comment-list');
  }

  saveComment(comment): Observable<CommentReview> {
    return this.http.post<CommentReview>(API_URL + '/comment/review/comment-save', comment);
  }

  getProgressPhase(projectId: number): Observable<ProgressPhase[]> {
    return this.http.get<ProgressPhase[]>(API_URL + '/progress/list-progress/' + projectId);
  }

  getProgressDoing(projectId: number): Observable<ProgressPhase> {
    return this.http.get<ProgressPhase>(API_URL + '/review/get-progress/' + projectId);
  }

  // ---------------------------------------------------------------------------------
  // sangld code
  private handleError(httpError: HttpErrorResponse) {
    let message = '';
    if (httpError.error instanceof ProgressEvent) {
      console.log('in progrss event');
      message = 'lỗi mạng';
    } else {
      message = JSON.parse(httpError.error).message;
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `lỗi server ${httpError.status}, ` +
        `body was: ${httpError.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Bạn không đủ quyền để truy cập vào trang này ' + message);
  }
}
