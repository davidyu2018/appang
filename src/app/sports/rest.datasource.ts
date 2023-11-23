import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { AuthService } from '../auth/services/auth.service';
import { map } from 'rxjs/operators';
import { Product, Order } from "./product.model";
const PROTOCOL = 'http';
const PORT = 3500;
@Injectable()
export class RestDataSource {
  baseUrl: string;
  auth_token: string | null = null;
  constructor(private http: HttpClient, private auth: AuthService) {
    this.baseUrl = `https://dummyjson.com`;
    this.auth.getAuth().subscribe((auth) => this.auth_token = auth.token)
  }
  query(query: string): Observable<Product[]> {
    return this.http.get<any>(this.baseUrl + '/products/search?q=' + query).pipe(map(res => res.products))
  }
  getProducts(): Observable<Product[]> {
    return this.http.get<any>(this.baseUrl + '/products').pipe(map(res => res.products))
  }
  saveOrder(order: Order): Observable<Order> {
    return this.http.get<Order>(this.baseUrl + 'orders')
  }
  authenticate(user: string, pass: string): Observable<boolean> {
    return this.http.post<any>(this.baseUrl + 'login', {
      name: user, password: pass
    }).pipe(
      map((res: any) => {
        this.auth_token = res.success ? res.token : null;
        return res.success
      })
    )
  }
  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('data/posts', product, this.getOptions());
  }
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}products/${product.id}`, product,
      this.getOptions())
  }
  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`data/posts/${id}`, this.getOptions());
  }
  getOrders(): Observable<Order[]> {
    return this.http.jsonp<Order[]>(this.baseUrl + "/users", 'callback')
  }
  deleteOrder(id: string): Observable<Order> {
    return this.http.delete<Order>(`${this.baseUrl}orders/${id}`, this.getOptions())
  }
  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}orders/${order.id}`, order, this.getOptions());
  }
  private getOptions() {
    return {
      headers: new HttpHeaders({ "Authorization": `Bearer<${this.auth_token}>` })
    }
  }
}
