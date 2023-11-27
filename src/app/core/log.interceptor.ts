import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, finalize, switchMap, delay, catchError } from 'rxjs/operators';
import { LayoutService } from './layout.service';
@Injectable()
export class LogIntercepter implements HttpInterceptor {
  constructor(private layout: LayoutService) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const started = Date.now()
    let ok: string;
    this.layout.setLoading(true)
    return next.handle(request).pipe(
        tap(event => ok = event instanceof HttpResponse ? 'Success' : '', err => ok = 'failed'),
        finalize(() => {
          this.layout.setLoading(false)
            const elapsed = Date.now() - started;
            const msg = `"${request.urlWithParams}" ${ok} in ${elapsed} ms.`
            // console.log('Log:' + msg)
        })
    )
  }
}