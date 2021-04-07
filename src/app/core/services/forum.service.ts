import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPostsPaginatedResponse } from '../interfaces/forum.interface';
import { IPost } from '../interfaces/post.interfaces';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root',
})
export class ForumService {
  url = `${AppConfigService.config.api}posts/`;

  constructor(private http: HttpClient) {}

  addPost(data): Observable<IPost> {
    return this.http.post<IPost>(this.url, data);
  }
  getPosts(params?): Observable<IPostsPaginatedResponse> {
    return this.http.get<IPostsPaginatedResponse>(this.url, { params });
  }
  getPostDetails(id: number): Observable<IPost> {
    return this.http.get<IPost>(`${this.url}${id}/`);
  }
  deletePost(id: number) {
    return this.http.delete(`${this.url}${id}/`);
  }
  editPost(id: number, data): Observable<IPost> {
    return this.http.put<IPost>(`${this.url}${id}/`, data);
  }
}
