import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFavouritePaginatedResponse } from '../interfaces/favourites.interface';
import {
  IOffer,
  IOfferPaginatedResponse,
} from '../interfaces/offer.interfaces';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  url = `${AppConfigService.config.api}offers/`;
  favouritesUrl = `${AppConfigService.config.api}favourites/`;
  addImageUrl = `${AppConfigService.config.api}images/`;
  colorsURL = `${AppConfigService.config.api}items/colors`;

  constructor(private http: HttpClient) {}

  getOffers(params?): Observable<IOfferPaginatedResponse> {
    return this.http.get<IOfferPaginatedResponse>(this.url, { params });
  }

  getOffersByCategory(params?): Observable<IOfferPaginatedResponse> {
    return this.http.get<IOfferPaginatedResponse>(`${this.url}`, {
      params,
    });
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

  likeToggle(id: number): Observable<any> {
    return this.http.post<any>(`${this.favouritesUrl}${id}/like_toggle/`, {});
  }

  addImage(data) {
    return this.http.post<any>(this.addImageUrl, data);
  }

  getItemProperties = (): Observable<any> => this.http.get<any>(this.colorsURL);

  updateOfferDetails(id: number, data: any): Observable<IOffer> {
    return this.http.put<IOffer>(`${this.url}${id}/`, data);
  }

  update(id: number, data: any): Observable<IOffer> {
    return this.http.patch<IOffer>(`${this.url}${id}/`, data);
  }

  getOfferDetails(id: number): Observable<IOffer> {
    return this.http.get<IOffer>(`${this.url}${id}/`);
  }

  addOffer(data): Observable<IOffer> {
    return this.http.post<IOffer>(this.url, data);
  }

  deleteOffer(id: number) {
    return this.http.delete(`${this.url}${id}/`);
  }
}
