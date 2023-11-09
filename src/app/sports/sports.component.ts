import { CartService } from './cart.service';
import { Component } from '@angular/core';
import { Product, Cart } from './product.model'
import { ProductRepository } from './product.repository';
@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.scss']
})
export class SportsComponent {
  selectedCategory: string = '';
  productsPerPage = 12;
  selectedPage = 1;
  datedisplay: any;
  dateValue = ''
  constructor(private repository: ProductRepository, private cart: CartService) {
    setTimeout(() => { this.dateValue = '2020-02-12' }, 5000)
  }
  get products(): Product[] {
    let pageIndex = (this.selectedPage - 1) * this.productsPerPage
    return this.repository.getProducts(this.selectedCategory).slice(pageIndex, pageIndex + this.productsPerPage)
  }
  get categories(): string[] {
    return this.repository.getCategories()
  }
  changeCategory(newCategory: string) {
    this.selectedCategory = newCategory;
  }
  changePage(newPage: number) {
    this.selectedPage = newPage;
  }
  changePageSize(newSize: number) {
    this.productsPerPage = Number(newSize);
    this.changePage(1)
  }
  get pageCount(): number {
    return Math.ceil(this.repository.getProducts(this.selectedCategory).length / this.productsPerPage)
  }
  addProductToCart(product: Product) {
    this.cart.addLine(product);
    // this.router.navigateByUrl('/landing/sports/cart')
  }
  outputDate(e: any) {
    setTimeout(() => this.datedisplay = e
      , 30)
  }
}
