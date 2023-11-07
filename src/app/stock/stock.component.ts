import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, fromEvent, merge, map, Subject} from 'rxjs';
import { debounceTime, distinctUntilChanged, scan, share, startWith, switchMap, tap} from 'rxjs/operators'
import { StockService } from './stock.service'
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent {
  @ViewChild('increment', { read: ElementRef })
  increment: ElementRef;
  @ViewChild('decrement', { read: ElementRef })
  decrement: ElementRef;
  click$: Observable<number>;

  stocks$: Observable<any[]>;
  searchString: string = '';
  private searchTerms: Subject<string> = new Subject()

  constructor(private stockService: StockService) {}

  ngOnInit(){
    this.stocks$ = this.searchTerms.pipe(
      startWith(this.searchString),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(query => this.stockService.getStocks(query)),
      share()
    )
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
}
