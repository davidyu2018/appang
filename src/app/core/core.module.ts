import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingModule } from '../landing/landing.module';
import { AuthModule } from '../auth/auth.module';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule,TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
// import { UserModule } from '../user/user.module';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    LandingModule,
    AuthModule,
    // UserModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
  ]
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is aleady loaded. Import it in the AppModule only!!!!')
    }
  }
}
