import { Component } from '@angular/core';
import { Product } from '../sports/product.model';
import { ProductRepository } from '../sports/product.repository';
@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ["./admin.component.scss"]
})
export class ProductTableComponent {
  newProductcCtegory: string = '';
  products: any[] = []
  constructor(private repository: ProductRepository) {

  }
  getProducts(): Product[] {
    return this.repository.getProducts()
  }
  deleteProduct(id: string) {
    this.repository.deleteProduct(id)
  }
}
