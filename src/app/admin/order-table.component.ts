import { Component } from '@angular/core';
import { OrderRepository } from '../sports/order.repository';
import { Order } from '../sports/product.model';
@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ["./admin.component.scss"]

})
export class OrderTableComponent {
  includeShipped = false;
  constructor(private repository: OrderRepository) { }
  getOrders(): Order[] {
    return this.repository.getOrders().filter(o => this.includeShipped || !o.shipped)
  }
  markShipped(order: Order) {
    order.shipped = true;
    this.repository.updateOrder(order)
  }
  delete(id: string) {
    this.repository.deleteOrder(id)
  }
}
