import { Injectable } from '@angular/core';
import { Product, CartLine } from './product.model';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  lines: CartLine[] = [];
  itemCount: number = 0;
  cartPrice: number = 0;
  constructor() {
    this.lines = []
  }
  addLine(product: Product, quantity: number = 1) {
    let line: any = this.lines.find(line => line.product.id == product.id);
    if (line != undefined) {
      line.quantity += quantity;
      line.total = line.quantity * line.product.price
    } else {
      this.lines.push({ product, quantity, total: product.price })
    }
    this.recalculate()
  }
  updateQuantity(product: Product, quantity: number) {
    let line = this.lines.find(line => line.product.id == product.id);
    if (line != undefined) {
      line.quantity = Number(quantity)
    }
    this.recalculate()
  }
  removeLine(id: string) {
    let index = this.lines.findIndex(line => line.product.id == id);
    this.lines.splice(index, 1)
    this.recalculate()
  }
  clear() {
    this.lines = []
    this.itemCount = 0;
    this.cartPrice = 0;
  }
  private recalculate() {
    this.itemCount = 0;
    this.cartPrice = 0;
    this.lines.forEach((l: any) => {
      this.itemCount += l.quantity;
      this.cartPrice += (l.quantity * l.product.price)
    })
  }
}
