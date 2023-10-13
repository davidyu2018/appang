import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from '../auth/auth.module';
import { LandingModule } from '../landing/landing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LandingModule,
    AuthModule
  ]
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is aleady loaded. Import it in the AppModule only!!!!')
    }
  }
}
