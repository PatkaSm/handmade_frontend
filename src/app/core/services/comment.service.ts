import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IComment,
  ICommentAdd,
  ICommentPaginatedResponse,
} from '../interfaces/comment.interface';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  url = `${AppConfigService.config.api}comments/`;

  constructor(private http: HttpClient) {}

  getComments(id: number, params): Observable<ICommentPaginatedResponse> {
    return this.http.get<ICommentPaginatedResponse>(`${this.url}offer/${id}/`, {
      params,
    });
  }

  updateComments(id: number, data): Observable<IComment[]> {
    return this.http.put<IComment[]>(`${this.url}${id}/`, data);
  }

  addComments(data: ICommentAdd): Observable<IComment[]> {
    return this.http.post<IComment[]>(this.url, data);
  }

  deleteComment(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}${id}/`);
  }
}
