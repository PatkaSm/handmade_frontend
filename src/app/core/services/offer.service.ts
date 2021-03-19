import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  url = `${AppConfigService.config.api}offers/`;

  constructor(private http: HttpClient) {}

  getOffers(params?) {
    return this.http.get<any>(this.url, { params });
  }
}
