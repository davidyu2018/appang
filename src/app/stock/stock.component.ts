import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, fromEvent, merge, map} from 'rxjs';
import {mapTo, scan, startWith, tap} from 'rxjs/operators'
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
  click$: Observable<number>

  constructor() {}

  ngOnInit(){
    this.click$ = this.getCounterObservable()
  }
  private getCounterObservable(): Observable<number> {
    const increment$ = fromEvent(this.increment.nativeElement, 'click').pipe(
      tap(_ => console.log('increment')),
      mapTo(1)
    )
    const decrement$ = fromEvent(this.decrement.nativeElement, 'click').pipe(
      tap(_ => console.log('decrement')),
      mapTo(-1)
    )
    return merge(increment$, decrement$).pipe(
      scan((acc: number, curr: number) => acc + curr),
      startWith(0)
    )
  }
}
