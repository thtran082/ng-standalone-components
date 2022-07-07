import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, } from "@angular/common/http";
import { Inject, Injectable, Provider } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_URL } from "../di/token";
import { NG_MYAPP_TOKEN } from "./constants";
import { LocalStorageService } from "./local-storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private _localStorageService: LocalStorageService,
    @Inject(BASE_URL) private _baseUrl: string
  ) {
  }

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    req = req.clone({ url: this._baseUrl + req.url });
    const token = this._localStorageService.getItem(NG_MYAPP_TOKEN);
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(req);
  }
}

export const provideAuthInterceptor: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
