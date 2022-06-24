import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { IUser, IUserResponse } from "./model";

@Injectable({ providedIn: "root" })
export class ApiClient {
  constructor(private _http: HttpClient) {
  }

  login(): Observable<IUserResponse> {
    const url = "/assets/api/login-user.json";
    return this._http.get<IUser>(url).pipe(
      map(user => ({ user }))
    )
  }
}
