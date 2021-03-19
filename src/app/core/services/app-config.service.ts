import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Application Config Interface
 */
export interface IConfig {
  /**
   * API URL
   */
  api: string;
  /**
   * Default language
   */
  language: string;
}

/**
 * Application config service
 */
@Injectable()
export class AppConfigService {
  /**
   * Application config
   */
  public static config: IConfig;

  /**
   * @ignore
   */
  constructor(private http: HttpClient) {}

  /**
   * Load config from file 'config.json'
   */
  load() {
    this.http.get('assets/config/config.json').subscribe(
      (data) => {
        AppConfigService.config = data as IConfig;
      },
      (error) => `Failed to load the config file`
    );
  }
}
