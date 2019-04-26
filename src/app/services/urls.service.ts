/* tslint:disable:no-inferrable-types */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UrlsService {
  private url: string = 'http://localhost:2001/api';

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<any>(`${this.url}/urls`);
  }

  updateVisit(URL: {
    shortId: string;
  }) {
    console.log(URL.shortId);
    return this.http.put(`${this.url}/urls/${URL.shortId}`, URL);
  }

  create(URL: {}) {
    return this.http.post(`${this.url}/urls`, URL);
  }
}
