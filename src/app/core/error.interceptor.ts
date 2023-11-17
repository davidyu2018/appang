import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, finalize, switchMap, delay, catchError, take } from 'rxjs/operators';
import { ToastService } from '../core/toastrService'
import { AuthService } from '../auth/services/auth.service';
@Injectable()
export class ErrorIntercepter implements HttpInterceptor {
  constructor(private toastrService: ToastService, private auth: AuthService) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
        catchError(err => this.handleError(err))
    )
  }
  private handleError(error: HttpErrorResponse | any) {
    let errMsg = ''
    if (error instanceof HttpErrorResponse) {
      const body = error || ''
      const err = body.error || JSON.stringify(body)
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`    
      error.status === 10000 && this.auth.unAuth()

    } else {
      errMsg = error.message ? error.message : error.toString()
    }
    this.toastrService.showError(errMsg)
    return throwError(() => errMsg)
  }
}