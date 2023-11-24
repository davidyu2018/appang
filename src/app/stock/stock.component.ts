import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, fromEvent, merge, map, Subject} from 'rxjs';
import { debounceTime, distinctUntilChanged, scan, share, startWith, switchMap, tap} from 'rxjs/operators'
import { StockService } from './stock.service'
import {MockStockService} from './mock-stock.service'
import { Stock, Currency } from './stock.model';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, GridReadyEvent ,ColDef} from 'ag-grid-community';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
  providers: [MockStockService]
})
export class StockComponent {
  @ViewChild('increment', { read: ElementRef })
  increment: ElementRef;
  @ViewChild('decrement', { read: ElementRef })
  decrement: ElementRef;
  click$: Observable<number>;
  ////////////////////////////////////////////
  searchString: string = '';
  stocks$: Observable<any[]>;
  private searchTerms: Subject<string> = new Subject()
  //////////////////////////////
  public currencies$: Observable<Currency[]>;
  public columnDefs$: Observable<ColDef[]>;
  public rowData$: Observable<Stock[]>;
  selectedCurrency: string = 'USD'
  // public immutableData: boolean;
  /////////////////////////////////////////
  public columnDefs: ColDef[] = [
    { field: 'make'},
    { field: 'model'},
    { field: 'price' }
  ];

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  constructor(private stockService: StockService, private mockServer: MockStockService) { 
  //   this.stocks$ = this.searchTerms.pipe(
  //     startWith(this.searchString),
  //     debounceTime(500),
  //     distinctUntilChanged(),
  //     switchMap(query => this.stockService.getStocks(query)),
  //     share()
  //   )
   }
  ngOnInit(){
    /////////////////////////////////
    this.currencies$ = this.mockServer.getCurrencyObservable();
    this.rowData$ = this.mockServer.getDataObservable()
    // .pipe(tap(r => console.log('ddd', r)));
    this.columnDefs$ = this.mockServer.getColumnObservable();
  }
  ngAfterViewInit() {
    setTimeout(() => this.click$ = this.getCounterObservable(), 50)
  }
  private getCounterObservable(): Observable<number> {
    const increment$ = fromEvent(this.increment.nativeElement, 'click').pipe(
      tap(_ => console.log('increment')),
      map(() => 1)
    )
    const decrement$ = fromEvent(this.decrement.nativeElement, 'click').pipe(
      tap(_ => console.log('decrement')),
      map(() => -1)
    )
    return merge(increment$, decrement$).pipe(
      scan((acc: number, curr: number) => acc + curr),
      startWith(0)
    )
  }

  search() {
    this.searchTerms.next(this.searchString)
  }
  // stock -ag-ag---------------
  onGridReady(params: GridReadyEvent) {
    // this.rowData$ = this.mockServer.getAgGridData().pipe(tap(r => console.log('rrr', r)))
  }
  onChange(e: any) {
    this.agGrid.api.refreshCells();
    this.agGrid.api.refreshHeader();

  }
  onCellClicked( e: any): void {
    console.log('cellClicked', e);
  }

  // clearSelection(): void {
  //   this.agGrid.api.deselectAll();
  // }

}
