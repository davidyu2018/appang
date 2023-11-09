import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable()
export class AuthIntercepter implements HttpInterceptor {
  authToken: string = ''
  errorInfo: object = {}
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authToken) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', this.authToken)
      })
      req = authReq;
    }
    // 鉴权拦截
    // if (!req.url.includes('/api/') || req.url.includes('/api/auth')) {
    //   return next.handle(req)
    // }
    // if (isRefreshTokenExpired()) {
    //   this.store.dispatch(new Logout())
    //   return next.handle(req)
    // }
    // if (isIdTokenExpired()) {
    //   return this.authService.refreshTokens(getRefreshToken()).pipe(
    //     tap(pair => this.store.dispatch(new RefreshTokenSuccess(pair))),
    //     map(pair => pair.id_token),
    //     switchMap(token => next.handle(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })))
    //   )
    // }
    // const id_token = getIdToken()
    // const reqClone = req.clone({ setHeaders: { Authorization: `Bearer ${id_token}` } })
    // return next.handle(reqClone)
    return next.handle(req)
  }
}