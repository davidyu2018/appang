import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

  getStocks(query: string=''): Observable<any> {
    let url = `https://jsonplaceholder.typicode.com/albums?userId=${query}`
    return this.http.get(url)
  }
}
