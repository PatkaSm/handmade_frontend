import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserData } from '../interfaces/user.interface';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  url = `${AppConfigService.config.api}users/`;

  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<IUserData> {
    return this.http.get<IUserData>(`${this.url}${id}/`);
  }

  sendUserData(id: number, data): Observable<IUserData> {
    return this.http.patch<IUserData>(`${this.url}${id}/`, data);
  }
}
