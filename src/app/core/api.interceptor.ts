import { AuthService } from '../../app/auth/services/auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, finalize, switchMap, delay } from 'rxjs/operators';
@Injectable()
export class ApiIntercepter implements HttpInterceptor {
  authToken: string = ''
  errorInfo: object = {}
  constructor(private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const startTime = Date.now()
    let status: string;
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
    return next.handle(req).pipe(
      tap(
        event => { status = event instanceof HttpResponse ? '成功' : '' }, // 正常时返回HTTPRESPONSE类型对象
        error => { // 错误时返回HTTPRESPONSE类型对象
          status = '失败'
          if (error.status === 404) {
            // const router = this._injector.get(Router);
            // router.navigate(['/404'])
          }
        }
      ),
      finalize(() => {                         // 当HTTP请求调用完成或有错误发生时执行下面的逻辑
        const elapsedTime = Date.now() - startTime;
        const msg = `${req.method} "${req.urlWithParams}" ${status} in ${elapsedTime} ms.`;
        console.log('Print all http req LOG' + msg)
      })
    )
  }
}