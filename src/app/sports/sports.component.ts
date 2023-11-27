import { CartService } from './cart.service';
import { Component } from '@angular/core';
import { Product, Cart } from './product.model'
import { ProductRepository } from './product.repository';
import { BehaviorSubject, map,filter } from 'rxjs';

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
  products: Product[]
  categories: string[]
  constructor(private repository: ProductRepository, private cart: CartService) {
    setTimeout(() => { this.dateValue = '2020-02-12' }, 5000)
    this.repository.getCategories()
    this.repository.getProducts(this.selectedCategory)
    this.repository.products$.subscribe(ps => this.products = ps)
    this.repository.categories$.subscribe(cas => this.categories = cas)
  }
  changeCategory(newCategory: string) {
    this.selectedCategory = newCategory
    this.repository.products$.subscribe(ps => this.products = newCategory === '' ? ps : ps.filter(p => p.category === newCategory))
  }
  changePage(newPage: number) {
    this.selectedPage = newPage;
  }
  changePageSize(newSize: number) {
    this.productsPerPage = Number(newSize);
    this.changePage(1)
  }
  get pageCount(): number {
    return  Math.ceil(this.products.length / this.productsPerPage)
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
