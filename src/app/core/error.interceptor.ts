import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, finalize, switchMap, delay, catchError, take } from 'rxjs/operators';
@Injectable()
export class ErrorIntercepter implements HttpInterceptor {
  constructor() { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
        catchError(err => this.handleError(err)),
    )
  }
  private handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
        console.error(`An error occurred：${err.error.message}`)
    } else {
        console.error(`Backend returned code ${err.status}, body was: ${err.error}`)
    }
    return throwError(() => '情况不妙，请稍后再试。')
  }
}