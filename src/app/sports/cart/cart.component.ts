import { CartService } from './../cart.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  constructor(public cart: CartService) {

  }

}
