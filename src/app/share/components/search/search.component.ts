import { Component, Input, EventEmitter, Output, ElementRef } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, share } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchString: string = '';
  @Input() searchBoxStyle: { [key: string]: string } = {};
  @Input() delay: number = 300;
  @Input() inputSearch: boolean = false
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  constructor(private elementRef: ElementRef) {
    const keyup$ = fromEvent(this.elementRef.nativeElement, 'keyup')
    keyup$.pipe(
      map(() => this.searchString),
      debounceTime(this.delay), 
      distinctUntilChanged(), 
      share()
    ).subscribe((input: string) => {
        this.onSearch.emit(input)
      })
  }
  search() {}
  searchRemove(e: any) {
    this.searchString = '';
    e.preventDefault()
  }
}
