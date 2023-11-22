import { from, Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { Product } from "./product.model"
// import { StaticDataSource } from './static.datasource'
import { RestDataSource } from './rest.datasource';
@Injectable()
export class ProductRepository {
  private products: Product[] = [];
  private categories: any[] = [];
  private locator = (p: Product, id: string) => p.id == id;
  constructor(private dataSource: RestDataSource) {
    dataSource.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.categories = data.map(p => p.category)
        .filter((c, index, array) => array.indexOf(c) == index).sort()
    })
  }
  getProducts(category: string = ''): Product[] {
    return this.products.filter(p => category == '' || category == p.category)
  }
  getProduct(id: string): Product | undefined {
    return this.products.find((p: Product) => p.id == id)
  }
  getCategories(): string[] {
    return this.categories;
  }
  saveProduct(product: Product) {
    if (!product.id) {
      this.dataSource.saveProduct(product).subscribe(p => this.products.push(p))
    } else {
      this.dataSource.updateProduct(product).subscribe(p => this.products.splice(this.products.findIndex(p => p.id == product.id), 1, product))
    }
  }
  deleteProduct(id: string) {
    this.dataSource.deleteProduct(id).subscribe(p => {
      this.products.splice(this.products.findIndex(p => p.id == id), 1)
    })
  }
  getNextProductId(id: string): string {
    let index = this.products.findIndex(p => this.locator(p, id));
    if (index > -1) {
      return this.products[this.products.length > index + 2 ? index + 1 : 0].id;
    } else {
      return id || '';
    }
  }
  getPreviousProductId(id: string): string {
    let index = this.products.findIndex(p => this.locator(p, id));
    if (index > -1) {
      return this.products[index > 0 ? index - 1 : this.products.length].id;
    } else {
      return id || '';
    }
  }
}