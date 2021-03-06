import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  IArticleRequest,
  IArticleResponse,
  IMultipleArticlesResponse,
  IMultipleCommentResponse,
  IProfileResponse,
  ITagsResponse,
  IUserLogin,
  IUserResponse,
  IUserSettings,
  IUserSignUp
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

  getArticles(param?: {
    tag?: string;
    favorited?: string;
    author?: string;
  }): Observable<IMultipleArticlesResponse> {
    const url =
    this._replaceUnionMark('/articles') +
    (param?.tag ? `tag=${param?.tag}&` : '') +
    (param?.favorited ? `favorited=${param?.favorited}&` : '') +
    (param?.author ? `author=${param?.author}&` : '');
    return this._http.get<IMultipleArticlesResponse>(url, {
      headers: { Accept: 'application/json' },
    });
  }

  getArticle(slug: string): Observable<IArticleResponse> {
    const url = this._replaceUnionMark(`/articles/${slug}`);
    return this._http.get<IArticleResponse>(url);
  }

  getArticleComments(slug: string): Observable<IMultipleCommentResponse> {
    const url = this._replaceUnionMark(`/articles/${slug}/comments`);
    return this._http.get<IMultipleCommentResponse>(url);
  }

  getArticlesFeed(): Observable<IMultipleArticlesResponse> {
    const url = this._replaceUnionMark('/articles/feed');
    return this._http.get<IMultipleArticlesResponse>(url, {
      headers: { Accept: 'application/json' },
    });
  }

  getTags(): Observable<ITagsResponse> {
    const url = this._replaceUnionMark('/tags');
    return this._http.get<ITagsResponse>(url);
  }

  markArticleFavorite(slug: string): Observable<IArticleResponse> {
    const url = this._replaceUnionMark(`/articles/${slug}/favorite`);
    return this._http.post<IArticleResponse>(url, {});
  }

  unmarkArticleFavorite(slug: string): Observable<IArticleResponse> {
    const url = this._replaceUnionMark(`/articles/${slug}/favorite`);
    return this._http.delete<IArticleResponse>(url);
  }

  createArticle(article: IArticleRequest): Observable<IArticleResponse> {
    const url = this._replaceUnionMark(`/articles`);
    const params = { article };
    return this._http.post<IArticleResponse>(url, params);
  }

  updateSetting(user: Partial<IUserSettings>): Observable<IUserResponse> {
    const url = this._replaceUnionMark(`/user`);
    const params = { user };
    return this._http.put<IUserResponse>(url, params);
  }

  getProfile(username: string): Observable<IProfileResponse> {
    const url = this._replaceUnionMark('/profiles/' + username);
    return this._http.get<IProfileResponse>(url);
  }

  deleteArticle(slug: string): Observable<void> {
    const url = this._replaceUnionMark(`/articles/${slug}`);
    return this._http.delete<void>(url);
  }

  followUser(username: string): Observable<IProfileResponse> {
    const url = this._replaceUnionMark(`/profiles/${username}/follow`);
    const params = {};
    return this._http.post<IProfileResponse>(url, params);
  }

  unfollowUser(username: string): Observable<IProfileResponse> {
    const url = this._replaceUnionMark(`/profiles/${username}/follow`);
    return this._http.delete<IProfileResponse>(url);
  }

  private _replaceUnionMark = (value: string): string =>
    value.replace(/[?&]$/, '') + '?';
}
