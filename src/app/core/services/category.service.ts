import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/category.interface';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url = `${AppConfigService.config.api}categories/`;

  constructor(private http: HttpClient) {}

  getNavCategories() {
    return this.http.get(this.url + 'nav_categories/');
  }

  getAllCategories = () => this.http.get<any>(this.url + 'no_core');
}
