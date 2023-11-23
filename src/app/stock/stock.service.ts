import { Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

  getStocks(query: string=''): Observable<any[]> {
    let url = `https://dummyjson.com/products/search?q=${query}`
    return this.http.get(url).pipe(map((res: any) => res.products))
  }
}
