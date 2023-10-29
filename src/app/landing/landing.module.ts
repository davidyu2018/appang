import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../share/share.module';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    LandingComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    LandingRoutingModule
  ],
  providers: []
})
export class LandingModule { }