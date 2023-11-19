import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingModule } from '../landing/landing.module';
import { AuthModule } from '../auth/auth.module';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule,TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthIntercepter } from './auth.interceptor';
import { ErrorIntercepter } from './error.interceptor';
import { ToastrModule, ToastNoAnimationModule } from 'ngx-toastr';
import { LogIntercepter } from './log.interceptor';
// import { MessageErrorHandler } from './angular.error.handler'

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    LandingModule,
    AuthModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthIntercepter, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorIntercepter, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LogIntercepter, multi: true },
    // { provide: ErrorHandler, useClass: MessageErrorHandler },
  ]
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is aleady loaded. Import it in the AppModule only!!!!')
    }
  }
}
