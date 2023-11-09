import { CartService } from './../cart.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartDetailComponent {
  constructor(public cart: CartService) {
    // this.cart = new CartService()
  }
}
