import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Stock, Currency, ColDef } from './stock.model';
@Injectable({
  providedIn: 'root'
})
export class MockStockService {
  private stocksUrl: string = 'assets/json/data.json';
  private columnUrl: string = 'assets/json/column.json';
  private currencyUrl: string = 'assets/json/currency.json';

  private immutableData: Stock[];

  constructor(private http: HttpClient) {}

  getDataObservable(): Observable<Stock[]> {
    return new Observable<Stock[]>(observer => {
      this.http.get<Stock[]>(this.stocksUrl).subscribe((data: Stock[]) => {
        this.immutableData = data;
        observer.next(this.immutableData);

        setInterval(() => {
          this.immutableData = this.immutableData.map((row: Stock) =>
            this.updateRandomRowWithData(row)
          );

          observer.next(this.immutableData);
        }, 1000);
      });
    });
  }

  getCurrencyObservable(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.currencyUrl);
  }

  getColumnObservable(): Observable<ColDef[]> {
    return this.http.get<ColDef[]>(this.columnUrl);
  }

  updateRandomRowWithData(row: Stock): Stock {
    const shouldUpdateData = Math.random() < 0.3;
    if (shouldUpdateData) {
      let delta = Math.floor(30 * Math.random()) / 10;
      delta *= Math.round(Math.random()) ? 1 : -1;
      const newValue = row.amount + Math.floor(delta);
      let newRow = { ...row, amount: newValue };
      return newRow;
    } else {
      return row;
    }
  }

  getAgGridData(): Observable<any> {
    return this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
  }
}