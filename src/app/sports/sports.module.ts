import { OrderRepository } from './order.repository';
import { SportsFirstGuard } from './sports.guard';

import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module'
import { routing } from './sports-routing.module'
import { CounterDirective } from './counter.directive';
import { RestDataSource } from './rest.datasource';

import { ProductRepository } from './product.repository'
import { CartService } from './cart.service';
import { CheckoutComponent } from './cart/checkout.component';

import { CartComponent } from './cart/cart.component';
import { SportsComponent } from './sports.component';
import { CartDetailComponent } from './cart/cart-detail.component';

@NgModule({
  declarations: [SportsComponent, CounterDirective, CheckoutComponent, CartComponent, CartDetailComponent],
  imports: [
    ShareModule,
    routing
  ],
  exports: [SportsComponent, CheckoutComponent],
  providers: [ProductRepository, CartService, SportsFirstGuard, OrderRepository, RestDataSource]
})
export class SportsModule { }
