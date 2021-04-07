import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../interfaces/category.interface';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url = `${AppConfigService.config.api}categories/`;

  constructor(private http: HttpClient) {}

  getNavCategories() {
    return this.http.get<ICategory[]>(`${this.url}nav_categories`);
  }

  getAllCategories() {
    return this.http.get<ICategory[]>(`${this.url}no_core`);
  }

  getCoreCategories() {
    return this.http.get<ICategory[]>(`${this.url}core`);
  }
}
