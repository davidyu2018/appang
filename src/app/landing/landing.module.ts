import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { MenuItemComponent } from './menu/menu-item/menu-item.component';


@NgModule({
  declarations: [
    LandingComponent,
    HeaderComponent,
    MenuComponent,
    MenuItemComponent,
  ],
  imports: [
    ShareModule,
    LandingRoutingModule
  ],
  providers: []
})
export class LandingModule { }
