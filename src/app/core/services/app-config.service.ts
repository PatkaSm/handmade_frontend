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

  load(): Promise<void> {
    const jsonFile = `assets/config/config.json`;

    /**
     * Return response of promise with config request
     */
    return new Promise<void>((resolve, reject) => {
      this.http
        .get(jsonFile)
        .toPromise()
        .then((response: IConfig) => {
          AppConfigService.config = response;
          resolve();
        })
        .catch((response: any) => {
          reject(`Failed to load the config file`);
        });
    });
  }
}
