import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IUser, IUserResponse, MultipleArticlesResponse } from './model';

@Injectable({ providedIn: 'root' })
export class ApiClient {
  constructor(private _http: HttpClient) {}

  login(): Observable<IUserResponse> {
    const url = '/login-user.json';
    return this._http.get<IUser>(url).pipe(map((user) => ({ user })));
  }

  getArticlesFeed(): Observable<MultipleArticlesResponse> {
    const url = '/articles.json';
    return this._http.get<MultipleArticlesResponse>(url);
  }
}
