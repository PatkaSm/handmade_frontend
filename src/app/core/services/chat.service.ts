import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IMessagesPaginatedResponse,
  IThreadsPaginatedResponse,
} from '../interfaces/chat.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  url = `${AppConfigService.config.api}chat/`;
  private _chatSocket$: WebSocketSubject<any>;

  constructor(private http: HttpClient) {}

  openConnection(id: number): void {
    this._chatSocket$ = webSocket(
      `${AppConfigService.config.webSocketHost}ws/chat/${id}/`
    );
  }

  get chatSocket$(): Observable<any> {
    return this._chatSocket$.asObservable();
  }

  sendMessage(obj: { message: string; senderId: number }): void {
    this._chatSocket$.next(JSON.stringify(obj));
  }

  closeSocketConnection(): void {
    this._chatSocket$.complete();
  }

  loadMessages(params): Observable<IMessagesPaginatedResponse> {
    return this.http.get<IMessagesPaginatedResponse>(`${this.url}messages/`, {
      params,
    });
  }

  getThreads(): Observable<IThreadsPaginatedResponse> {
    return this.http.get<IThreadsPaginatedResponse>(`${this.url}threads_list/`);
  }

  getUserThread(id: number) {
    return this.http.get(`${this.url}messages/${id}/`);
  }
}
