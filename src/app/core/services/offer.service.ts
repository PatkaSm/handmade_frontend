import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  url = `${AppConfigService.config.api}offers/`;
  favouritesUrl = `${AppConfigService.config.api}favourites/`;

  constructor(private http: HttpClient) {}

  getOffers(params?) {
    return this.http.get<any>(this.url, { params });
  }

  getOffersByCategory(params?) {
    return this.http.get<any>(`${this.url}offers_by_category/`, { params });
  }

  getUserOffers(id: number, params?) {
    return this.http.get<any>(`${this.favouritesUrl}user/${id}/`, { params });
  }

  getFavourites(params?): Observable<any> {
    return this.http.get<any>(`${this.favouritesUrl}my_favourites/`, {
      params,
    });
  }

  getLikes(id: number): Observable<any> {
    return this.http.get<any>(`${this.favouritesUrl}likes/${id}/`);
  }

  offerLikeToggle(id: number): Observable<any> {
    return this.http.post<any>(
      `${this.favouritesUrl}likes/${id}/like_toggle/`,
      {}
    );
  }
}
