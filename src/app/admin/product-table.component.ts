import { Component } from '@angular/core';
import { Product } from '../sports/product.model';
import { ProductRepository } from '../sports/product.repository';
import { Observable, fromEvent, merge, map, Subject} from 'rxjs';
import { debounceTime, distinctUntilChanged, scan, share, startWith, switchMap, tap} from 'rxjs/operators'

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ["./admin.component.scss"]
})
export class ProductTableComponent {
  searchString: string = ''
  searchSubject$: Subject<string> = new Subject()
  newProductcCtegory: string = '';
  products$: Observable<Product[]>;
  constructor(private repository: ProductRepository) {
    
  }
  ngOnInit() {
    this.products$ = this.searchSubject$.pipe(
      startWith(this.searchString),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.repository.queryProducts(query)),
      share()
    )
  }
  search() {
    this.searchSubject$.next(this.searchString)
  }
  searchRemove() {
    if (this.searchString.length <= 3) return
    this.searchString = ''
    this.search()
  }
  delete(id: string) {
    this.repository.deleteProduct(id)
  }
}
