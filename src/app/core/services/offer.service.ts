import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFavouritePaginatedResponse } from '../interfaces/favourites.interface';
import { IOfferPaginatedResponse } from '../interfaces/offer.interfaces';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  url = `${AppConfigService.config.api}offers/`;
  favouritesUrl = `${AppConfigService.config.api}favourites/`;

  constructor(private http: HttpClient) {}

  getOffers(params?): Observable<IOfferPaginatedResponse> {
    return this.http.get<IOfferPaginatedResponse>(this.url, { params });
  }

  getOffersByCategory(params?): Observable<IOfferPaginatedResponse> {
    return this.http.get<IOfferPaginatedResponse>(
      `${this.url}offers_by_category/`,
      { params }
    );
  }

  getUserOffers(id: number, params?): Observable<IOfferPaginatedResponse> {
    return this.http.get<IOfferPaginatedResponse>(
      `${this.url}user/${id}/offers/`,
      { params }
    );
  }

  getFavourites(params?): Observable<IFavouritePaginatedResponse> {
    return this.http.get<IFavouritePaginatedResponse>(
      `${this.favouritesUrl}my_favourites/`,
      {
        params,
      }
    );
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
