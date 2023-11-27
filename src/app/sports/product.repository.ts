import { from, Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { Product } from "./product.model"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { RestDataSource } from './rest.datasource';
@Injectable()
export class ProductRepository {
  baseUrl: string = ''
  private mockDataUrl: string = 'assets/json/data.json';
  private mockImmutableData: Product[];
  private locator = (p: Product, id: number) => p.id == id;
///////////////////////////////////////////////////////////////////
  private dataStore: { products: Product[], categories: string[] }
  private _products$: BehaviorSubject<Product[]>;
  private _categories$: BehaviorSubject<string[]>;
  public productsIds: number[] = []
  constructor(private dataSource: RestDataSource, private http: HttpClient) {
    this.baseUrl = `https://dummyjson.com`;
    this.dataStore = { products: [], categories: [] }
    this._products$ = new BehaviorSubject<Product[]>([])
    this._categories$ = new BehaviorSubject<string[]>([])
    // dataSource.getProducts().subscribe((data: Product[]) => {
    //   this.products = data;
    //   this.categories = data.map(p => p.category)
    //     .filter((c, index, array) => array.indexOf(c) == index).sort()
    // })
  }
  get categories$() {
    return this._categories$.asObservable()
  }
  get products$() {
    return this._products$.asObservable()
  }
  queryProducts(query: string): Observable<Product[]> {
    this.dataSource.query(query).subscribe(products => {
      this.productsIds = products.map(p => p.id)
      this.updateStoreAndSubject('PRODUCTS', '',products)
    })
    return this.dataSource.query(query)
  }
  getCategories() {
    return this.http.get<any>(this.baseUrl + '/products/categories').subscribe(cats => this.updateStoreAndSubject('CATEGORY', '', cats ))
  }
  getProducts(category: string = '') {
    this.http.get<any>(this.baseUrl + '/products').pipe(map(res => res.products as Product[])).subscribe(products => {
      this.productsIds = products.map(p => p.id)
      this.updateStoreAndSubject('PRODUCTS', '',products)
    })
  }
  getProduct(id: number):Observable<Product> {
    return this.http.get(this.baseUrl + '/products/' + id).pipe(map(res => res as Product))
  }
  addProduct(product: Product) {
    this.http.post(this.baseUrl + '/products/add', product).pipe(map(res => res as Product)).subscribe(ps => this.updateStoreAndSubject('PRODUCTS', 'add', ps))
  }
  saveProduct(product: Product) {
      this.http.put(this.baseUrl + '/products/' + product.id, product).subscribe(p =>  this.updateStoreAndSubject('PRODUCTS', 'edit', Object.assign(product, p)))
  }
  deleteProduct(product: Product) {
    const i = this.dataStore.products.findIndex(p => p.id === product.id)
    this.http.delete<Product>(`${this.baseUrl}/data/${product.id}`).subscribe(_ => {
      this.updateStoreAndSubject('PRODUCTS', 'delete', product)
    })
  }
  updateStoreAndSubject(channel: string = '',  mode: string = '', product: any,) {
    if (channel === 'CATEGORY') {
      if (mode === '') {
        this.dataStore.categories = [...product]
        this._categories$.next(Object.assign({}, this.dataStore).categories)
      }
    } else {
      const i = this.dataStore.products.findIndex(p => p.id === product.id)
      if (mode === 'add') {
        this.dataStore.products = [...this.dataStore.products, product]
      } else if (mode === 'edit') {
        i > -1 && (this.dataStore.products = [...this.dataStore.products.slice(0, i), product, ...this.dataStore.products.slice(i + 1)]);
      } else if (mode === 'delete') {
        i > -1 && (this.dataStore.products = [...this.dataStore.products.slice(0, i), ...this.dataStore.products.slice(i + 1)]);
      } else {
        this.dataStore.products = [...product]
      }
    }
    this._products$.next(Object.assign({}, this.dataStore).products)
  }
  getNextProductId(id: number): number {
    const index = this.productsIds.findIndex(pid => pid === id);
    if (index > -1) {
      const oLen = this.productsIds.length
      return index + 1 < oLen ? this.productsIds[index + 1] : -1;
    } else {
      return -1;
    }
  }
  getPreviousProductId(id: number): number {
    const index = this.productsIds.findIndex(pid => pid === id);
    if (index > 0) {
      return this.productsIds[index -1];
    } else {
      return -1;
    }
  }
  getDataObservable(): Observable<Product[]> {
    return new Observable<Product[]>(observer => {
      this.http.get<Product[]>(this.mockDataUrl).subscribe((data: Product[]) => {
        this.mockImmutableData = data;
        observer.next(this.mockImmutableData);
        setInterval(() => {
          this.mockImmutableData = this.mockImmutableData.map((row: Product) =>
            this.updateRandomRowWithData(row)
          );

          observer.next(this.mockImmutableData);
        }, 1000);
      });
    });
  }
  updateRandomRowWithData(row: Product): Product {
    const shouldUpdateData = Math.random() < 0.3;
    if (shouldUpdateData) {
      let delta = Math.floor(30 * Math.random()) / 10;
      delta *= Math.round(Math.random()) ? 1 : -1;
      const newValue = row.price + Math.floor(delta);
      let newRow = { ...row, amount: newValue };
      return newRow;
    } else {
      return row;
    }
  }
}