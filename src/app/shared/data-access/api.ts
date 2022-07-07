import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  ITagsResponse,
  IUserLogin,
  IUserResponse,
  IUserSignUp,
  MultipleArticlesResponse,
} from './model';

@Injectable({ providedIn: 'root' })
export class ApiClient {
  constructor(private _http: HttpClient) {}

  signup(user: IUserSignUp): Observable<IUserResponse> {
    const url = this._replaceUnionMark('/users');
    const params = {
      user,
    };
    return this._http.post<IUserResponse>(url, params);
  }

  login(user: IUserLogin): Observable<IUserResponse> {
    const url = this._replaceUnionMark('/users/login');
    const params = { user };
    return this._http
      .post<IUserResponse>(url, params)
      .pipe(map(({ user }) => ({ user: user })));
  }

  getCurrentUser(): Observable<IUserResponse> {
    const url = this._replaceUnionMark('/user');
    return this._http.get<IUserResponse>(url);
  }

  getArticlesFeed(): Observable<MultipleArticlesResponse> {
    const url = this._replaceUnionMark('/articles');
    return this._http.get<MultipleArticlesResponse>(url, {
      headers: { Accept: 'application/json' },
    });
  }

  getTags(): Observable<ITagsResponse> {
    const url = this._replaceUnionMark('/tags');
    return this._http.get<ITagsResponse>(url);
  }

  private _replaceUnionMark = (value: string): string =>
    value.replace(/[?&]$/, '');
}
