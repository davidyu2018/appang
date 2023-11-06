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
    const event$ = fromEvent(this.elementRef.nativeElement, 'keyup')
    event$.pipe(map(() => this.searchString), debounceTime(this.delay), distinctUntilChanged(), share())
      .subscribe((input: string) => {
        this.onSearch.emit(input)
      })
  }
  search() {
    // !this.inputSearch && this.onSearch.emit(this.searchString)
    // this.router.navigate(['/ware-search', { wareName: this.searchString }])
  }
  searchRemove(e: any) {
    this.searchString = '';
    e.preventDefault()
  }
}
