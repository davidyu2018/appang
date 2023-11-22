import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { NavItemComponent } from './nav/nav-item/nav-item.component';


@NgModule({
  declarations: [
    LandingComponent,
    HeaderComponent,
    NavComponent,
    NavItemComponent,
  ],
  imports: [
    ShareModule,
    LandingRoutingModule
  ],
  providers: []
})
export class LandingModule { }
