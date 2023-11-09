import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, finalize, switchMap, delay, catchError } from 'rxjs/operators';
@Injectable()
export class LogIntercepter implements HttpInterceptor {
  constructor() { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const started = Date.now()
    let ok: string;
    return next.handle(request).pipe(
        tap(event => ok = event instanceof HttpResponse ? 'Success' : '', err => ok = 'failed'),
        finalize(() => {
            const elapsed = Date.now() - started;
            const msg = `"${request.urlWithParams}" ${ok} in ${elapsed} ms.`
            // console.log('Log:' + msg)
        })
    )
  }
}