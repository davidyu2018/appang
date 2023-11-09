import { OrderRepository } from './../order.repository';
import { Component } from '@angular/core';
import { Order } from '../product.model'
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CheckoutComponent {
  orderSent: boolean = false;
  submitted: boolean = false;
  order: Order;
  constructor(public repository: OrderRepository) {
    this.order = {
      id: '',
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      shipped: false
    }
  }
  submitOrder(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.repository.saveOrder(this.order).subscribe(order => {
        // this.order.clear();
        this.orderSent = true;
        this.submitted = false;
      })
    }
  }
}
